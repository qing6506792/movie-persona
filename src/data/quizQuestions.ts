import type { ScoredQuiz } from "@/types/quiz";

// 《你的人生拿了哪种电影剧本？》7 道题，题目与选项均为项目原创。
// value 是计分归属：选中即给对应类别 +1 分，页面不展示。
// Q1–Q4：电影本能（感受 / 洞察 / 即兴 / 破局），每题 4 个选项。
// Q5–Q7：剧情气质（慢镜头 / 高能剧情 / 荒诞奇幻），每题 3 个选项。
// 选项顺序刻意错开（S 感受，I 洞察，P 即兴，B 破局；A 慢镜头，H 高能，R 荒诞）：
//   Q1 S I P B | Q2 P S B I | Q3 I B S P | Q4 B P I S
//   Q5 A H R   | Q6 H R A   | Q7 R A H
// 题目 id 与选项 id 请保持稳定。
export const personaQuiz: ScoredQuiz = {
  id: "persona-quiz-v2",
  title: "你的人生拿了哪种电影剧本？",
  questions: [
    {
      id: "pq1",
      dimension: "instinct",
      text: "深夜醒来，你发现自己站在一个陌生的电影片场里。第一反应是？",
      options: [
        { id: "a", value: "sensory", text: "先被这里的光线和雾气吸住，站着多看了十秒" },
        { id: "b", value: "insight", text: "先找穿帮的地方，肯定有人在布景" },
        { id: "c", value: "improv", text: "拉住身边第一个群演：“咱们演到哪一场了？”" },
        { id: "d", value: "breakthrough", text: "直接往画面外走，我不按分镜行动" },
      ],
    },
    {
      id: "pq2",
      dimension: "instinct",
      text: "路上的一只猫突然开口说话了，你会？",
      options: [
        { id: "a", value: "improv", text: "蹲下来接话：“行，那你先说说今天的剧情。”" },
        { id: "b", value: "sensory", text: "点点头，只觉得这个黄昏忽然变得很温柔" },
        { id: "c", value: "breakthrough", text: "“别照剧本演了，这一集我们一起改走向。”" },
        { id: "d", value: "insight", text: "先怀疑附近有人藏了喇叭，绕着它走一圈" },
      ],
    },
    {
      id: "pq3",
      dimension: "instinct",
      text: "下雨天被困在屋檐下，这一幕的电影 BGM 是？",
      options: [
        { id: "a", value: "insight", text: "一段越听越不对劲的悬疑弦乐，我已经在数线索" },
        { id: "b", value: "breakthrough", text: "一首突然切歌的电子乐，主打不按套路" },
        { id: "c", value: "sensory", text: "慢慢飘起来的钢琴，混着一点雨声" },
        { id: "d", value: "improv", text: "随手敲着节拍，就地开一场即兴演奏" },
      ],
    },
    {
      id: "pq4",
      dimension: "instinct",
      text: "电梯里遇见一个半熟不熟的朋友，你会？",
      options: [
        { id: "a", value: "breakthrough", text: "“这次我们不聊天气，聊点离谱的。”" },
        { id: "b", value: "improv", text: "当场编一个有来有回的小剧场，把尴尬接成对手戏" },
        { id: "c", value: "insight", text: "默默观察他今天的表情，猜他刚才经历了什么" },
        { id: "d", value: "sensory", text: "微笑点头，心里已经在给这段沉默配乐" },
      ],
    },
    {
      id: "pq5",
      dimension: "mood",
      text: "你突然发现，自己的人生其实是一档长期拍摄的节目。你希望接下来的剧情是？",
      options: [
        { id: "a", value: "atmospheric", text: "多拍点我发呆的空镜，和慢慢走远的背影" },
        { id: "b", value: "high-energy", text: "对着镜头比个耶，今晚这集要有大场面" },
        { id: "c", value: "surreal", text: "发现摄像机其实是只会眨眼的章鱼，我决定和它合作" },
      ],
    },
    {
      id: "pq6",
      dimension: "mood",
      text: "给你的故事安排一件神秘道具，你会选？",
      options: [
        { id: "a", value: "high-energy", text: "一块永远停在倒数 59 秒的怀表" },
        { id: "b", value: "surreal", text: "一把能打开任何东西，包括天空的钥匙" },
        { id: "c", value: "atmospheric", text: "一盏只在夜里亮起的旧台灯" },
      ],
    },
    {
      id: "pq7",
      dimension: "mood",
      text: "电影结束前，你最希望银幕上留下哪个画面？",
      options: [
        { id: "a", value: "surreal", text: "所有人沿着一条悬浮的楼梯，慢慢走进云里" },
        { id: "b", value: "atmospheric", text: "日落时分，镜头慢慢拉远，什么都不用说" },
        { id: "c", value: "high-energy", text: "身后一场大爆炸，主角头也不回地走出画面" },
      ],
    },
  ],
};