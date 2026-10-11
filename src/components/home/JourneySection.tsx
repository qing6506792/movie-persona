type Step = {
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    title: "回答测试 / 选择电影",
    description: "用几个轻松的小问题，或挑几部你喜欢的电影，告诉我们你的观影口味。",
  },
  {
    title: "获得电影人格",
    description: "得到属于你的电影人格，看看你在人生这部电影里更像哪一类角色。",
  },
  {
    title: "发现推荐电影",
    description: "根据你的电影人格与偏好，为你找到与你同频的电影。",
  },
  {
    title: "分享与收藏",
    description: "把人格名片分享给朋友，也可以收藏喜欢的电影，慢慢攒成自己的片单。",
  },
];

export default function JourneySection() {
  return (
    <section
      aria-labelledby="journey-title"
      className="border-t border-white/10 bg-surface/30"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="text-sm font-medium tracking-widest text-accent">体验流程</p>
        <h2
          id="journey-title"
          className="mt-3 font-display text-2xl font-bold tracking-tight text-cream sm:text-4xl"
        >
          四步，从观影口味到专属片单
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-mist">
          这是规划中的使用流程，各环节仍在开发，目前尚不能体验。
        </p>

        <ol className="mt-12 grid gap-0 md:grid-cols-4 md:gap-6">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative pb-8 pl-14 before:absolute before:bottom-1 before:left-5 before:top-11 before:w-px before:bg-white/15 last:pb-0 last:before:hidden md:pb-0 md:pl-0 md:before:bottom-auto md:before:left-14 md:before:right-[-1rem] md:before:top-5 md:before:h-px md:before:w-auto"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 z-10 flex size-10 items-center justify-center rounded-full border border-accent/40 bg-ink text-sm font-semibold text-accent md:relative"
              >
                {index + 1}
              </span>
              <h3 className="text-base font-semibold text-cream md:mt-5">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}