// 电影的基础信息。目前只包含已经确定需要的字段，后续按真实需求再扩展。
export type Movie = {
  id: string;
  title: string;
  year?: number;
  genres?: string[];
  description?: string;
};