import type { CatalogMovie } from "@/types/movie";

// 本地静态电影样本（演示规模，非完整片库）。
// - 片名与年份为真实作品信息（年份取通行影视资料标注的作品年份），简介为项目原创。
// - 不含评分、热度、海报或任何外部数据来源。
// - id 为本地稳定标识，一经使用请不要修改。

export const MOVIE_GENRES = [
  "科幻",
  "动画",
  "剧情",
  "悬疑",
  "喜剧",
  "爱情",
  "冒险",
  "奇幻",
  "犯罪",
] as const;

export type MovieGenre = (typeof MOVIE_GENRES)[number];

type CatalogEntry = Omit<CatalogMovie, "genres"> & { genres: MovieGenre[] };

const entries: CatalogEntry[] = [
  {
    id: "movie-inception",
    title: "盗梦空间",
    year: 2010,
    genres: ["科幻", "悬疑"],
    description: "潜入梦境层层深入，一场关于记忆与现实的冒险。",
  },
  {
    id: "movie-interstellar",
    title: "星际穿越",
    year: 2014,
    genres: ["科幻", "冒险"],
    description: "穿过虫洞寻找新家园，父女之间隔着时间的距离。",
  },
  {
    id: "movie-spirited-away",
    title: "千与千寻",
    year: 2001,
    genres: ["动画", "奇幻"],
    description: "误入神灵世界的女孩，在奇异的澡堂里学着长大。",
  },
  {
    id: "movie-shawshank",
    title: "肖申克的救赎",
    year: 1994,
    genres: ["剧情", "犯罪"],
    description: "高墙之内，一个人用耐心与希望守住自己的自由。",
  },
  {
    id: "movie-forrest-gump",
    title: "阿甘正传",
    year: 1994,
    genres: ["剧情", "爱情"],
    description: "一个质朴的人，不经意间走过了半部美国当代史。",
  },
  {
    id: "movie-truman-show",
    title: "楚门的世界",
    year: 1998,
    genres: ["剧情", "科幻"],
    description: "一个人的生活被全世界围观，他决定走出那片天空。",
  },
  {
    id: "movie-parasite",
    title: "寄生虫",
    year: 2019,
    genres: ["剧情", "悬疑"],
    description: "两个家庭的生活悄然交错，笑声背后是尖锐的落差。",
  },
  {
    id: "movie-intouchables",
    title: "触不可及",
    year: 2011,
    genres: ["喜剧", "剧情"],
    description: "一位富翁与一位护工，在彼此身上找到了久违的快乐。",
  },
  {
    id: "movie-zootopia",
    title: "疯狂动物城",
    year: 2016,
    genres: ["动画", "喜剧"],
    description: "兔子警官与狐狸搭档查案，在偏见与梦想之间前行。",
  },
  {
    id: "movie-life-of-pi",
    title: "少年派的奇幻漂流",
    year: 2012,
    genres: ["冒险", "奇幻"],
    description: "海难之后，少年与一只老虎同乘一叶救生艇。",
  },
  {
    id: "movie-infernal-affairs",
    title: "无间道",
    year: 2002,
    genres: ["犯罪", "悬疑"],
    description: "警队与黑帮，两个卧底在身份的夹缝里煎熬。",
  },
  {
    id: "movie-let-the-bullets-fly",
    title: "让子弹飞",
    year: 2010,
    genres: ["喜剧", "剧情"],
    description: "一个土匪冒充县长，小城里上演一场斗智斗勇。",
  },
  {
    id: "movie-coco",
    title: "寻梦环游记",
    year: 2017,
    genres: ["动画", "奇幻"],
    description: "热爱音乐的男孩闯入亡灵世界，追寻家族的秘密。",
  },
  {
    id: "movie-your-name",
    title: "你的名字。",
    year: 2016,
    genres: ["动画", "爱情"],
    description: "素未谋面的两人梦中互换身体，命运随之悄悄相连。",
  },
  {
    id: "movie-the-invisible-guest",
    title: "看不见的客人",
    year: 2016,
    genres: ["悬疑", "犯罪"],
    description: "一间密室，一桩命案，一场步步为营的对话。",
  },
  {
    id: "movie-la-la-land",
    title: "爱乐之城",
    year: 2016,
    genres: ["爱情", "剧情"],
    description: "追梦的演员与爵士乐手相遇，爱情与理想难以两全。",
  },
];

export const catalogMovies: CatalogMovie[] = entries;