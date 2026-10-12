import type { InstinctId, MoodId, PersonaId } from "@/types/quiz";

export type PersonaTheme = {
  from: string;
  via: string;
  to: string;
  accent: string;
};

export type Persona = {
  id: PersonaId;
  instinct: InstinctId;
  mood: MoodId;
  // 原创档案编号，仅作设计元素，不代表任何真实统计。
  code: string;
  title: string;
  tagline: string;
  description: string;
  tags: [string, string, string];
  // 一句轻微自嘲的 B 面属性
  flaw: string;
  theme: PersonaTheme;
};

// 12 种人格的文案与视觉主题。仅供娱乐，不代表任何专业心理评估。
export const personas: Record<PersonaId, Persona> = {
  "sensory-atmospheric": {
    id: "sensory-atmospheric",
    instinct: "sensory",
    mood: "atmospheric",
    code: "01",
    title: "雨夜漫游者",
    tagline: "雨一下，你就自动进入长镜头。",
    description:
      "你对氛围的接收天线格外灵敏：湿掉的路面、窗上的雾、路灯下一小圈光，都能让你停下来。比起热闹的结局，你更在意某一帧此刻的温度。",
    tags: ["长镜头体质", "氛围接收器", "雨声收藏家"],
    flaw: "看雨看得入神，经常忘了自己要去哪。",
    theme: { from: "#0e1830", via: "#1d3557", to: "#0b0d14", accent: "#8fb8ff" },
  },
  "sensory-high-energy": {
    id: "sensory-high-energy",
    instinct: "sensory",
    mood: "high-energy",
    code: "02",
    title: "极光追猎者",
    tagline: "有名场面，你就想在现场。",
    description:
      "你对强烈的感官刺激毫无抵抗力：震耳的配乐、炸开的光、全场同时倒吸一口气的瞬间。你相信电影最好的部分是身临其境，宁愿奔赴现场，也不想只听别人转述。",
    tags: ["感官冲浪手", "现场派", "高光收割机"],
    flaw: "为了抢个好位置，总是第一个到场。",
    theme: { from: "#07302e", via: "#0f5a50", to: "#0b0d14", accent: "#5ef2c0" },
  },
  "sensory-surreal": {
    id: "sensory-surreal",
    instinct: "sensory",
    mood: "surreal",
    code: "03",
    title: "白日梦游师",
    tagline: "你的现实里，常有一帧在飘。",
    description:
      "你眼里的世界总带着一层柔光滤镜：云像幕布，楼像布景，路过的猫仿佛刚下戏。你擅长把平凡的一天看成一场小梦境，也因此，常常比身体先到另一个地方。",
    tags: ["柔焦滤镜", "云端放映", "梦境剪辑"],
    flaw: "对话进行到一半，灵魂已经去看云了。",
    theme: { from: "#26123f", via: "#4a2a78", to: "#0b0d14", accent: "#d9a8ff" },
  },
  "insight-atmospheric": {
    id: "insight-atmospheric",
    instinct: "insight",
    mood: "atmospheric",
    code: "04",
    title: "暗室观察员",
    tagline: "安静的人，才看见全部伏笔。",
    description:
      "你不爱抢镜，却总是第一个注意到细节：窗边多出的一只杯子、对白里一瞬的停顿。你习惯在安静里慢慢拼图，等所有线索各就各位，再轻轻点头。",
    tags: ["伏笔拼图师", "安静雷达", "慢热推理"],
    flaw: "想得太细，结果错过了该开口的时机。",
    theme: { from: "#141c26", via: "#2a3a4a", to: "#0b0d14", accent: "#a9c4d9" },
  },
  "insight-high-energy": {
    id: "insight-high-energy",
    instinct: "insight",
    mood: "high-energy",
    code: "05",
    title: "反转捕手",
    tagline: "反转刚要来，你已经接住了。",
    description:
      "剧情越快你越清醒：在爆点之前，你已经把嫌疑人排了三轮。你享受那一瞬间的拍案叫绝，也享受把一个个“不可能”慢慢推翻，再悄悄得意一小下。",
    tags: ["反转嗅觉", "推理加速器", "结局预判"],
    flaw: "剧透的冲动，总在片尾前一分钟发作。",
    theme: { from: "#2a2f08", via: "#4f5a10", to: "#0b0d14", accent: "#e6f06a" },
  },
  "insight-surreal": {
    id: "insight-surreal",
    instinct: "insight",
    mood: "surreal",
    code: "06",
    title: "平行时空记录员",
    tagline: "你记得，那些没发生的剧情。",
    description:
      "你总在日常里发现不对劲的缝隙：重复出现的数字、似曾相识的路口。你愿意相信每个巧合背后都有一条平行剧情，并认真做着笔记，等某天对上暗号。",
    tags: ["巧合笔记本", "暗号收集者", "多线索脑洞"],
    flaw: "把一次普通的迟到，推理成了三条时间线。",
    theme: { from: "#151a4a", via: "#2c3590", to: "#0b0d14", accent: "#a5a0ff" },
  },
  "improv-atmospheric": {
    id: "improv-atmospheric",
    instinct: "improv",
    mood: "atmospheric",
    code: "07",
    title: "午夜放映员",
    tagline: "深夜安静了，你的小剧场才开场。",
    description:
      "你喜欢在夜深人静时开一场只给自己的放映：随手点一部老片，随口接几句台词。你不追求完整的剧本，只要当下的气氛对了，随性发挥就是最好的演出。",
    tags: ["深夜场次", "随口台词", "老片爱好者"],
    flaw: "说好只看一集，天亮才发现片尾字幕。",
    theme: { from: "#3a1f0a", via: "#7a4416", to: "#0b0d14", accent: "#f5a65b" },
  },
  "improv-high-energy": {
    id: "improv-high-energy",
    instinct: "improv",
    mood: "high-energy",
    code: "08",
    title: "失控特技演员",
    tagline: "分镜写好了，你偏要自由发挥。",
    description:
      "你的信条是先冲再说：台词没背熟，动作先到位，现场出什么状况就接什么招。你带来的往往是全场最意外的一幕，当然，也包括最需要补拍的几条。",
    tags: ["先冲再说", "临场发挥", "名场面制造机"],
    flaw: "每次都说有分寸，每次都需要补拍。",
    theme: { from: "#4a1608", via: "#8f2f12", to: "#0b0d14", accent: "#ff8a5c" },
  },
  "improv-surreal": {
    id: "improv-surreal",
    instinct: "improv",
    mood: "surreal",
    code: "09",
    title: "彩蛋特工",
    tagline: "你在严肃的剧情里，埋了个梗。",
    description:
      "你的脑洞总能在最严肃的场面里，悄悄塞进一个离谱的彩蛋：一句冷不丁的玩笑、一个突然的怪表情。身边人常在三秒后才笑出声，然后发现今天没那么糟。",
    tags: ["脑洞彩蛋", "冷不丁玩笑", "气氛特工"],
    flaw: "笑点太隐蔽，经常只有自己先笑场。",
    theme: { from: "#3f0f3a", via: "#7a1f6e", to: "#0b0d14", accent: "#ff7ad9" },
  },
  "breakthrough-atmospheric": {
    id: "breakthrough-atmospheric",
    instinct: "breakthrough",
    mood: "atmospheric",
    code: "10",
    title: "片尾改写者",
    tagline: "字幕升起来，你才开始改结局。",
    description:
      "你不爱喧闹的反抗，更习惯在安静里重写：对一个结局不满意，就在心里续写出属于自己的下一幕。你相信片尾字幕不是结束，而是下一部的片头。",
    tags: ["结局重写", "安静叛逆", "续集构想"],
    flaw: "为了续写别人的结局，忘了先交自己的作业。",
    theme: { from: "#3a1230", via: "#6b2a55", to: "#0b0d14", accent: "#f7b2d3" },
  },
  "breakthrough-high-energy": {
    id: "breakthrough-high-energy",
    instinct: "breakthrough",
    mood: "high-energy",
    code: "11",
    title: "片场出逃者",
    tagline: "导演喊开始，你已经翻出围墙。",
    description:
      "按部就班让你坐立难安，直觉一来你就想往画面外跑。你不怕走错路，更怕剧本里永远只有同一条路。你的故事常常冲出预设片场，一头撞进更大的世界。",
    tags: ["越界冲动", "反套路", "路线叛逃"],
    flaw: "跑得太快，常常忘了带行李。",
    theme: { from: "#4a0a18", via: "#8a1830", to: "#0b0d14", accent: "#ff5f6d" },
  },
  "breakthrough-surreal": {
    id: "breakthrough-surreal",
    instinct: "breakthrough",
    mood: "surreal",
    code: "12",
    title: "镜外导演",
    tagline: "你站在镜头外，笑着改剧本。",
    description:
      "你好像总能从故事外面看一眼：这一幕的逻辑可以更怪一点，这个人设可以反着写。你敢于把荒诞当成工具，亲手推倒第四面墙，再顺势给现实添一场新戏。",
    tags: ["第四面墙", "荒诞编剧", "视角切换"],
    flaw: "改着改着，发现自己也在别人的剧本里。",
    theme: { from: "#08303f", via: "#135a73", to: "#0b0d14", accent: "#9ff0ff" },
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