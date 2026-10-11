import type { ReactNode } from "react";
import { ClipboardList, Compass, Ticket } from "lucide-react";

type Feature = {
  icon: ReactNode;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: <ClipboardList aria-hidden="true" className="size-5" />,
    title: "趣味电影人格测试",
    description:
      "用一分钟回答几个轻松的问题，看看你在人生这部电影里更像哪一类角色。",
  },
  {
    icon: <Compass aria-hidden="true" className="size-5" />,
    title: "个性化电影推荐",
    description:
      "根据你的电影人格与观影偏好，找到与你同频的电影，而不是一份千篇一律的榜单。",
  },
  {
    icon: <Ticket aria-hidden="true" className="size-5" />,
    title: "专属电影人格名片",
    description:
      "把你的电影人格做成一张好看的名片，方便保存，也方便发给朋友。",
  },
];

export default function FeatureSection() {
  return (
    <section
      aria-labelledby="features-title"
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <p className="text-sm font-medium tracking-widest text-accent">功能预览</p>
      <h2
        id="features-title"
        className="mt-3 font-display text-2xl font-bold tracking-tight text-cream sm:text-4xl"
      >
        把看电影，变成了解自己的方式
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-mist">
        以下是规划中的三项功能，目前仍在开发，本页仅作介绍。
      </p>

      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {features.map((feature) => (
          <li
            key={feature.title}
            className="flex flex-col rounded-2xl border border-white/10 bg-surface/60 p-6 transition-colors hover:border-accent/40"
          >
            <div className="flex items-start justify-between">
              <span className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                {feature.icon}
              </span>
              <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs text-accent">
                开发中
              </span>
            </div>
            <h3 className="mt-5 text-lg font-semibold text-cream">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-mist">
              {feature.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}