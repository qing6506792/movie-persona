import type { Metadata } from "next";
import { Compass } from "lucide-react";
import MovieSelector from "@/components/movie/MovieSelector";

export const metadata: Metadata = {
  title: "电影偏好选择（原型）",
  description:
    "电影偏好选择原型：挑选你喜欢的电影，不会上传，也不会生成实际推荐。",
};

const glowStyle = {
  backgroundImage:
    "radial-gradient(60% 50% at 80% 0%, rgba(168,139,250,0.18), transparent 70%), radial-gradient(40% 40% at 5% 30%, rgba(168,139,250,0.07), transparent 70%)",
};

export default function DiscoverPage() {
  return (
    <div className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10" style={glowStyle} />

      <header className="mx-auto w-full max-w-6xl px-4 pb-10 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <Compass aria-hidden="true" className="size-5" />
          </span>
          <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-accent">
            原型 · 推荐尚未上线
          </span>
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-cream sm:text-5xl">
          告诉我们，你喜欢哪些电影
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
          当前为电影偏好选择原型。所选电影仅保留在当前页面状态中，不会上传或生成实际推荐；离开或刷新后选择可能丢失。
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist/80">
          它与电影人格测试相互独立，测试里的答案不会带到这里。
        </p>
      </header>

      <MovieSelector />
    </div>
  );
}