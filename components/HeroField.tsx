"use client";

import { useEffect, useRef } from "react";

/**
 * Sprites are anchored to the edges of the centered content column (not raw
 * viewport percentages) so they never sit on top of the copy or the CTA.
 *  - side "left"/"right": `x` is px outward from the column edge, `y` is % height
 *  - side "top"/"bottom": `x` is % width, `y` is px inward from that edge
 */
interface Sprite {
  src: string;
  side: "left" | "right" | "top" | "bottom";
  x: number;
  y: number;
  size: number;
  depth: number;
  rot?: number;
  anim?: "drift" | "bob" | "wiggle";
  delay?: number;
  flip?: boolean;
  hideMobile?: boolean;
}

/** Half-width of the hero copy column plus breathing room. */
const COLUMN_HALF = 400;

const SPRITES: Sprite[] = [
  // Top and bottom bands are free of content on every screen size.
  { src: "/r/art/enemies/alien-orange.png", side: "top", x: 58, y: 96, size: 42, depth: 0.22, rot: 10, anim: "drift", delay: 2.8 },
  { src: "/r/art/fx/spawn-x.png", side: "top", x: 30, y: 110, size: 32, depth: 0.2, rot: 12, anim: "wiggle", delay: 0.5 },
  { src: "/r/art/pickups/gold4.png", side: "top", x: 24, y: 150, size: 34, depth: 0.6, rot: 15, anim: "bob", delay: 1.9 },
  { src: "/r/art/pickups/gold2.png", side: "top", x: 72, y: 140, size: 26, depth: 0.62, rot: -12, anim: "bob", delay: 0.4 },
  { src: "/r/art/enemies/frog.png", side: "bottom", x: 36, y: 40, size: 62, depth: 0.5, rot: -3, anim: "bob", delay: 2.4 },
  { src: "/r/art/fx/spawn-x.png", side: "bottom", x: 66, y: 70, size: 30, depth: 0.2, rot: -6, anim: "wiggle", delay: 1.7 },
  { src: "/r/art/pickups/honey-health.png", side: "bottom", x: 54, y: 30, size: 32, depth: 0.58, rot: 8, anim: "bob", delay: 2.9, hideMobile: true },

  // Left flank, outside the column.
  { src: "/r/art/enemies/alien-purple.png", side: "left", x: 150, y: 20, size: 52, depth: 0.25, rot: -8, anim: "drift", delay: 0.3, hideMobile: true },
  { src: "/r/art/enemies/ufo.png", side: "left", x: 60, y: 38, size: 96, depth: 0.5, rot: -4, anim: "drift", delay: 0.6, hideMobile: true },
  { src: "/r/art/eggs/ninja.png", side: "left", x: 40, y: 60, size: 150, depth: 0.9, rot: -7, anim: "bob", delay: 0.8, hideMobile: true },
  { src: "/r/art/enemies/alien-green.png", side: "left", x: 200, y: 74, size: 44, depth: 0.28, rot: 4, anim: "drift", delay: 2.1, hideMobile: true },
  { src: "/r/art/enemies/miniboss.png", side: "left", x: 90, y: 88, size: 110, depth: 0.8, rot: 3, anim: "bob", delay: 1.2, hideMobile: true },

  // Right flank.
  { src: "/r/art/enemies/alien-blue.png", side: "right", x: 170, y: 16, size: 48, depth: 0.3, rot: 6, anim: "drift", delay: 1.4, flip: true, hideMobile: true },
  { src: "/r/art/eggs/pyro.png", side: "right", x: 30, y: 32, size: 140, depth: 0.95, rot: 8, anim: "bob", delay: 1.6, flip: true, hideMobile: true },
  { src: "/r/art/enemies/mushroom.png", side: "right", x: 80, y: 54, size: 74, depth: 0.55, rot: 6, anim: "bob", delay: 1.1, flip: true, hideMobile: true },
  { src: "/r/art/enemies/scorpion.png", side: "right", x: 190, y: 70, size: 72, depth: 0.48, rot: 5, anim: "drift", delay: 0.2, hideMobile: true },
  { src: "/r/art/enemies/alien-red.png", side: "right", x: 120, y: 80, size: 50, depth: 0.32, rot: -5, anim: "drift", delay: 0.9, hideMobile: true },
  { src: "/r/art/eggs/tank.png", side: "right", x: 50, y: 90, size: 120, depth: 0.85, rot: 4, anim: "wiggle", delay: 2.2, hideMobile: true },
];

function place(s: Sprite): React.CSSProperties {
  switch (s.side) {
    case "left":
      return { left: `calc(50% - ${COLUMN_HALF + s.x}px)`, top: `${s.y}%` };
    case "right":
      return { left: `calc(50% + ${COLUMN_HALF + s.x}px)`, top: `${s.y}%` };
    case "top":
      return { left: `${s.x}%`, top: s.y };
    case "bottom":
      return { left: `${s.x}%`, bottom: s.y };
  }
}

export function HeroField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty("--px", cx.toFixed(4));
      el.style.setProperty("--py", cy.toFixed(4));
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" style={{ "--px": 0, "--py": 0 } as React.CSSProperties}>
      {SPRITES.map((s, i) => (
        <div
          key={i}
          className={`absolute will-change-transform ${s.hideMobile ? "hidden md:block" : ""}`}
          style={{
            ...place(s),
            width: s.size,
            height: s.size,
            transform: `translate(-50%, -50%) translate(calc(var(--px) * ${s.depth * -34}px), calc(var(--py) * ${s.depth * -24}px))`,
            transition: "transform 80ms linear",
            opacity: 0.55 + s.depth * 0.45,
            filter: s.depth < 0.4 ? "blur(0.6px) saturate(0.85)" : undefined,
          }}
        >
          <div
            className={`h-full w-full ${s.anim === "bob" ? "animate-bob" : s.anim === "wiggle" ? "animate-wiggle" : "animate-drift"}`}
            style={{ "--rot": `${s.rot ?? 0}deg`, animationDelay: `${s.delay ?? 0}s`, animationDuration: `${6 + (i % 5) * 1.3}s` } as React.CSSProperties}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.src}
              alt=""
              draggable={false}
              className="h-full w-full object-contain drop-shadow-[0_6px_0_rgba(20,23,18,0.45)]"
              style={{ transform: s.flip ? "scaleX(-1)" : undefined }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
