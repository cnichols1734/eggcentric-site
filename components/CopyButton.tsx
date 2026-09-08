"use client";

import { useState } from "react";

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1600);
        } catch {
          // Clipboard unavailable; the text is still selectable.
        }
      }}
      className="rounded-md border-2 border-ink bg-panel-soft px-2 py-0.5 text-xs font-extrabold uppercase tracking-wide text-cream-dim transition hover:bg-gold hover:text-ink focus-visible:outline focus-visible:outline-3 focus-visible:outline-gold"
      aria-live="polite"
    >
      {done ? "Copied" : label}
    </button>
  );
}
