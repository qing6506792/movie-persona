import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ClipboardList } from "lucide-react";
import QuizRunner from "@/components/quiz/QuizRunner";

export const metadata: Metadata = {
  title: "你的人生拿了哪种电影剧本？",
  description:
    "7 个离谱镜头，测出你的片场人设。仅供娱乐的电影人格趣味测试，回答不会被保存或上传。",
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
            电影人格测试 · 7 题
          </span>
        </div>

        <h1 className="mt-8 font-display text-3xl font-bold leading-tight tracking-tight text-cream sm:text-5xl">
          你的人生拿了哪种电影剧本？
        </h1>
        <p className="mt-4 text-base leading-relaxed text-mist sm:text-lg">
          7 个离谱镜头，测出你的片场人设。
        </p>
        <p className="mt-3 text-sm leading-relaxed text-mist/80">
          测试仅供娱乐，不代表专业心理评估。你的回答只留在当前页面，不会被保存或上传，刷新后会重置。
        </p>

        <div className="mt-10">
          <QuizRunner />
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 text-base font-medium text-cream transition hover:border-accent/60 hover:bg-white/5 active:scale-[0.98] sm:w-auto"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            返回首页
          </Link>
        </div>
      </div>
    </section>
  );
}