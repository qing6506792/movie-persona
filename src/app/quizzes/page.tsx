import type { Metadata } from "next";
import { ClipboardList } from "lucide-react";
import PreviewPage from "@/components/PreviewPage";

export const metadata: Metadata = {
  title: "电影人格测试（即将开拍）",
  description: "用一分钟发现你的电影人格。该功能仍在开发中，本页为预告。",
};

export default function QuizzesPage() {
  return (
    <PreviewPage
      icon={<ClipboardList aria-hidden="true" className="size-5" />}
      eyebrow="电影人格测试"
      title="你的电影人格，正在筹备中"
      description="我们正在设计一个一分钟就能完成的趣味测试，帮你看看自己在人生这部电影里更像哪一类角色。目前测试尚未上线，这里还没有题目，也不会生成任何结果。"
      plannedTitle="规划中的内容"
      planned={[
        "一组轻松有趣、一分钟能答完的小问题",
        "属于你的电影人格结果",
        "可以保存和分享的电影人格名片",
      ]}
      otherHref="/discover"
      otherLabel="看看电影推荐预告"
    />
  );
}