import type { Quiz } from "@/types/quiz";

// 仅用于交互演示的两道示例题。
// 没有计分，也不对应任何电影人格结果，不是正式测试数据。
export const demoQuiz: Quiz = {
  id: "demo-interaction",
  title: "交互演示（两道示例题）",
  questions: [
    {
      id: "demo-q1",
      text: "周五晚上，你更想怎样度过一场电影时光？",
      options: [
        { id: "a", text: "一个人窝在沙发里，关灯慢慢看" },
        { id: "b", text: "约几个朋友，边看边聊" },
        { id: "c", text: "去影院，享受大银幕和黑暗" },
        { id: "d", text: "随手点开一部，边看边做别的事" },
      ],
    },
    {
      id: "demo-q2",
      text: "看完一部电影后，你最先想做的是？",
      options: [
        { id: "a", text: "安静待一会儿，回味结尾" },
        { id: "b", text: "马上找人聊聊剧情" },
        { id: "c", text: "搜一搜幕后故事和影评" },
        { id: "d", text: "立刻开始下一部" },
      ],
    },
  ],
};