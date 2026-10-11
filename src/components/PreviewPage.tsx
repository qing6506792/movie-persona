import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

type PreviewPageProps = {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  plannedTitle: string;
  planned: string[];
  otherHref: string;
  otherLabel: string;
};

const glowStyle = {
  backgroundImage:
    "radial-gradient(60% 50% at 80% 10%, rgba(168,139,250,0.20), transparent 70%), radial-gradient(40% 40% at 5% 95%, rgba(168,139,250,0.08), transparent 70%)",
};

export default function PreviewPage({
  icon,
  eyebrow,
  title,
  description,
  plannedTitle,
  planned,
  otherHref,
  otherLabel,
}: PreviewPageProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10" style={glowStyle} />

      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
            {icon}
          </span>
          <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-accent">
            开发中 · 尚未上线
          </span>
        </div>

        <p className="mt-8 text-sm font-medium tracking-widest text-accent">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-cream sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
          {description}
        </p>

        <div className="mt-10 rounded-2xl border border-dashed border-white/15 bg-surface/60 p-6">
          <h2 className="text-sm font-semibold text-cream">{plannedTitle}</h2>
          <ul className="mt-4 space-y-3">
            {planned.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-relaxed text-mist"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/70"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-mist/80">
            以上为规划内容，当前版本尚未实现，这里没有任何可以体验的功能。
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-base font-semibold text-ink transition hover:bg-accent/90 hover:shadow-[0_0_32px_rgba(168,139,250,0.45)] active:scale-[0.98] sm:w-auto"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            返回首页
          </Link>
          <Link
            href={otherHref}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/20 px-6 text-base font-medium text-cream transition hover:border-accent/60 hover:bg-white/5 active:scale-[0.98] sm:w-auto"
          >
            {otherLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}