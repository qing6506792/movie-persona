import type { Metadata } from "next";
import { Compass } from "lucide-react";
import PreviewPage from "@/components/PreviewPage";

export const metadata: Metadata = {
  title: "发现专属电影（即将开拍）",
  description: "找到与你灵魂同频的电影。该功能仍在开发中，本页为预告。",
};

export default function DiscoverPage() {
  return (
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
  );
}