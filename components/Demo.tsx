"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { DEMO_DOWNLOAD_MB, DEMO_SRC } from "@/lib/demo";
import { SectionHeading } from "./SectionHeading";

export function Demo() {
  const [open, setOpen] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);

  function start(e: React.MouseEvent<HTMLAnchorElement>) {
    // Phones get the demo as its own page so it can fill the screen sideways.
    if (window.matchMedia("(pointer: coarse)").matches) return;
    e.preventDefault();
    setOpen(true);
  }

  function fullscreen() {
    const el = frame.current;
    if (!el) return;
    el.requestFullscreen?.().catch(() => {});
    el.focus();
  }

  return (
    <section id="demo" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker="Playable online demo"
          title="Play 2D Survival in your browser"
          body="Play as the Egg in the Quarry with every weapon and item unlocked. The full game adds 3D Survival, Adventure, online co-op and all 12 eggs."
        />

        <div className="ink-frame mx-auto mt-14 max-w-5xl overflow-hidden">
          <div className="relative aspect-video w-full bg-bg-deep">
            {open ? (
              <iframe
                ref={frame}
                src={DEMO_SRC}
                title="Eggcentric web demo"
                allow="autoplay; fullscreen; gamepad"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : (
              <a
                href={DEMO_SRC}
                onClick={start}
                className="group absolute inset-0 block focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-gold"
                aria-label={`Play the web demo (${DEMO_DOWNLOAD_MB} MB download)`}
              >
                <Image
                  src="/r/shots/arena-quarry.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover opacity-70 transition group-hover:opacity-85"
                />
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-bg-deep/40 p-4 text-center">
                  <span className="btn btn-primary px-8 py-3 text-2xl leading-none">Play demo</span>
                  <span className="rounded-lg border-[3px] border-ink bg-panel-deep/90 px-3 py-1 text-sm font-bold text-cream-dim shadow-ink-sm">
                    {DEMO_DOWNLOAD_MB} MB download
                  </span>
                </span>
              </a>
            )}
          </div>
        </div>

        <div className="mx-auto mt-5 flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <p className="text-[15px] font-semibold leading-snug text-cream-dim">
            Computer: WASD or arrow keys to move, Space to dash, P to pause. Phone: turn it sideways, then use the on-screen stick and Dash button.
          </p>
          {open ? (
            <button type="button" onClick={fullscreen} className="btn btn-secondary px-4 py-2 text-base leading-none">
              Fullscreen
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
