import type { PersonaId } from "@/types/quiz";

export type PersonaTheme = {
  from: string;
  via: string;
  to: string;
  accent: string;
};

export type Persona = {
  id: PersonaId;
  code: "A" | "B" | "C" | "D";
  title: string;
  tagline: string;
  description: string;
  tags: [string, string, string];
  theme: PersonaTheme;
};

// 四种人格的文案与视觉主题。仅供娱乐，不代表任何专业心理评估。
export const personas: Record<PersonaId, Persona> = {
  wanderer: {
    id: "wanderer",
    code: "A",
    title: "精神漫游者",
    tagline: "人在现场，灵魂已经切到电影空镜。",
    description:
      "你总能在最普通的场景里捡到一帧好镜头：一束光、一阵风、一段没人接的沉默。你的内心戏比任何剧本都长，偏爱氛围与留白，也更愿意把话留在画面里，而不是说出口。",
    tags: ["浪漫内心戏", "氛围感收藏家", "留白爱好者"],
    theme: { from: "#101a3f", via: "#2b2a6b", to: "#0b0d14", accent: "#b9a6ff" },
  },
  prophet: {
    id: "prophet",
    code: "B",
    title: "反转预言家",
    tagline: "别人还在看开场，你已经怀疑导演。",
    description:
      "你习惯在热闹里留一只眼睛看细节：道具的位置、台词的语气、没被提起的人。你理性又敏锐，擅长在伏笔出现前就闻到反转的味道，最爱真相揭晓时那一点小小的得意。",
    tags: ["细节雷达", "反转嗅觉", "冷静推理"],
    theme: { from: "#07262b", via: "#0e4a4f", to: "#0b0d14", accent: "#6fe3b5" },
  },
  savior: {
    id: "savior",
    code: "C",
    title: "荒诞救世主",
    tagline: "世界快要大结局，你还在加彩蛋。",
    description:
      "越是手忙脚乱的场面，你越想开个玩笑把气氛救回来。脑洞大、表达热烈，喜欢意外和惊喜，身边的人常常因为你一句离谱的话，突然觉得今天也没那么糟。",
    tags: ["脑洞发电机", "气氛救场", "彩蛋制造者"],
    theme: { from: "#4a2208", via: "#8a3f0c", to: "#0b0d14", accent: "#ffc861" },
  },
  rewriter: {
    id: "rewriter",
    code: "D",
    title: "剧本破壁人",
    tagline: "这剧情不合理？那我自己改结局。",
    description:
      "你不太愿意被预设的台词推着走，遇到套路会先问一句为什么。独立、反套路、探索欲强，总想看看剧本之外还有什么，也敢于亲手写下和别人不一样的下一幕。",
    tags: ["反套路选手", "独立编剧", "探索欲拉满"],
    theme: { from: "#2a1245", via: "#5a2a6e", to: "#0b0d14", accent: "#f7b2d3" },
  },
};

// 生成分享文案。url 为 null 时不附任何链接。
export function buildShareText(persona: Persona, url: string | null): string {
  const lines = [
    `我在 MoviePersona 测出了【${persona.title}】🎬`,
    persona.tagline,
    "你的电影剧本是什么？",
  ];
  if (url) lines.push(url);
  return lines.join("\n");
}