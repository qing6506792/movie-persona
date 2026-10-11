import Link from "next/link";
import { Clapperboard, Star } from "lucide-react";
import { getGithubUrl, navLinks, siteConfig } from "@/config/site";

const navItemClass =
  "inline-flex min-h-11 items-center rounded-full px-2.5 text-sm text-mist transition-colors hover:bg-white/5 hover:text-cream sm:px-3";

export default function SiteHeader() {
  const githubUrl = getGithubUrl();

  return (
    <header className="z-50 border-b border-white/10 bg-ink/85 backdrop-blur sm:sticky sm:top-0">
      <div className="mx-auto flex w-full max-w-6xl flex-col px-4 py-1.5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 self-start rounded-full pr-3 text-cream"
        >
          <Clapperboard aria-hidden="true" className="size-5 text-accent" />
          <span className="font-semibold tracking-tight">{siteConfig.name}</span>
          <span className="text-sm text-mist">{siteConfig.nameZh}</span>
        </Link>

        <nav
          aria-label="主导航"
          className="-mx-2.5 flex flex-wrap items-center sm:mx-0"
        >
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className={navItemClass}>
              {item.label}
            </Link>
          ))}

          {githubUrl ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={navItemClass}
            >
              <Star aria-hidden="true" className="mr-1.5 size-4 text-accent" />
              GitHub
              <span className="ml-1 hidden text-xs md:inline">· 欢迎 Star</span>
            </a>
          ) : (
            <span
              title="GitHub 仓库地址尚未配置"
              className="ml-1 inline-flex min-h-9 items-center rounded-full border border-dashed border-white/20 px-3 text-sm text-mist/80"
            >
              GitHub
              <span className="ml-1.5 text-xs">待配置</span>
            </span>
          )}
        </nav>
      </div>
    </header>
  );
}