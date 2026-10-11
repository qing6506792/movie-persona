import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ClipboardList } from "lucide-react";
import QuizDemo from "@/components/quiz/QuizDemo";

export const metadata: Metadata = {
  title: "电影人格测试（交互演示）",
  description:
    "电影人格测试交互演示：两道示例题，不生成人格结果，答案不会用于电影推荐。",
};

const glowStyle = {
  backgroundImage:
    "radial-gradient(60% 50% at 80% 10%, rgba(168,139,250,0.20), transparent 70%), radial-gradient(40% 40% at 5% 95%, rgba(168,139,250,0.08), transparent 70%)",
};

export default function QuizzesPage() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10" style={glowStyle} />

      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <ClipboardList aria-hidden="true" className="size-5" />
          </span>
          <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-accent">
            交互演示 · 非正式测试
          </span>
        </div>

        <p className="mt-8 text-sm font-medium tracking-widest text-accent">
          电影人格测试
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-cream sm:text-5xl">
          先来试试答题的手感
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
          当前为电影人格测试交互演示，暂不生成正式人格结果。测试答案不会用于电影推荐，也不会跨页面保存。
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist/80">
          这里只有两道示例题，用来验证答题体验。正式的电影人格测试正在开发中。
        </p>

        <div className="mt-10">
          <QuizDemo />
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 text-base font-medium text-cream transition hover:border-accent/60 hover:bg-white/5 active:scale-[0.98] sm:w-auto"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            返回首页
          </Link>
          <Link
            href="/discover"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/20 px-6 text-base font-medium text-cream transition hover:border-accent/60 hover:bg-white/5 active:scale-[0.98] sm:w-auto"
          >
            去试试电影偏好选择
          </Link>
        </div>
      </div>
    </section>
  );
}