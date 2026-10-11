import type { ScoredQuiz } from "@/types/quiz";

// 《你的人生拿了哪种电影剧本？》7 道题，题目与选项均为项目原创。
// persona 字段是计分归属：选中即给对应人格 +1 分，页面不展示。
// 题目 id 与选项 id 请保持稳定。
// 每题四个选项的人格顺序刻意错开：
//   Q1 A B C D | Q2 C A D B | Q3 B D A C | Q4 D C B A
//   Q5 A D C B | Q6 C B D A | Q7 B A D C
// （A=wanderer, B=prophet, C=savior, D=rewriter）
export const personaQuiz: ScoredQuiz = {
  id: "persona-quiz-v1",
  title: "你的人生拿了哪种电影剧本？",
  questions: [
    {
      id: "pq1",
      text: "深夜醒来，你发现自己站在一个陌生的电影场景里。第一反应是？",
      options: [
        { id: "a", persona: "wanderer", text: "先把这里的光线和雾气看个够，这镜头太好看了" },
        { id: "b", persona: "prophet", text: "先找穿帮的地方，肯定有人在布景" },
        { id: "c", persona: "savior", text: "大喊一声“有人吗”，顺便看看能不能和群演聊两句" },
        { id: "d", persona: "rewriter", text: "直接往画面外走，我不按分镜行动" },
      ],
    },
    {
      id: "pq2",
      text: "路上的一只猫突然开口说话了，你会？",
      options: [
        { id: "a", persona: "savior", text: "蹲下来问它有什么愿望，顺手给它加个彩蛋" },
        { id: "b", persona: "wanderer", text: "点点头，觉得世界本来就该有一点这样的梦幻" },
        { id: "c", persona: "rewriter", text: "“既然你都会说话了，这一集的剧本要不要一起写？”" },
        { id: "d", persona: "prophet", text: "先怀疑附近是不是有人藏了喇叭" },
      ],
    },
    {
      id: "pq3",
      text: "下雨天被困在屋檐下，此刻的电影 BGM 是？",
      options: [
        { id: "a", persona: "prophet", text: "一段越听越不对劲的悬疑弦乐" },
        { id: "b", persona: "rewriter", text: "一首突然切歌的电子乐，主打不按套路" },
        { id: "c", persona: "wanderer", text: "慢慢飘起来的钢琴，混着一点雨声" },
        { id: "d", persona: "savior", text: "一首热热闹闹的歌，我要在雨里加戏" },
      ],
    },
    {
      id: "pq4",
      text: "电梯里遇见一个半熟不熟的朋友，你会说？",
      options: [
        { id: "a", persona: "rewriter", text: "“这次我们不聊天气，聊点离谱的。”" },
        { id: "b", persona: "savior", text: "“我最近发现了一件特别离谱的事，你要听吗？”" },
        { id: "c", persona: "prophet", text: "“你有没有觉得，这层楼停得有点久？”" },
        { id: "d", persona: "wanderer", text: "微笑点头，心里已经在给这段沉默配乐" },
      ],
    },
    {
      id: "pq5",
      text: "你突然发现，自己的人生其实是一档长期拍摄的节目。你会？",
      options: [
        { id: "a", persona: "wanderer", text: "希望镜头多拍点我发呆的空镜" },
        { id: "b", persona: "rewriter", text: "去找导演，申请自己改剧本" },
        { id: "c", persona: "savior", text: "对着镜头比个耶，今天的彩蛋我来加" },
        { id: "d", persona: "prophet", text: "回看之前的细节，推理下一集会发生什么" },
      ],
    },
    {
      id: "pq6",
      text: "给你的故事安排一件神秘道具，你会选？",
      options: [
        { id: "a", persona: "savior", text: "一个永远开不完的惊喜盲盒" },
        { id: "b", persona: "prophet", text: "一把刻着看不懂符号的钥匙" },
        { id: "c", persona: "rewriter", text: "一支能改写台词的钢笔" },
        { id: "d", persona: "wanderer", text: "一盏只在夜里亮起的旧台灯" },
      ],
    },
    {
      id: "pq7",
      text: "电影结束前，你最希望银幕上留下哪个画面？",
      options: [
        { id: "a", persona: "prophet", text: "一个小细节，回头看才发现早有伏笔" },
        { id: "b", persona: "wanderer", text: "日落时分，镜头慢慢拉远，什么都不用说" },
        { id: "c", persona: "rewriter", text: "主角走出片场大门，把剧本留在身后" },
        { id: "d", persona: "savior", text: "所有人在片尾彩蛋里热热闹闹地合影" },
      ],
    },
  ],
};