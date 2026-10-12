// 无依赖验证脚本：用项目已有的 typescript 在内存中编译生产代码并直接调用。
// 它调用的是 src/lib/scoring.ts 等生产文件本身，没有第二套计分逻辑。
// 运行：node scripts\verify-personas.mjs
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";
import process from "node:process";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cache = new Map();

function load(file) {
  const cached = cache.get(file);
  if (cached) return cached.exports;
  const source = readFileSync(file, "utf8");
  const { outputText } = ts.transpileModule(source, {
    fileName: file,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  const mod = { exports: {} };
  cache.set(file, mod);
  const localRequire = (spec) =>
    spec.startsWith("@/")
      ? load(path.join(root, "src", spec.slice(2) + ".ts"))
      : require(spec);
  const fn = vm.runInThisContext(
    `(function (exports, require, module) {${outputText}\n})`,
    { filename: file },
  );
  fn(mod.exports, localRequire, mod);
  return mod.exports;
}

const { personaQuiz } = load(path.join(root, "src/data/quizQuestions.ts"));
const { personas } = load(path.join(root, "src/data/personas.ts"));
const { scoreAnswers } = load(path.join(root, "src/lib/scoring.ts"));
const { INSTINCT_IDS, MOOD_IDS, PERSONA_IDS } = load(path.join(root, "src/types/quiz.ts"));

let passed = 0;
let failed = 0;
function check(name, cond, detail = "") {
  if (cond) {
    passed += 1;
  } else {
    failed += 1;
    console.log(`FAIL  ${name} ${detail}`);
  }
}
const len = (s) => Array.from(s).length;

// ---------- 1. 题库结构 ----------
const qs = personaQuiz.questions;
check("共 7 题", qs.length === 7);
qs.forEach((q, i) => {
  const dim = i < 4 ? "instinct" : "mood";
  const ids = dim === "instinct" ? INSTINCT_IDS : MOOD_IDS;
  const values = q.options.map((o) => o.value);
  check(`Q${i + 1} 维度为 ${dim}`, q.dimension === dim);
  check(
    `Q${i + 1} 选项恰好覆盖该维度全部类别且不重复`,
    values.length === ids.length &&
      new Set(values).size === values.length &&
      ids.every((v) => values.includes(v)),
  );
  check(`Q${i + 1} 选项 id 唯一`, new Set(q.options.map((o) => o.id)).size === q.options.length);
});
check(
  "Q1–Q4 第一个选项的类别不全相同",
  new Set(qs.slice(0, 4).map((q) => q.options[0].value)).size > 1,
);
check(
  "Q5–Q7 第一个选项的类别互不相同",
  new Set(qs.slice(4).map((q) => q.options[0].value)).size === 3,
);

// ---------- 2. 人格数据 ----------
const BANNED = ["99%", "稀有", "绝对精准", "快发朋友圈", "小红书", "诊断"];
check("人格总数为 12", PERSONA_IDS.length === 12 && Object.keys(personas).length === 12);
check("人格称号唯一", new Set(Object.values(personas).map((p) => p.title)).size === 12);
check("档案编号唯一", new Set(Object.values(personas).map((p) => p.code)).size === 12);
for (const id of PERSONA_IDS) {
  const p = personas[id];
  check(`${id} 存在`, Boolean(p));
  if (!p) continue;
  check(`${id} id 与本能-气质一致`, p.id === id && id === `${p.instinct}-${p.mood}`);
  check(`${id} 称号 ≤ 7 字`, len(p.title) >= 2 && len(p.title) <= 7, p.title);
  check(`${id} 一句话 ≤ 18 字`, len(p.tagline) >= 6 && len(p.tagline) <= 18, `${len(p.tagline)}`);
  check(`${id} 描述 50–90 字`, len(p.description) >= 50 && len(p.description) <= 90, `${len(p.description)}`);
  check(`${id} 恰好 3 个标签且每个 ≤ 6 字`, p.tags.length === 3 && p.tags.every((t) => len(t) >= 2 && len(t) <= 6));
  check(`${id} B 面 ≤ 24 字`, len(p.flaw) >= 6 && len(p.flaw) <= 24, `${len(p.flaw)}`);
  check(`${id} 配色为合法十六进制`, ["from", "via", "to", "accent"].every((k) => /^#[0-9a-f]{6}$/i.test(p.theme[k])));
  const all = [p.title, p.tagline, p.description, p.flaw, ...p.tags].join("");
  check(`${id} 不含禁用措辞`, BANNED.every((b) => !all.includes(b)));
}
check("12 套主色互不相同", new Set(Object.values(personas).map((p) => p.theme.accent)).size === 12);

// ---------- 3. 固定用例（按类别值构造答案，期望值手写） ----------
function answersFrom(values) {
  const a = {};
  qs.forEach((q, i) => {
    const o = q.options.find((opt) => opt.value === values[i]);
    a[q.id] = o ? o.id : "__none__";
  });
  return a;
}
function expectPersona(name, values, expected) {
  const r = scoreAnswers(personaQuiz, answersFrom(values));
  check(name, r.ok && r.personaId === expected, r.ok ? r.personaId : r.reason);
}

for (const i of INSTINCT_IDS) {
  for (const m of MOOD_IDS) {
    expectPersona(`纯类别 ${i}-${m}`, [i, i, i, i, m, m, m], `${i}-${m}`);
  }
}
const A = "atmospheric", H = "high-energy", R = "surreal";
// 本能维度平局：最近一次被选中的并列类别获胜
expectPersona("本能 2:2（感受先、洞察后）→ 洞察", ["sensory", "sensory", "insight", "insight", A, A, A], "insight-atmospheric");
expectPersona("本能 2:2（洞察先、感受后）→ 感受", ["insight", "insight", "sensory", "sensory", A, A, A], "sensory-atmospheric");
expectPersona("本能 2:2 交错（洞察、感受、感受、洞察）→ 洞察", ["insight", "sensory", "sensory", "insight", A, A, A], "insight-atmospheric");
expectPersona("本能 1:1:1:1（末题破局）→ 破局", ["sensory", "insight", "improv", "breakthrough", A, A, A], "breakthrough-atmospheric");
expectPersona("本能 1:1:1:1（末题感受）→ 感受", ["breakthrough", "improv", "insight", "sensory", A, A, A], "sensory-atmospheric");
expectPersona("本能 2:1:1 有唯一最高分 → 感受", ["sensory", "insight", "sensory", "improv", A, A, A], "sensory-atmospheric");
// 气质维度平局（3 题只可能出现 1:1:1）
expectPersona("气质 1:1:1（末题荒诞）→ 荒诞", ["sensory", "sensory", "sensory", "sensory", A, H, R], "sensory-surreal");
expectPersona("气质 1:1:1（末题慢镜头）→ 慢镜头", ["sensory", "sensory", "sensory", "sensory", R, H, A], "sensory-atmospheric");
expectPersona("气质 1:1:1（末题高能）→ 高能", ["sensory", "sensory", "sensory", "sensory", A, R, H], "sensory-high-energy");
expectPersona("气质 2:1 有唯一最高分 → 高能", ["sensory", "sensory", "sensory", "sensory", H, A, H], "sensory-high-energy");
// 两个维度独立
expectPersona("两个维度同时平局互不影响", ["insight", "improv", "improv", "insight", H, A, R], "insight-surreal");

// ---------- 4. 拒绝不完整或无效答案 ----------
const full = answersFrom(["sensory", "sensory", "sensory", "sensory", A, A, A]);
const rEmpty = scoreAnswers(personaQuiz, {});
check("空答案被拒绝", !rEmpty.ok && rEmpty.reason === "incomplete");
qs.forEach((q) => {
  const partial = { ...full };
  delete partial[q.id];
  const r1 = scoreAnswers(personaQuiz, partial);
  check(`缺少 ${q.id} 被拒绝`, !r1.ok && r1.reason === "incomplete");
  const bad = { ...full, [q.id]: "zz" };
  const r2 = scoreAnswers(personaQuiz, bad);
  check(`${q.id} 无效选项被拒绝`, !r2.ok && r2.reason === "invalid");
});
const rMixed = scoreAnswers(personaQuiz, { pq1: "zz" });
check("缺答加无效答案同时出现也被拒绝", !rMixed.ok);

// ---------- 5. 穷举全部答案组合 ----------
const expectedTotal = 4 ** 4 * 3 ** 3;
const counts = Object.fromEntries(PERSONA_IDS.map((id) => [id, 0]));
let total = 0;
let bad = 0;
function enumerate(idx, answers) {
  if (idx === qs.length) {
    total += 1;
    const r = scoreAnswers(personaQuiz, answers);
    if (!r.ok || !personas[r.personaId]) {
      bad += 1;
      return;
    }
    counts[r.personaId] += 1;
    const sumI = INSTINCT_IDS.reduce((s, k) => s + r.instinctScores[k], 0);
    const sumM = MOOD_IDS.reduce((s, k) => s + r.moodScores[k], 0);
    const maxI = Math.max(...INSTINCT_IDS.map((k) => r.instinctScores[k]));
    const maxM = Math.max(...MOOD_IDS.map((k) => r.moodScores[k]));
    if (sumI !== 4 || sumM !== 3 || r.instinctScores[r.instinct] !== maxI || r.moodScores[r.mood] !== maxM) {
      bad += 1;
    }
    return;
  }
  for (const o of qs[idx].options) {
    answers[qs[idx].id] = o.id;
    enumerate(idx + 1, answers);
  }
}
enumerate(0, {});
check(`穷举组合数 = ${expectedTotal}`, total === expectedTotal, `${total}`);
check("全部组合均返回有效人格且得分满足不变量", bad === 0, `异常 ${bad} 个`);
check("12 种人格全部可达", PERSONA_IDS.every((id) => counts[id] > 0));

console.log("\n人格分布（6912 种答案组合）：");
for (const id of PERSONA_IDS) {
  console.log(`  ${personas[id].title.padEnd(8, "　")} ${id.padEnd(26)} ${counts[id]}`);
}
console.log(`\n通过 ${passed} 项，失败 ${failed} 项`);
process.exit(failed === 0 ? 0 : 1);