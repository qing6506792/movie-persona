export const siteConfig = {
  name: "MoviePersona",
  nameZh: "影格",
  title: "MoviePersona 影格｜电影人格测试与电影推荐",
  description:
    "用一分钟发现你的电影人格，找到与你灵魂同频的电影。面向大学生的开源电影人格测试与推荐项目。",
  // GitHub 仓库地址。尚未创建仓库时保持空字符串 ""，网站会显示“待配置”，不会生成任何跳转。
  // 有了真实地址后，只需要改这一处，例如："https://github.com/your-name/movie-persona"
  githubUrl: "",
  status: "V0.0.1 · 早期开发中",
};

export const navLinks = [
  { href: "/quizzes", label: "电影人格测试" },
  { href: "/discover", label: "电影推荐" },
];

// 只有形如 https://github.com/... 的地址才视为已配置，否则返回 null
export function getGithubUrl(): string | null {
  const url = siteConfig.githubUrl.trim();
  return url.startsWith("https://github.com/") ? url : null;
}