// 测试的基础结构。

export type QuizOption = {
  id: string;
  text: string;
};

export type QuizQuestion = {
  id: string;
  text: string;
  options: QuizOption[];
};

export type Quiz = {
  id: string;
  title: string;
  questions: QuizQuestion[];
};

// ---- 双维计分测试用的扩展类型 ----

// 维度一：电影本能（Q1–Q4）
export const INSTINCT_IDS = ["sensory", "insight", "improv", "breakthrough"] as const;
export type InstinctId = (typeof INSTINCT_IDS)[number];

// 维度二：剧情气质（Q5–Q7）
export const MOOD_IDS = ["atmospheric", "high-energy", "surreal"] as const;
export type MoodId = (typeof MOOD_IDS)[number];

// 12 种人格 id = 本能-气质。少写任何一种，Record<PersonaId, …> 都会在 tsc 阶段报错。
export type PersonaId = `${InstinctId}-${MoodId}`;

export function makePersonaId(instinct: InstinctId, mood: MoodId): PersonaId {
  return `${instinct}-${mood}`;
}

export const PERSONA_IDS: readonly PersonaId[] = INSTINCT_IDS.flatMap((instinct) =>
  MOOD_IDS.map((mood) => makePersonaId(instinct, mood)),
);

// 计分选项：每个选项归属一个类别（value）。该归属只存在于数据里，页面不展示。
export type InstinctOption = QuizOption & { value: InstinctId };
export type MoodOption = QuizOption & { value: MoodId };

export type InstinctQuestion = {
  id: string;
  text: string;
  dimension: "instinct";
  options: InstinctOption[];
};

export type MoodQuestion = {
  id: string;
  text: string;
  dimension: "mood";
  options: MoodOption[];
};

export type ScoredQuestion = InstinctQuestion | MoodQuestion;

export type ScoredQuiz = {
  id: string;
  title: string;
  questions: ScoredQuestion[];
};