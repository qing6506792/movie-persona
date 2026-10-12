import type { Persona } from "@/data/personas";
import type { InstinctId } from "@/types/quiz";

type Ctx = CanvasRenderingContext2D;
type Box = { x: number; y: number; w: number; h: number };

// 导出尺寸固定为 1080 × 1440（3:4）。
// 绘制时按 2 倍缩放，用 540 × 720 的逻辑坐标作图，输出的是矢量重绘，不是放大截图。
export const CARD_WIDTH = 1080;
export const CARD_HEIGHT = 1440;
const SCALE = 2;
const W = CARD_WIDTH / SCALE;
const H = CARD_HEIGHT / SCALE;
const MARGIN = 48;
const CONTENT_W = W - MARGIN * 2;
const TEAR_Y = 640;

const INK = "#0b0d14";
const CREAM = "#f5f2ef";
// 只使用系统字体，不依赖网络字体。
const SANS =
  '"PingFang SC","Hiragino Sans GB","Microsoft YaHei","Noto Sans SC",system-ui,-apple-system,"Segoe UI",sans-serif';
const SERIF =
  '"Songti SC","Noto Serif SC","Source Han Serif SC","SimSun",Georgia,serif';

function rgba(hex: string, alpha: number): string {
  const n = parseInt(hex.replace("#", ""), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}

function roundedRectPath(ctx: Ctx, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

// 不能出现在行首的标点：遇到时把上一行最后一个字一起挪到下一行。
const NO_LINE_START = "，。、！？；：）》」』”’…,.!?;:)]}";

// 逐字测宽换行。调用前必须先设置好 ctx.font。
function wrapText(ctx: Ctx, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const ch of Array.from(text)) {
    const test = line + ch;
    if (line && ctx.measureText(test).width > maxWidth) {
      if (NO_LINE_START.includes(ch) && Array.from(line).length > 1) {
        const chars = Array.from(line);
        const last = chars.pop() ?? "";
        lines.push(chars.join(""));
        line = last + ch;
      } else {
        lines.push(line);
        line = ch;
      }
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// 带字距的文字（Canvas 的 letterSpacing 并非所有浏览器都支持，所以手动逐字绘制）。
function drawSpaced(
  ctx: Ctx,
  text: string,
  x: number,
  y: number,
  spacing: number,
  align: "left" | "right" = "left",
) {
  const chars = Array.from(text);
  const widths = chars.map((c) => ctx.measureText(c).width);
  const total = widths.reduce((a, b) => a + b, 0) + spacing * (chars.length - 1);
  let cx = align === "right" ? x - total : x;
  ctx.textAlign = "left";
  chars.forEach((c, i) => {
    ctx.fillText(c, cx, y);
    cx += widths[i] + spacing;
  });
}

function drawPerforations(ctx: Ctx, y: number) {
  const count = 19;
  const step = (W - 28 - 14) / (count - 1);
  ctx.fillStyle = rgba(CREAM, 0.16);
  for (let i = 0; i < count; i += 1) {
    roundedRectPath(ctx, 14 + i * step, y, 14, 9, 2.5);
    ctx.fill();
  }
}

// ---------- 四套纹样（按电影本能选用，仅在导出图使用，均为原创几何图形） ----------

function decorWanderer(ctx: Ctx, accent: string, b: Box) {
  const cx = b.x + b.w * 0.68;
  const cy = b.y + b.h * 0.4;
  const glow = ctx.createRadialGradient(cx, cy, 4, cx, cy, 130);
  glow.addColorStop(0, rgba(accent, 0.45));
  glow.addColorStop(1, rgba(accent, 0));
  ctx.fillStyle = glow;
  ctx.fillRect(b.x, b.y, b.w, b.h);

  ctx.lineWidth = 1.5;
  [140, 104, 72].forEach((r, i) => {
    ctx.strokeStyle = rgba(accent, 0.14 + i * 0.08);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  });
  ctx.fillStyle = rgba(accent, 0.95);
  ctx.beginPath();
  ctx.arc(cx, cy, 34, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = rgba(CREAM, 0.8);
  [
    [0.1, 0.2],
    [0.22, 0.55],
    [0.35, 0.15],
    [0.45, 0.42],
    [0.92, 0.14],
    [0.88, 0.62],
    [0.14, 0.38],
  ].forEach(([sx, sy]) => {
    ctx.beginPath();
    ctx.arc(b.x + b.w * sx, b.y + b.h * sy, 1.8, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = rgba(INK, 0.55);
  ctx.beginPath();
  ctx.moveTo(b.x, b.y + b.h * 0.78);
  ctx.quadraticCurveTo(b.x + b.w * 0.25, b.y + b.h * 0.6, b.x + b.w * 0.5, b.y + b.h * 0.76);
  ctx.quadraticCurveTo(b.x + b.w * 0.75, b.y + b.h * 0.92, b.x + b.w, b.y + b.h * 0.7);
  ctx.lineTo(b.x + b.w, b.y + b.h);
  ctx.lineTo(b.x, b.y + b.h);
  ctx.closePath();
  ctx.fill();
}

function decorProphet(ctx: Ctx, accent: string, b: Box) {
  ctx.strokeStyle = rgba(accent, 0.22);
  ctx.lineWidth = 1;
  for (let gx = b.x + 37; gx < b.x + b.w; gx += 37) {
    ctx.beginPath();
    ctx.moveTo(gx, b.y);
    ctx.lineTo(gx, b.y + b.h);
    ctx.stroke();
  }
  for (let gy = b.y + 37; gy < b.y + b.h; gy += 37) {
    ctx.beginPath();
    ctx.moveTo(b.x, gy);
    ctx.lineTo(b.x + b.w, gy);
    ctx.stroke();
  }

  const cx = b.x + b.w * 0.64;
  const cy = b.y + b.h * 0.42;
  const r = 52;
  ctx.fillStyle = rgba(accent, 0.12);
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = accent;
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.lineCap = "round";
  ctx.lineWidth = 9;
  ctx.beginPath();
  ctx.moveTo(cx + r * 0.72, cy + r * 0.72);
  ctx.lineTo(cx + r * 0.72 + 36, cy + r * 0.72 + 36);
  ctx.stroke();
  ctx.lineCap = "butt";

  ctx.strokeStyle = rgba(accent, 0.7);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx - 20, cy);
  ctx.lineTo(cx + 20, cy);
  ctx.moveTo(cx, cy - 20);
  ctx.lineTo(cx, cy + 20);
  ctx.stroke();

  ctx.fillStyle = rgba(CREAM, 0.7);
  [
    [0.14, 0.3],
    [0.28, 0.62],
    [0.4, 0.2],
    [0.9, 0.3],
  ].forEach(([sx, sy]) => {
    ctx.fillRect(b.x + b.w * sx, b.y + b.h * sy, 5, 5);
  });
}

function decorSavior(ctx: Ctx, accent: string, b: Box) {
  const cx = b.x + b.w * 0.5;
  const cy = b.y + b.h * 0.46;
  ctx.strokeStyle = rgba(accent, 0.35);
  ctx.lineWidth = 3;
  for (let i = 0; i < 18; i += 1) {
    const angle = (i / 18) * Math.PI * 2;
    const inner = 44;
    const outer = i % 2 === 0 ? 190 : 110;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner);
    ctx.lineTo(cx + Math.cos(angle) * outer, cy + Math.sin(angle) * outer);
    ctx.stroke();
  }
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.arc(cx, cy, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = rgba(accent, 0.8);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, 42, 0, Math.PI * 2);
  ctx.stroke();

  [
    [0.1, 0.22, 7],
    [0.2, 0.7, 5],
    [0.3, 0.3, 4],
    [0.78, 0.2, 8],
    [0.9, 0.55, 5],
    [0.7, 0.72, 6],
    [0.06, 0.5, 4],
  ].forEach(([sx, sy, r], i) => {
    ctx.fillStyle = i % 2 === 0 ? accent : rgba(CREAM, 0.75);
    ctx.beginPath();
    ctx.arc(b.x + b.w * sx, b.y + b.h * sy, r, 0, Math.PI * 2);
    ctx.fill();
  });
}

function decorRewriter(ctx: Ctx, accent: string, b: Box) {
  ctx.lineWidth = 7;
  for (let i = 0; i < 10; i += 1) {
    ctx.strokeStyle = rgba(accent, 0.1 + i * 0.03);
    ctx.beginPath();
    ctx.moveTo(b.x + i * 50 - 40, b.y + b.h + 10);
    ctx.lineTo(b.x + i * 50 + 80, b.y - 10);
    ctx.stroke();
  }

  ctx.strokeStyle = rgba(accent, 0.9);
  ctx.lineWidth = 2;
  ctx.setLineDash([10, 8]);
  ctx.strokeRect(b.x + b.w * 0.3, b.y + b.h * 0.18, b.w * 0.4, b.h * 0.52);
  ctx.setLineDash([]);

  ctx.fillStyle = rgba(accent, 0.9);
  ctx.fillRect(b.x + b.w * 0.58, b.y + b.h * 0.4, 74, 46);
  ctx.fillStyle = rgba(INK, 0.6);
  ctx.fillRect(b.x + b.w * 0.58 + 10, b.y + b.h * 0.4 + 10, 54, 6);
  ctx.fillRect(b.x + b.w * 0.58 + 10, b.y + b.h * 0.4 + 24, 34, 6);
}

// 纹样按本能选择（4 种），配色按人格（12 套）选择。12 套独立纹样留给后续任务。
const DECORS: Record<InstinctId, (ctx: Ctx, accent: string, box: Box) => void> = {
  sensory: decorWanderer,
  insight: decorProphet,
  improv: decorSavior,
  breakthrough: decorRewriter,
};

function drawFrame(ctx: Ctx, persona: Persona, b: Box) {
  const accent = persona.theme.accent;

  ctx.save();
  roundedRectPath(ctx, b.x, b.y, b.w, b.h, 14);
  ctx.fillStyle = rgba(INK, 0.35);
  ctx.fill();
  ctx.clip();
  DECORS[persona.instinct](ctx, accent, b);
  ctx.restore();

  roundedRectPath(ctx, b.x, b.y, b.w, b.h, 14);
  ctx.strokeStyle = rgba(accent, 0.6);
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 四角场记标记
  const m = 7;
  const l = 16;
  ctx.strokeStyle = rgba(accent, 0.85);
  ctx.lineWidth = 2;
  const corners: [number, number, number, number][] = [
    [b.x - m, b.y - m, 1, 1],
    [b.x + b.w + m, b.y - m, -1, 1],
    [b.x - m, b.y + b.h + m, 1, -1],
    [b.x + b.w + m, b.y + b.h + m, -1, -1],
  ];
  corners.forEach(([cx, cy, dx, dy]) => {
    ctx.beginPath();
    ctx.moveTo(cx + dx * l, cy);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx, cy + dy * l);
    ctx.stroke();
  });

  ctx.font = `600 11px ${SANS}`;
  ctx.fillStyle = rgba(CREAM, 0.8);
  drawSpaced(ctx, `SCENE ${persona.code} · TAKE 01`, b.x + 14, b.y + b.h - 14, 2);
  drawSpaced(ctx, "7 SHOTS", b.x + b.w - 14, b.y + b.h - 14, 2, "right");
}

type TagItem = { text: string; x: number; row: number; w: number };
const TAG_H = 30;
const TAG_ROW_GAP = 8;

function layoutTags(ctx: Ctx, tags: readonly string[]) {
  ctx.font = `600 15px ${SANS}`;
  const items: TagItem[] = [];
  let x = 0;
  let row = 0;
  for (const text of tags) {
    const w = Math.ceil(ctx.measureText(text).width) + 28;
    if (x > 0 && x + w > CONTENT_W) {
      x = 0;
      row += 1;
    }
    items.push({ text, x, row, w });
    x += w + 10;
  }
  const rows = row + 1;
  return { items, height: rows * TAG_H + (rows - 1) * TAG_ROW_GAP };
}

// 在 540 × 720 的逻辑画布上绘制整张卡片。ctx 需已 scale(2, 2)。
export function drawPersonaCard(ctx: Ctx, persona: Persona) {
  const t = persona.theme;
  ctx.save();
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";

  // 背景（不透明）
  const bg = ctx.createLinearGradient(0, 0, W * 0.45, H);
  bg.addColorStop(0, t.from);
  bg.addColorStop(0.55, t.via);
  bg.addColorStop(1, t.to);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const glow = ctx.createRadialGradient(W * 0.8, H * 0.12, 10, W * 0.8, H * 0.12, 320);
  glow.addColorStop(0, rgba(t.accent, 0.22));
  glow.addColorStop(1, rgba(t.accent, 0));
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // 票根区底色与齿孔
  ctx.fillStyle = rgba(INK, 0.35);
  ctx.fillRect(0, TEAR_Y, W, H - TEAR_Y);
  drawPerforations(ctx, 14);
  drawPerforations(ctx, H - 23);

  // 品牌行
  ctx.font = `700 22px ${SANS}`;
  ctx.fillStyle = CREAM;
  ctx.fillText("MoviePersona", MARGIN, 58);
  const brandW = ctx.measureText("MoviePersona").width;
  ctx.font = `500 15px ${SANS}`;
  ctx.fillStyle = rgba(CREAM, 0.65);
  ctx.fillText("影格", MARGIN + brandW + 10, 58);
  ctx.font = `600 13px ${SANS}`;
  ctx.fillStyle = t.accent;
  drawSpaced(ctx, `TYPE ${persona.code}`, W - MARGIN, 58, 3, "right");

  // 眉题
  ctx.font = `600 13px ${SANS}`;
  ctx.fillStyle = rgba(t.accent, 0.95);
  drawSpaced(ctx, `片场人设档案 · FILE ${persona.code}`, MARGIN, 92, 3);

  // 纹样框
  const frame: Box = { x: MARGIN, y: 108, w: CONTENT_W, h: 200 };
  drawFrame(ctx, persona, frame);

  // 标题
  ctx.fillStyle = t.accent;
  ctx.fillRect(MARGIN, 326, 40, 3);

  let titleSize = 64;
  ctx.font = `700 ${titleSize}px ${SERIF}`;
  while (titleSize > 44 && ctx.measureText(persona.title).width > CONTENT_W) {
    titleSize -= 2;
    ctx.font = `700 ${titleSize}px ${SERIF}`;
  }
  const titleBaseline = frame.y + frame.h + 26 + 52;
  ctx.fillStyle = CREAM;
  ctx.fillText(persona.title, MARGIN, titleBaseline);

  // 一句话文案
  ctx.font = `600 24px ${SANS}`;
  const taglineLines = wrapText(ctx, persona.tagline, CONTENT_W);
  const taglineFirst = titleBaseline + 24 + 24;
  ctx.fillStyle = CREAM;
  taglineLines.forEach((line, i) => {
    ctx.fillText(line, MARGIN, taglineFirst + i * 34);
  });
  const taglineEnd = taglineFirst + (taglineLines.length - 1) * 34 + 20;

  // 先测量标签和描述，保证整体不越过票根线
  const tagLayout = layoutTags(ctx, persona.tags);
  let descSize = 17;
  let descLines: string[] = [];
  let descLH = 29;
  let descFirst = 0;
  for (const size of [17, 16, 15, 14]) {
    ctx.font = `400 ${size}px ${SANS}`;
    const lines = wrapText(ctx, persona.description, CONTENT_W);
    const lh = Math.round(size * 1.7);
    const first = taglineEnd + 26 + size;
    const last = first + (lines.length - 1) * lh;
    descSize = size;
    descLines = lines;
    descLH = lh;
    descFirst = first;
    if (last + 20 + tagLayout.height <= TEAR_Y - 18) break;
  }

  ctx.strokeStyle = rgba(CREAM, 0.18);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(MARGIN, taglineEnd + 8);
  ctx.lineTo(W - MARGIN, taglineEnd + 8);
  ctx.stroke();

  ctx.font = `400 ${descSize}px ${SANS}`;
  ctx.fillStyle = rgba(CREAM, 0.82);
  descLines.forEach((line, i) => {
    ctx.fillText(line, MARGIN, descFirst + i * descLH);
  });
  const descLast = descFirst + (descLines.length - 1) * descLH;

  // 三个关键词
  const tagsTop = descLast + 20;
  ctx.font = `600 15px ${SANS}`;
  tagLayout.items.forEach((item) => {
    const x = MARGIN + item.x;
    const y = tagsTop + item.row * (TAG_H + TAG_ROW_GAP);
    roundedRectPath(ctx, x, y, item.w, TAG_H, 15);
    ctx.fillStyle = rgba(t.accent, 0.12);
    ctx.fill();
    ctx.strokeStyle = t.accent;
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.fillStyle = CREAM;
    ctx.fillText(item.text, x + 14, y + 20);
  });

  // 票根撕线与缺口
  ctx.strokeStyle = rgba(CREAM, 0.35);
  ctx.lineWidth = 1.2;
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.moveTo(24, TEAR_Y);
  ctx.lineTo(W - 24, TEAR_Y);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = INK;
  ctx.beginPath();
  ctx.arc(0, TEAR_Y, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(W, TEAR_Y, 12, 0, Math.PI * 2);
  ctx.fill();

  // 底部说明
  ctx.font = `600 18px ${SANS}`;
  ctx.fillStyle = rgba(CREAM, 0.92);
  ctx.fillText("电影人格探索 · 趣味测试", MARGIN, 674);
  ctx.font = `500 12px ${SANS}`;
  ctx.fillStyle = rgba(CREAM, 0.55);
  ctx.fillText("仅供娱乐，不代表专业心理评估", MARGIN, 694);
  ctx.font = `600 12px ${SANS}`;
  ctx.fillStyle = rgba(CREAM, 0.6);
  drawSpaced(ctx, "MOVIEPERSONA", W - MARGIN, 674, 2, "right");

  ctx.restore();
}

export function personaCardFileName(persona: Persona): string {
  return `moviepersona-${persona.id}.png`;
}

// 在本地用 Canvas 绘制并导出 PNG。不依赖外部图片、网络字体，也不发起任何网络请求。
export function renderPersonaCardBlob(persona: Persona): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = CARD_WIDTH;
      canvas.height = CARD_HEIGHT;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) {
        reject(new Error("Canvas 2D is not available"));
        return;
      }
      ctx.scale(SCALE, SCALE);
      drawPersonaCard(ctx, persona);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("toBlob returned null"))),
        "image/png",
      );
    } catch (error) {
      reject(error);
    }
  });
}