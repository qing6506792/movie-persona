import { PERSONA_IDS } from "@/types/quiz";
import type { PersonaId, ScoredQuiz } from "@/types/quiz";

export type ScoreResult = {
  scores: Record<PersonaId, number>;
  winner: PersonaId | null;
};

// 纯函数：没有随机数，也不依赖外部状态。
// 规则：选中的选项给对应人格 +1 分，总分最高者胜。
// 平局：从最后一题往前找，第一个属于“并列最高分集合”的人格获胜。
// 没有任何有效作答时 winner 为 null。
export function scoreAnswers(
  quiz: ScoredQuiz,
  answers: Record<string, string>,
): ScoreResult {
  const scores: Record<PersonaId, number> = {
    wanderer: 0,
    prophet: 0,
    savior: 0,
    rewriter: 0,
  };

  const picked: (PersonaId | null)[] = quiz.questions.map((question) => {
    const option = question.options.find((o) => o.id === answers[question.id]);
    return option ? option.persona : null;
  });

  for (const persona of picked) {
    if (persona) scores[persona] += 1;
  }

  const max = Math.max(...PERSONA_IDS.map((id) => scores[id]));
  if (max === 0) return { scores, winner: null };

  const tied = new Set<PersonaId>(PERSONA_IDS.filter((id) => scores[id] === max));

  for (let i = picked.length - 1; i >= 0; i -= 1) {
    const persona = picked[i];
    if (persona && tied.has(persona)) return { scores, winner: persona };
  }

  return { scores, winner: null };
}