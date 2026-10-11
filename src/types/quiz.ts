// 测试的基础结构。目前只描述“题目和选项”，
// 暂不包含计分、人格结果等字段，等正式测试开发时再统一设计。

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