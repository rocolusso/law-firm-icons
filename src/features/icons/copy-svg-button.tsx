"use client";

import { useState } from "react";

type State = "idle" | "done" | "error";

export function CopySvgButton({ src }: { src: string }) {
  const [state, setState] = useState<State>("idle");

  async function copy() {
    try {
      const response = await fetch(src);
      if (!response.ok) throw new Error(String(response.status));
      await navigator.clipboard.writeText(await response.text());
      setState("done");
    } catch {
      setState("error");
    }
    setTimeout(() => setState("idle"), 1800);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className="border-line text-ink-soft hover:border-gold hover:text-ink inline-flex min-h-11 w-full items-center justify-center rounded-xl border bg-white px-3 text-sm font-medium transition-colors active:scale-[0.98]"
    >
      {state === "done" ? "Скопійовано" : state === "error" ? "Не вдалося" : "Копіювати код"}
    </button>
  );
}
