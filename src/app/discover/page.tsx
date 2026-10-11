import type { Metadata } from "next";
import { Compass } from "lucide-react";
import MovieSelector from "@/components/movie/MovieSelector";

export const metadata: Metadata = {
  title: "选择你喜欢的电影（推荐即将开拍）",
  description:
    "挑选你喜欢的电影，体验偏好选择流程。个性化推荐功能仍在开发中。",
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
            开发中 · 推荐尚未上线
          </span>
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-cream sm:text-5xl">
          告诉我们，你喜欢哪些电影
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
          个性化电影推荐还在开发中，目前不会给出任何推荐结果。你可以先体验“挑选偏好”这一步，它是未来推荐的起点。
        </p>
      </header>

      <MovieSelector />
    </div>
  );
}