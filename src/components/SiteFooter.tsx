import Link from "next/link";
import { Clapperboard } from "lucide-react";
import { getGithubUrl, navLinks, siteConfig } from "@/config/site";

export default function SiteFooter() {
  const githubUrl = getGithubUrl();

  return (
    <footer className="border-t border-white/10 bg-surface/40">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:px-8">
        <div>
          <div className="flex items-center gap-2 text-cream">
            <Clapperboard aria-hidden="true" className="size-5 text-accent" />
            <span className="font-semibold tracking-tight">{siteConfig.name}</span>
            <span className="text-sm text-mist">{siteConfig.nameZh}</span>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist">
            面向电影爱好者的电影人格探索与个性化电影推荐开源项目，正在一步步搭建。
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block py-1 text-mist transition-colors hover:text-cream"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 text-sm leading-relaxed text-mist">
          <p>
            <span className="text-cream">开发状态</span> · {siteConfig.status}
          </p>
          <p>正式的测试与推荐功能尚未上线，目前提供答题交互演示和电影偏好选择演示。</p>
          <p>
            <span className="text-cream">开源</span> ·{" "}
            {githubUrl ? (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-4 hover:underline"
              >
                在 GitHub 查看源码，欢迎 Star
              </a>
            ) : (
              <span>代码将在 GitHub 开源，仓库地址待配置</span>
            )}
          </p>
        </div>
      </div>

      <div className="border-t border-white/5 px-4 py-4 text-center text-xs text-mist/70">
        © 2026 {siteConfig.name} {siteConfig.nameZh} · MIT License · 页面暂未使用任何电影海报等第三方影视素材
      </div>
    </footer>
  );
}