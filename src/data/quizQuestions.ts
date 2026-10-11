import type { Quiz } from "@/types/quiz";

// 电影人格测试的题目草稿（7 题，静态数据）。
// 说明：
// - 目前没有计分规则，选项不对应任何人格结果。
// - 暂未接入任何页面，/quizzes 仍使用两道题的 demoQuiz。
// - 题目与选项均为项目原创。
// - 题目 id 与选项 id 一经使用请保持稳定，后续加计分时按 id 关联。
export const personaQuizDraft: Quiz = {
  id: "persona-draft-v1",
  title: "电影人格测试（题库草稿）",
  questions: [
    {
      id: "pq1",
      text: "打开片库，你通常怎么决定看哪一部？",
      options: [
        { id: "a", text: "先看预告片和大家的口碑" },
        { id: "b", text: "听朋友推荐" },
        { id: "c", text: "凭当下的心情随手点开" },
        { id: "d", text: "把喜欢的老片再看一遍" },
      ],
    },
    {
      id: "pq2",
      text: "一部电影最先打动你的往往是？",
      options: [
        { id: "a", text: "一个让你记很久的人物" },
        { id: "b", text: "画面和光影的质感" },
        { id: "c", text: "配乐响起的那一刻" },
        { id: "d", text: "出人意料的剧情反转" },
      ],
    },
    {
      id: "pq3",
      text: "开场十分钟还没抓住你，你会？",
      options: [
        { id: "a", text: "再给它一点耐心，慢热的片子常有惊喜" },
        { id: "b", text: "边看边刷手机，看看后面怎样" },
        { id: "c", text: "直接换一部" },
        { id: "d", text: "先去搜搜别人怎么评价" },
      ],
    },
    {
      id: "pq4",
      text: "你更喜欢哪种结局？",
      options: [
        { id: "a", text: "圆满收束，让人心里踏实" },
        { id: "b", text: "留白开放，自己去想" },
        { id: "c", text: "带点遗憾，回味更久" },
        { id: "d", text: "最后来一记反转" },
      ],
    },
    {
      id: "pq5",
      text: "更适合你的电影节奏是？",
      options: [
        { id: "a", text: "紧凑利落，一路不停" },
        { id: "b", text: "舒缓从容，像在散步" },
        { id: "c", text: "起伏明显，有张有弛" },
        { id: "d", text: "看内容，节奏不重要" },
      ],
    },
    {
      id: "pq6",
      text: "面对没接触过的电影类型，你的态度是？",
      options: [
        { id: "a", text: "很好奇，愿意主动试试" },
        { id: "b", text: "有人带着看就愿意" },
        { id: "c", text: "更想把熟悉的类型看透" },
        { id: "d", text: "看情况，取决于当天心情" },
      ],
    },
    {
      id: "pq7",
      text: "一部电影看完，你更希望它带给你什么？",
      options: [
        { id: "a", text: "痛快，放松一下" },
        { id: "b", text: "思考，值得慢慢琢磨" },
        { id: "c", text: "共鸣，像被人懂了" },
        { id: "d", text: "新奇，打开一扇没见过的窗" },
      ],
    },
  ],
};