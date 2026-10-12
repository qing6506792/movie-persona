"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, Image as ImageIcon, Loader } from "lucide-react";
import type { Persona } from "@/data/personas";
import { personaCardFileName, renderPersonaCardBlob } from "@/lib/personaCard";

type Status = "idle" | "loading" | "error";

// 图片在本机浏览器里用 Canvas 绘制，不会上传到任何地方。
export default function SavePersonaCard({ persona }: { persona: Persona }) {
  const [status, setStatus] = useState<Status>("idle");
  const [url, setUrl] = useState<string | null>(null);
  const urlRef = useRef<string | null>(null);
  const mountedRef = useRef(false);
  const busyRef = useRef(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // 替换或清除 Object URL 时，总是先释放旧的。
  const replaceUrl = useCallback((next: string | null) => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = next;
    setUrl(next);
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (urlRef.current) {
        URL.revokeObjectURL(urlRef.current);
        urlRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (url && dialog && !dialog.open) dialog.showModal();
  }, [url]);

  async function handleGenerate() {
    if (busyRef.current) return;
    busyRef.current = true;
    setStatus("loading");
    try {
      const blob = await renderPersonaCardBlob(persona);
      if (!mountedRef.current) return;
      replaceUrl(URL.createObjectURL(blob));
      setStatus("idle");
    } catch {
      if (mountedRef.current) setStatus("error");
    } finally {
      busyRef.current = false;
    }
  }

  function requestClose() {
    if (dialogRef.current) {
      dialogRef.current.close();
    } else {
      replaceUrl(null);
    }
  }

  const loading = status === "loading";

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-surface/60 p-5">
      <h3 className="text-sm font-semibold text-cream">人格卡片图片</h3>
      <p className="mt-2 text-sm leading-relaxed text-mist">
        生成一张电影票根风格的 PNG 图片。图片在你的设备上本地绘制，不会上传。
      </p>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          aria-busy={loading}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 text-base font-medium text-cream transition hover:border-accent/60 hover:bg-white/5 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {loading ? (
            <Loader aria-hidden="true" className="size-4 animate-spin" />
          ) : (
            <ImageIcon aria-hidden="true" className="size-4" />
          )}
          {loading ? "正在生成…" : "生成图片"}
        </button>

        {status === "error" ? (
          <p role="alert" className="text-sm text-cream">
            图片生成失败，请重试
          </p>
        ) : null}
      </div>

      {url ? (
        <dialog
          ref={dialogRef}
          aria-labelledby="persona-card-title"
          onClose={() => replaceUrl(null)}
          onClick={(e) => {
            if (e.target === e.currentTarget) requestClose();
          }}
          className="m-auto max-h-[92dvh] w-[calc(100%-1.5rem)] max-w-md overflow-y-auto overscroll-contain rounded-2xl border border-white/15 bg-surface p-0 text-cream shadow-2xl backdrop:bg-black/75"
        >
          <div className="p-4 sm:p-5">
            <h2 id="persona-card-title" className="text-base font-semibold text-cream">
              你的电影人格卡片
            </h2>

            {/* 预览的是实际导出的 PNG（Object URL），无法使用 next/image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              width={1080}
              height={1440}
              alt={`${persona.title}电影人格卡片：${persona.tagline}`}
              className="mt-4 h-auto w-full rounded-xl"
            />

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a
                href={url}
                download={personaCardFileName(persona)}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-base font-semibold text-ink transition hover:bg-accent/90 hover:shadow-[0_0_32px_rgba(168,139,250,0.45)] active:scale-[0.98] sm:w-auto"
              >
                <Download aria-hidden="true" className="size-4" />
                下载 PNG
              </a>
              <button
                type="button"
                onClick={requestClose}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/20 px-6 text-base font-medium text-cream transition hover:border-accent/60 hover:bg-white/5 active:scale-[0.98] sm:w-auto"
              >
                关闭
              </button>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-mist">
              如无法下载，可长按图片保存；电脑上也可以右键图片另存为。
            </p>
          </div>
        </dialog>
      ) : null}
    </div>
  );
}