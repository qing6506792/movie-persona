"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { demoQuiz } from "./demoQuiz";

export default function QuizDemo() {
  const questions = demoQuiz.questions;
  const total = questions.length;

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [finished, setFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (finished) doneRef.current?.focus();
  }, [finished]);

  const question = questions[index];
  const selected = answers[question.id];
  const isLast = index === total - 1;
  const shownStep = finished ? total : index + 1;

  function selectOption(optionId: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: optionId }));
    setShowHint(false);
  }

  function goNext() {
    if (!selected) {
      setShowHint(true);
      return;
    }
    if (isLast) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setShowHint(false);
  }

  function goPrev() {
    setIndex((i) => Math.max(0, i - 1));
    setShowHint(false);
  }

  function restart() {
    setAnswers({});
    setIndex(0);
    setFinished(false);
    setShowHint(false);
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-surface/60 p-5 sm:p-8">
      <div className="flex items-center justify-between text-sm">
        <span className="text-mist">
          第 <span className="font-semibold text-cream">{shownStep}</span> / {total} 题
        </span>
        <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs text-accent">
          交互演示
        </span>
      </div>

      <div
        role="progressbar"
        aria-label="答题进度"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={shownStep}
        className="mt-3 flex gap-2"
      >
        {questions.map((q, i) => (
          <span
            key={q.id}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < shownStep ? "bg-accent" : "bg-white/10"
            }`}
          />
        ))}
      </div>

      {finished ? (
        <div className="mt-8">
          <span className="flex size-12 items-center justify-center rounded-full bg-accent/15 text-accent">
            <Check aria-hidden="true" className="size-6" />
          </span>
          <h2
            ref={doneRef}
            tabIndex={-1}
            className="mt-5 font-display text-2xl font-bold leading-snug text-cream outline-none"
          >
            交互演示完成，正式电影人格测试正在开发中。
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-mist">
            刚才的选择没有被计分，也不会被保存或上传，这只是一次答题手感的体验。
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={restart}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-base font-semibold text-ink transition hover:bg-accent/90 hover:shadow-[0_0_32px_rgba(168,139,250,0.45)] active:scale-[0.98] sm:w-auto"
            >
              <RotateCcw aria-hidden="true" className="size-4" />
              重新体验
            </button>
            <Link
              href="/"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/20 px-6 text-base font-medium text-cream transition hover:border-accent/60 hover:bg-white/5 active:scale-[0.98] sm:w-auto"
            >
              返回首页
            </Link>
          </div>
        </div>
      ) : (
        <>
          <fieldset key={question.id} className="mt-8 min-w-0">
            <legend className="font-display text-xl font-bold leading-snug text-cream sm:text-2xl">
              {question.text}
            </legend>

            <div className="mt-6 space-y-3">
              {question.options.map((option) => {
                const isSelected = selected === option.id;
                return (
                  <label key={option.id} className="block cursor-pointer">
                    <input
                      type="radio"
                      name={question.id}
                      value={option.id}
                      checked={isSelected}
                      onChange={() => selectOption(option.id)}
                      className="peer sr-only"
                    />
                    <span
                      className={`flex min-h-14 items-center gap-3 rounded-xl border px-4 py-3 text-base leading-snug transition peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent ${
                        isSelected
                          ? "border-accent bg-accent/15 text-cream shadow-[0_0_24px_rgba(168,139,250,0.18)]"
                          : "border-white/10 bg-ink/40 text-mist hover:border-accent/40 hover:text-cream"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`flex size-6 shrink-0 items-center justify-center rounded-full border ${
                          isSelected
                            ? "border-accent bg-accent text-ink"
                            : "border-white/25"
                        }`}
                      >
                        {isSelected ? <Check className="size-3.5" /> : null}
                      </span>
                      <span>{option.text}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {showHint ? (
            <p
              role="alert"
              className="mt-5 rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 text-sm text-cream"
            >
              请先选择一个选项，再继续。
            </p>
          ) : null}

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goPrev}
              disabled={index === 0}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-5 text-base text-cream transition hover:border-accent/60 hover:bg-white/5 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/20 disabled:hover:bg-transparent"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              上一题
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-disabled={!selected}
              className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-base font-semibold text-ink transition hover:bg-accent/90 active:scale-[0.98] ${
                selected ? "hover:shadow-[0_0_32px_rgba(168,139,250,0.45)]" : "opacity-60"
              }`}
            >
              {isLast ? "完成" : "下一题"}
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}