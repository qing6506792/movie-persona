"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { personaQuiz } from "@/data/quizQuestions";
import { personas } from "@/data/personas";
import { scoreAnswers } from "@/lib/scoring";
import ResultPanel from "./ResultPanel";

// 所有状态只保存在 React 内存里：不使用 localStorage、Cookie、数据库或任何网络请求。
export default function QuizRunner() {
  const questions = personaQuiz.questions;
  const total = questions.length;

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [finished, setFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);

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

  function editAnswers() {
    setFinished(false);
    setIndex(total - 1);
    setShowHint(false);
  }

  function restart() {
    setAnswers({});
    setIndex(0);
    setFinished(false);
    setShowHint(false);
  }

  if (finished) {
    const { winner } = scoreAnswers(personaQuiz, answers);
    if (winner) {
      return (
        <ResultPanel
          persona={personas[winner]}
          onRestart={restart}
          onEdit={editAnswers}
        />
      );
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-surface/60 p-5 sm:p-8">
      <div className="flex items-center justify-between text-sm">
        <span className="text-mist">
          第 <span className="font-semibold text-cream">{shownStep}</span> / {total} 题
        </span>
        <span className="text-xs text-mist/80">约 1 分钟</span>
      </div>

      <div
        role="progressbar"
        aria-label="答题进度"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={shownStep}
        className="mt-3 flex gap-1.5"
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
                      isSelected ? "border-accent bg-accent text-ink" : "border-white/25"
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
          {isLast ? "查看我的剧本" : "下一题"}
          <ArrowRight aria-hidden="true" className="size-4" />
        </button>
      </div>
    </div>
  );
}