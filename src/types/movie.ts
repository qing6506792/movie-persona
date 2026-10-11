// 电影的基础信息。目前只包含已经确定需要的字段，后续按真实需求再扩展。
export type Movie = {
  id: string;
  title: string;
  year?: number;
  genres?: string[];
  description?: string;
};

// 本地静态片库里的电影：年份、类型、简介都已填写。
export type CatalogMovie = Movie & {
  year: number;
  genres: string[];
  description: string;
};

// Cold-start Seed Set：用户主动选择的“静态偏好电影”集合，值为电影 id。
// 注意：
// - 它不是按时间排序的观影历史。Set 虽然保留插入顺序，但该顺序不代表观看顺序。
// - 它不是点击日志、评分序列，也不是 SASRec 等序列模型的训练样本。
// - 请不要给它附加任何时间戳。
export type SeedMovieIds = ReadonlySet<string>;