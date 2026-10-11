import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

const glowStyle = {
  backgroundImage:
    "radial-gradient(60% 50% at 78% 18%, rgba(168,139,250,0.22), transparent 70%), radial-gradient(45% 40% at 8% 92%, rgba(168,139,250,0.10), transparent 70%)",
};

const perforationStyle = {
  backgroundImage:
    "repeating-linear-gradient(90deg, rgba(245,242,239,0.16) 0 12px, transparent 12px 32px)",
};

const frameGlowStyle = {
  backgroundImage:
    "linear-gradient(135deg, rgba(168,139,250,0.16), transparent 55%)",
};

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10">
      <div aria-hidden="true" className="absolute inset-0 -z-10" style={glowStyle} />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-3 -z-10 h-2 opacity-70"
        style={perforationStyle}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-3 -z-10 h-2 opacity-70"
        style={perforationStyle}
      />

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-14 lg:px-8 lg:py-28">
        <div>
          <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-mist">
            <Sparkles aria-hidden="true" className="size-3.5 shrink-0 text-accent" />
            <span>
              {siteConfig.name} · {siteConfig.status}
            </span>
          </p>

          <h1 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-cream sm:text-5xl">
            <span className="block">
              如果你的人生是一部<span className="whitespace-nowrap">电影，</span>
            </span>
            <span className="block text-accent">你会是什么角色？</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
            用一分钟发现你的电影人格，找到与你灵魂同频的电影。
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/quizzes"
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-base font-semibold text-ink transition hover:bg-accent/90 hover:shadow-[0_0_32px_rgba(168,139,250,0.45)] active:scale-[0.98] sm:w-auto"
            >
              测测我的电影人格
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="/discover"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/20 px-6 text-base font-medium text-cream transition hover:border-accent/60 hover:bg-white/5 active:scale-[0.98] sm:w-auto"
            >
              发现我的专属电影
            </Link>
          </div>

          <p className="mt-4 text-sm text-mist/80">
            测试与推荐功能仍在开发中，按钮将带你前往功能预告页。
          </p>
        </div>

        <div aria-hidden="true" className="mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative flex aspect-[4/3] min-h-56 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-surface p-5 shadow-2xl shadow-black/40 sm:p-6">
            <div className="absolute inset-0" style={frameGlowStyle} />
            <div className="absolute inset-x-0 top-0 h-3 bg-black/50" />
            <div className="absolute inset-x-0 bottom-0 h-3 bg-black/50" />

            <div className="relative mt-2 flex items-center justify-between text-[0.65rem] tracking-[0.25em] text-mist">
              <span>SCENE 01 · TAKE 01</span>
              <span>TC 00:01:00</span>
            </div>

            <div className="relative">
              <p className="text-xs tracking-[0.3em] text-accent">主演</p>
              <p className="mt-1 font-display text-6xl font-bold leading-none text-cream">
                你
              </p>
            </div>

            <div className="relative mb-2 space-y-1 text-xs text-mist">
              <p>类型 · 待发现</p>
              <p>片长 · 约一分钟</p>
              <p className="text-mist/70">人格片头 · 尚未开拍</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}