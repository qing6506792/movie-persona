"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Check,
  Copy,
  Eye,
  Moon,
  PartyPopper,
  Pencil,
  RotateCcw,
  Undo2,
} from "lucide-react";
import { buildShareText } from "@/data/personas";
import type { Persona } from "@/data/personas";
import { getSiteUrl } from "@/config/site";
import type { PersonaId } from "@/types/quiz";
import SavePersonaCard from "./SavePersonaCard";


const icons: Record<PersonaId, LucideIcon> = {
  wanderer: Moon,
  prophet: Eye,
  savior: PartyPopper,
  rewriter: Pencil,
};

// 每种人格一套纯 SVG 装饰图案，不使用任何外部图片。
function Decor({ id, accent }: { id: PersonaId; accent: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      className="pointer-events-none absolute -right-10 -top-10 -z-10 size-64 opacity-30 sm:size-80"
    >
      {id === "wanderer" && (
        <>
          <circle cx="100" cy="100" r="30" fill={accent} />
          <circle cx="100" cy="100" r="55" fill="none" stroke={accent} strokeOpacity="0.6" />
          <circle cx="100" cy="100" r="80" fill="none" stroke={accent} strokeOpacity="0.35" />
        </>
      )}
      {id === "prophet" &&
        [40, 80, 120, 160].map((v) => (
          <path
            key={v}
            d={`M${v} 20 V180 M20 ${v} H180`}
            stroke={accent}
            strokeOpacity="0.55"
            strokeWidth="1.5"
          />
        ))}
      {id === "savior" &&
        [
          [40, 50, 8],
          [150, 40, 12],
          [100, 90, 6],
          [60, 140, 10],
          [160, 130, 7],
          [120, 175, 9],
        ].map(([cx, cy, r]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={accent} />
        ))}
      {id === "rewriter" && (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M${20 + i * 40} 190 L${80 + i * 40} 10`}
              stroke={accent}
              strokeOpacity={0.25 + i * 0.1}
              strokeWidth="5"
            />
          ))}
          <rect
            x="50"
            y="60"
            width="100"
            height="80"
            fill="none"
            stroke={accent}
            strokeDasharray="14 10"
            strokeWidth="2"
          />
        </>
      )}
    </svg>
  );
}

type ResultPanelProps = {
  persona: Persona;
  onRestart: () => void;
  onEdit: () => void;
};

type CopyStatus = "idle" | "ok" | "fail";

export default function ResultPanel({ persona, onRestart, onEdit }: ResultPanelProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [status, setStatus] = useState<CopyStatus>("idle");

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const Icon = icons[persona.id];
  const t = persona.theme;
  // 只有 site.ts 里明确配置了 https 网址才附链接，否则不附任何链接。
  const shareText = buildShareText(persona, getSiteUrl());

  async function handleCopy() {
    try {
      if (!navigator.clipboard) throw new Error("clipboard unavailable");
      await navigator.clipboard.writeText(shareText);
      setStatus("ok");
    } catch {
      setStatus("fail");
    }
  }

  return (
    <div>
      <article
        aria-labelledby="result-title"
        className="relative isolate overflow-hidden rounded-3xl border border-white/10 p-6 shadow-2xl shadow-black/40 sm:p-10"
        style={{
          backgroundImage: `linear-gradient(160deg, ${t.from}, ${t.via} 55%, ${t.to})`,
        }}
      >
        <Decor id={persona.id} accent={t.accent} />

        <p className="text-xs tracking-[0.3em]" style={{ color: t.accent }}>
          你的片场人设 · TYPE {persona.code}
        </p>

        <span
          className="mt-5 flex size-12 items-center justify-center rounded-full border"
          style={{ borderColor: t.accent, color: t.accent }}
        >
          <Icon aria-hidden="true" className="size-6" />
        </span>

        <h2
          id="result-title"
          ref={headingRef}
          tabIndex={-1}
          className="mt-4 font-display text-4xl font-bold leading-tight text-cream outline-none sm:text-5xl"
        >
          {persona.title}
        </h2>

        <p className="mt-4 text-lg font-medium leading-snug text-cream sm:text-xl">
          {persona.tagline}
        </p>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/80">
          {persona.description}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {persona.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border px-3 py-1 text-sm text-cream"
              style={{ borderColor: t.accent }}
            >
              {tag}
            </li>
          ))}
        </ul>
      </article>

      <p className="mt-3 text-center text-xs text-mist/80">
        本测试仅供娱乐，不代表专业心理评估。
      </p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-surface/60 p-5">
        <h3 className="text-sm font-semibold text-cream">分享文案</h3>
        <textarea
          readOnly
          value={shareText}
          rows={4}
          aria-label="分享文案"
          onFocus={(e) => e.currentTarget.select()}
          className="mt-3 w-full resize-none rounded-xl border border-white/10 bg-ink/50 p-3 text-sm leading-relaxed text-cream"
        />

        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-base font-semibold text-ink transition hover:bg-accent/90 hover:shadow-[0_0_32px_rgba(168,139,250,0.45)] active:scale-[0.98] sm:w-auto"
          >
            {status === "ok" ? (
              <Check aria-hidden="true" className="size-4" />
            ) : (
              <Copy aria-hidden="true" className="size-4" />
            )}
            {status === "ok" ? "已复制" : "一键复制分享文案"}
          </button>

          <p role="status" className="text-sm text-mist">
            {status === "ok" ? "已复制" : null}
            {status === "fail"
              ? "自动复制没有成功，请点上面的文字框，全选后手动复制。"
              : null}
          </p>
        </div>
      </div>
      
      <SavePersonaCard persona={persona} />
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 text-base font-medium text-cream transition hover:border-accent/60 hover:bg-white/5 active:scale-[0.98] sm:w-auto"
        >
          <RotateCcw aria-hidden="true" className="size-4" />
          重新测试
        </button>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 text-base font-medium text-cream transition hover:border-accent/60 hover:bg-white/5 active:scale-[0.98] sm:w-auto"
        >
          <Undo2 aria-hidden="true" className="size-4" />
          返回修改答案
        </button>
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-white/15 p-5">
        <Link
          href="/discover"
          className="inline-flex min-h-12 items-center gap-2 rounded-full text-base font-medium text-accent underline-offset-4 hover:underline"
        >
          去挑选你喜欢的电影
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
        <p className="mt-2 text-sm leading-relaxed text-mist">
          这是独立的电影偏好选择体验：人格结果不会带到那里，也不会用于电影推荐。
        </p>
      </div>
    </div>
  );
}