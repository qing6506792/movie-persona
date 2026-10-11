export const siteConfig = {
  name: "MoviePersona",
  nameZh: "影格",
  title: "MoviePersona 影格｜电影人格测试与电影推荐",
  description:
    "用一分钟发现你的电影人格，找到与你灵魂同频的电影。面向电影爱好者的电影人格探索与个性化电影推荐开源项目。",
  // GitHub 仓库地址。保持空字符串 "" 时，网站会显示“待配置”，不会生成任何跳转。
  githubUrl: "https://github.com/qing6506792/movie-persona",
  status: "V0.0.3 · 早期开发中",
};

export type NavLink = { href: string; label: string; short?: string };

export const navLinks: NavLink[] = [
  { href: "/", label: "首页" },
  { href: "/quizzes", label: "电影人格测试", short: "人格测试" },
  { href: "/discover", label: "电影推荐" },
];

// 只有形如 https://github.com/... 的地址才视为已配置，否则返回 null
export function getGithubUrl(): string | null {
  const url = siteConfig.githubUrl.trim();
  return url.startsWith("https://github.com/") ? url : null;
}