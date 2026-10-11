"use client";

import { useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  RotateCcw,
  Search,
  X,
} from "lucide-react";
import PosterCard from "@/components/movie/PosterCard";
import type { PosterTheme } from "@/components/movie/PosterCard";
import { catalogMovies, MOVIE_GENRES } from "@/data/movies";
import type { MovieGenre } from "@/data/movies";
import type { CatalogMovie, SeedMovieIds } from "@/types/movie";

// 至少选满多少部才能继续。
const MIN_SEEDS = 5;

type Step = "select" | "confirm" | "done";
type GenreFilter = "全部" | MovieGenre;

// 原创占位封面的配色，按电影的第一个类型决定。不是官方海报。
const genreThemes: Record<string, PosterTheme> = {
  科幻: { from: "#12233f", via: "#2c4a8f", to: "#0b0d14", accent: "#8fb4ff", motif: "sun" },
  动画: { from: "#12323a", via: "#1f5f66", to: "#0b0d14", accent: "#7fe0d4", motif: "horizon" },
  剧情: { from: "#2a1f4d", via: "#4b3a8f", to: "#0b0d14", accent: "#a88bfa", motif: "window" },
  悬疑: { from: "#2b2f36", via: "#4a5568", to: "#0b0d14", accent: "#c7cdd8", motif: "stripes" },
  喜剧: { from: "#4a3216", via: "#8f6a2a", to: "#0b0d14", accent: "#f2c879", motif: "sun" },
  爱情: { from: "#4a1f33", via: "#8f3a5c", to: "#0b0d14", accent: "#f0a6bf", motif: "horizon" },
  冒险: { from: "#143a2a", via: "#2a7a55", to: "#0b0d14", accent: "#8be0a8", motif: "horizon" },
  奇幻: { from: "#35204a", via: "#6a3a8f", to: "#0b0d14", accent: "#d9a6f0", motif: "stripes" },
  犯罪: { from: "#3a1616", via: "#7a2a2a", to: "#0b0d14", accent: "#f08a8a", motif: "window" },
};

const fallbackTheme: PosterTheme = genreThemes["剧情"];

function themeFor(movie: CatalogMovie): PosterTheme {
  return genreThemes[movie.genres[0]] ?? fallbackTheme;
}

const primaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-base font-semibold text-ink transition hover:bg-accent/90 hover:shadow-[0_0_32px_rgba(168,139,250,0.45)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:active:scale-100";

const outlineButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-5 text-base font-medium text-cream transition hover:border-accent/60 hover:bg-white/5 active:scale-[0.98]";

function SelectableMovie({
  movie,
  selected,
  onToggle,
}: {
  movie: CatalogMovie;
  selected: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <li>
      <div className="relative rounded-2xl">
        <PosterCard
          movie={{ title: movie.title, year: movie.year }}
          tagline={movie.genres.join(" · ")}
          theme={themeFor(movie)}
          badge="原创占位封面"
          className={
            selected ? "ring-2 ring-accent ring-offset-2 ring-offset-ink" : ""
          }
        />
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute right-3 top-3 flex size-6 items-center justify-center rounded-full border ${
            selected
              ? "border-accent bg-accent text-ink"
              : "border-white/40 bg-black/30"
          }`}
        >
          {selected ? <Check className="size-3.5" /> : null}
        </span>
        <button
          type="button"
          aria-pressed={selected}
          aria-label={`${movie.title}（${movie.year}）`}
          onClick={() => onToggle(movie.id)}
          className="absolute inset-0 rounded-2xl transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        />
      </div>
      <p className="mt-2 text-xs leading-relaxed text-mist">
        {movie.description}
      </p>
    </li>
  );
}

export default function MovieSelector() {
  const [step, setStep] = useState<Step>("select");
  // Cold-start Seed Set：用户主动选择的静态偏好电影 id 集合。
  // 它不是观影历史、点击日志或评分序列，也不是 SASRec 的训练样本，
  // 不要给它附加时间戳，也不要把 Set 的插入顺序当成观看顺序。
  const [seedMovieIds, setSeedMovieIds] = useState<SeedMovieIds>(
    () => new Set<string>(),
  );
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState<GenreFilter>("全部");
  const headingRef = useRef<HTMLHeadingElement>(null);

  const count = seedMovieIds.size;
  const canContinue = count >= MIN_SEEDS;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalogMovies.filter(
      (m) =>
        (genre === "全部" || m.genres.includes(genre)) &&
        (q === "" || m.title.toLowerCase().includes(q)),
    );
  }, [query, genre]);

  // 确认视图按片库顺序展示，不按点击顺序。
  const selectedMovies = useMemo(
    () => catalogMovies.filter((m) => seedMovieIds.has(m.id)),
    [seedMovieIds],
  );

  function toggleMovie(id: string) {
    setSeedMovieIds((prev) => {
      const next = new Set(prev); // 必须新建 Set，不能原地修改状态
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function clearSelection() {
    setSeedMovieIds(new Set<string>());
  }

  function goTo(next: Step) {
    setStep(next);
    // 等新视图渲染后，把焦点移到它的标题，方便键盘和读屏用户。
    setTimeout(() => headingRef.current?.focus(), 0);
  }

  function resetFilters() {
    setQuery("");
    setGenre("全部");
  }

  const headingClass =
    "mt-3 font-display text-2xl font-bold leading-snug tracking-tight text-cream outline-none sm:text-3xl";

  if (step === "done") {
    return (
      <section
        aria-labelledby="selector-title"
        className="mx-auto w-full max-w-3xl px-4 pb-20 sm:px-6 lg:px-8"
      >
        <div className="rounded-2xl border border-white/10 bg-surface/60 p-6 sm:p-8">
          <span className="flex size-12 items-center justify-center rounded-full bg-accent/15 text-accent">
            <Check aria-hidden="true" className="size-6" />
          </span>
          <h2
            id="selector-title"
            ref={headingRef}
            tabIndex={-1}
            className={headingClass}
          >
            你的电影偏好已在当前页面确认。个性化推荐功能正在开发中。
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-mist">
            这里没有生成任何推荐结果。你选择的 {count} 部电影只存在于当前页面的内存里，刷新页面就会重置，不会被保存或上传。
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => goTo("select")}
              className={`${primaryButton} w-full sm:w-auto`}
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              继续修改选择
            </button>
            <button
              type="button"
              onClick={() => {
                clearSelection();
                resetFilters();
                goTo("select");
              }}
              className={`${outlineButton} w-full sm:w-auto`}
            >
              <RotateCcw aria-hidden="true" className="size-4" />
              清空并重新开始
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (step === "confirm") {
    return (
      <section
        aria-labelledby="selector-title"
        className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8"
      >
        <p className="text-sm font-medium tracking-widest text-accent">
          确认选择
        </p>
        <h2
          id="selector-title"
          ref={headingRef}
          tabIndex={-1}
          className={headingClass}
        >
          确认你的电影偏好
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mist">
          你一共选择了 <span className="font-semibold text-cream">{count}</span>{" "}
          部电影。确认之前，可以随时返回修改。确认只在当前页面生效，不会保存，也不会生成推荐。
        </p>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {selectedMovies.map((movie) => (
            <li key={movie.id}>
              <PosterCard
                movie={{ title: movie.title, year: movie.year }}
                tagline={movie.genres.join(" · ")}
                theme={themeFor(movie)}
                badge="原创占位封面"
              />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => goTo("select")}
            className={`${outlineButton} w-full sm:w-auto`}
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            返回修改
          </button>
          <button
            type="button"
            onClick={() => goTo("done")}
            className={`${primaryButton} w-full sm:w-auto`}
          >
            确认偏好
            <Check aria-hidden="true" className="size-4" />
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="selector-title"
      className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6 lg:px-8"
    >
      <p className="text-sm font-medium tracking-widest text-accent">
        选择你喜欢的电影
      </p>
      <h2
        id="selector-title"
        ref={headingRef}
        tabIndex={-1}
        className={headingClass}
      >
        从 {catalogMovies.length} 部电影里，挑至少 {MIN_SEEDS} 部
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mist">
        点击封面选择，再点一次取消。你的选择只保存在当前页面的内存里，刷新页面会重置，不会被保存或上传。封面均为原创的占位设计，并非官方海报。
      </p>

      <div className="mt-8 space-y-4">
        <div className="relative">
          <label htmlFor="movie-search" className="sr-only">
            按片名搜索
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-mist"
          />
          <input
            id="movie-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="按片名搜索，例如：千与千寻"
            autoComplete="off"
            className="min-h-12 w-full rounded-full border border-white/15 bg-surface/60 pl-11 pr-12 text-base text-cream placeholder:text-mist/70 focus:border-accent/60"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="清空搜索"
              className="absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-mist transition-colors hover:bg-white/10 hover:text-cream"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          ) : null}
        </div>

        <div role="group" aria-label="按类型筛选" className="flex flex-wrap gap-2">
          {(["全部", ...MOVIE_GENRES] as GenreFilter[]).map((g) => {
            const active = genre === g;
            return (
              <button
                key={g}
                type="button"
                aria-pressed={active}
                onClick={() => setGenre(g)}
                className={`min-h-10 rounded-full border px-4 text-sm transition-colors ${
                  active
                    ? "border-accent bg-accent/15 text-cream"
                    : "border-white/15 text-mist hover:border-accent/40 hover:text-cream"
                }`}
              >
                {g}
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="text-xs text-mist">
          当前显示 {filtered.length} / {catalogMovies.length} 部
        </p>
      </div>

      {filtered.length > 0 ? (
        <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4">
          {filtered.map((movie) => (
            <SelectableMovie
              key={movie.id}
              movie={movie}
              selected={seedMovieIds.has(movie.id)}
              onToggle={toggleMovie}
            />
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-white/15 bg-surface/40 p-8 text-center">
          <p className="text-base text-cream">没有找到符合条件的电影</p>
          <p className="mt-2 text-sm text-mist">
            换个关键词，或者清除筛选条件试试。你已选择的电影不会丢失。
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className={`${outlineButton} mt-5`}
          >
            清除搜索和筛选
          </button>
        </div>
      )}

      <div className="sticky bottom-0 z-40 -mx-4 mt-10 border-t border-white/10 bg-ink/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div aria-live="polite" className="text-sm">
            <p className="text-cream">
              已选择 <span className="font-semibold text-accent">{count}</span>{" "}
              部
            </p>
            <p className="text-xs text-mist">
              {canContinue
                ? "已达到最少数量，可以继续，也可以再多选几部。"
                : `至少选 ${MIN_SEEDS} 部才能继续，还差 ${MIN_SEEDS - count} 部。`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {count > 0 ? (
              <button
                type="button"
                onClick={clearSelection}
                className="min-h-12 rounded-full px-4 text-sm text-mist transition-colors hover:text-cream"
              >
                清空选择
              </button>
            ) : null}
            <button
              type="button"
              disabled={!canContinue}
              onClick={() => goTo("confirm")}
              className={`${primaryButton} flex-1 sm:flex-none`}
            >
              查看并确认
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}