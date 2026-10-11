import type { Metadata } from "next";
import { Compass } from "lucide-react";
import PreviewPage from "@/components/PreviewPage";
import PosterCard from "@/components/movie/PosterCard";
import type { PosterTheme } from "@/components/movie/PosterCard";
import type { Movie } from "@/types/movie";

export const metadata: Metadata = {
  title: "发现专属电影（即将开拍）",
  description: "找到与你灵魂同频的电影。该功能仍在开发中，本页为预告。",
};

type PosterDemoItem = {
  movie: Movie;
  tagline: string;
  theme: PosterTheme;
};

// 以下电影与文案均为虚构的设计演示，并非真实电影作品，也不是推荐结果。
const demoPosters: PosterDemoItem[] = [
  {
    movie: { id: "demo-lighthouse", title: "海边的第七盏灯" },
    tagline: "有些答案，只在退潮之后出现。",
    theme: {
      from: "#2a1f4d",
      via: "#4b3a8f",
      to: "#0b0d14",
      accent: "#a88bfa",
      motif: "sun",
    },
  },
  {
    movie: { id: "demo-radio", title: "深夜广播站" },
    tagline: "沉默的频率里，藏着另一座城。",
    theme: {
      from: "#4a1f33",
      via: "#8f3a5c",
      to: "#0b0d14",
      accent: "#f0a6bf",
      motif: "horizon",
    },
  },
  {
    movie: { id: "demo-rain", title: "雨季小剧场" },
    tagline: "每个人都在等一场刚好的雨。",
    theme: {
      from: "#12323a",
      via: "#1f5f66",
      to: "#0b0d14",
      accent: "#7fe0d4",
      motif: "window",
    },
  },
  {
    movie: { id: "demo-holiday", title: "没有出口的假期" },
    tagline: "最长的假期，从未真正开始。",
    theme: {
      from: "#4a3216",
      via: "#8f6a2a",
      to: "#0b0d14",
      accent: "#f2c879",
      motif: "stripes",
    },
  },
];

export default function DiscoverPage() {
  return (
    <>
      <PreviewPage
        icon={<Compass aria-hidden="true" className="size-5" />}
        eyebrow="个性化电影推荐"
        title="与你同频的电影，还在路上"
        description="我们希望根据你的电影人格和观影偏好，为你推荐真正合拍的电影，而不是一份千篇一律的榜单。目前推荐功能尚未上线，这里没有任何推荐结果，也没有电影数据。"
        plannedTitle="规划中的内容"
        planned={[
          "从你的电影人格出发，反向寻找合拍的电影",
          "从你喜欢的电影出发，发现相近口味的作品",
          "收藏喜欢的电影，并反馈推荐是否合你心意",
        ]}
        otherHref="/quizzes"
        otherLabel="看看电影人格测试预告"
      />

      <section
        aria-labelledby="poster-demo-title"
        className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8"
      >
        <p className="text-sm font-medium tracking-widest text-accent">
          封面设计演示
        </p>
        <h2
          id="poster-demo-title"
          className="mt-3 font-display text-2xl font-bold tracking-tight text-cream sm:text-3xl"
        >
          原创封面，先来一次预览
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mist">
          下面四张封面是我们自己设计的演示：电影均为虚构，文案均为原创，并非真实电影作品，也不是推荐结果。
        </p>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
          {demoPosters.map((item) => (
            <li key={item.movie.id}>
              <PosterCard
                movie={item.movie}
                tagline={item.tagline}
                theme={item.theme}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}