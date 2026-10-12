import { INSTINCT_IDS, MOOD_IDS, makePersonaId } from "@/types/quiz";
import type { InstinctId, MoodId, PersonaId, ScoredQuiz } from "@/types/quiz";

export type ScoreResult =
  | {
      ok: true;
      instinct: InstinctId;
      mood: MoodId;
      personaId: PersonaId;
      instinctScores: Record<InstinctId, number>;
      moodScores: Record<MoodId, number>;
    }
  | { ok: false; reason: "incomplete" | "invalid" };

// 在一个维度内决出最高分类别。
// 平局：从该维度最后一题往前找，最近一次被选中、且属于并列最高分集合的类别获胜。
function pickWinner<T extends string>(
  ids: readonly T[],
  scores: Record<T, number>,
  picks: T[],
): T | null {
  const max = Math.max(...ids.map((id) => scores[id]));
  const tied = new Set<T>(ids.filter((id) => scores[id] === max));
  for (let i = picks.length - 1; i >= 0; i -= 1) {
    if (tied.has(picks[i])) return picks[i];
  }
  return null;
}

// 纯函数：没有随机数，不依赖外部状态，也不会暗中给默认人格。
// 规则：每个选择给对应类别 +1 分；两个维度各自决出最高类别，再组合成 12 种人格之一。
// 任一题缺答案或答案不是该题的有效选项，直接返回 ok: false。
export function scoreAnswers(
  quiz: ScoredQuiz,
  answers: Record<string, string>,
): ScoreResult {
  const instinctScores = Object.fromEntries(INSTINCT_IDS.map((id) => [id, 0])) as Record<
    InstinctId,
    number
  >;
  const moodScores = Object.fromEntries(MOOD_IDS.map((id) => [id, 0])) as Record<
    MoodId,
    number
  >;
  const instinctPicks: InstinctId[] = [];
  const moodPicks: MoodId[] = [];
  let missing = false;
  let invalid = false;

  for (const question of quiz.questions) {
    const answerId = answers[question.id];
    if (answerId === undefined) {
      missing = true;
      continue;
    }
    if (question.dimension === "instinct") {
      const option = question.options.find((o) => o.id === answerId);
      if (!option) {
        invalid = true;
        continue;
      }
      instinctScores[option.value] += 1;
      instinctPicks.push(option.value);
    } else {
      const option = question.options.find((o) => o.id === answerId);
      if (!option) {
        invalid = true;
        continue;
      }
      moodScores[option.value] += 1;
      moodPicks.push(option.value);
    }
  }

  if (invalid) return { ok: false, reason: "invalid" };
  if (missing) return { ok: false, reason: "incomplete" };

  const instinct = pickWinner(INSTINCT_IDS, instinctScores, instinctPicks);
  const mood = pickWinner(MOOD_IDS, moodScores, moodPicks);
  if (!instinct || !mood) return { ok: false, reason: "invalid" };

  return {
    ok: true,
    instinct,
    mood,
    personaId: makePersonaId(instinct, mood),
    instinctScores,
    moodScores,
  };
}