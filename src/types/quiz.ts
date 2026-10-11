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

// ---- 计分测试用的扩展类型 ----

// 人格类型的稳定 id。新增或改名请同步修改 personas.ts。
export const PERSONA_IDS = ["wanderer", "prophet", "savior", "rewriter"] as const;
export type PersonaId = (typeof PERSONA_IDS)[number];

// 计分选项：每个选项归属一个人格。该归属只存在于数据里，页面不展示。
export type ScoredQuizOption = QuizOption & { persona: PersonaId };

export type ScoredQuizQuestion = Omit<QuizQuestion, "options"> & {
  options: ScoredQuizOption[];
};

export type ScoredQuiz = Omit<Quiz, "questions"> & {
  questions: ScoredQuizQuestion[];
};