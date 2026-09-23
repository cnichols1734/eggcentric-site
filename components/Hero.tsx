import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { TAGLINE } from "@/lib/content";
import { assetFor, formatBytes, formatDate, PLATFORMS, type PlatformId, type ReleaseInfo } from "@/lib/releases";
import { DownloadCta } from "./DownloadCta";
import { HeroField } from "./HeroField";

/** Drop a `hero.mp4` (and optional `hero.jpg` poster) into public/ to enable the video layer. */
function heroVideo(): { src: string; poster?: string } | null {
  const pub = path.join(process.cwd(), "public");
  if (!fs.existsSync(path.join(pub, "hero.mp4"))) return null;
  const poster = fs.existsSync(path.join(pub, "hero.jpg")) ? "/hero.jpg" : undefined;
  return { src: "/hero.mp4", poster };
}

export function Hero({ release }: { release: ReleaseInfo }) {
  const video = heroVideo();
  const sizes = Object.fromEntries(
    PLATFORMS.map((p) => [p.id, formatBytes(assetFor(release, p)?.size ?? 0)]),
  ) as Partial<Record<PlatformId, string>>;

  return (
    <section id="top" className="relative isolate overflow-hidden stripes vignette min-h-[100svh] flex items-center">
      {video ? (
        <video
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60"
          src={video.src}
          poster={video.poster}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        />
      ) : null}
      {video ? <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg/40 via-bg/60 to-bg" aria-hidden /> : null}

      <HeroField />

      <div className="relative mx-auto w-full max-w-5xl px-4 pb-20 pt-28 text-center sm:pt-32">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-panel-deep px-4 py-1.5 text-sm font-bold text-cream-dim shadow-ink-sm">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-good border-2 border-ink" aria-hidden />
          <span>
            Alpha <span className="text-gold">v{release.version}</span>
            <span className="hidden sm:inline"> · {formatDate(release.publishedAt)}</span>
          </span>
        </div>

        <h1 className="sr-only">Eggcentric</h1>
        <Image
          src="/art/ui/eggcentric-logo.png"
          alt=""
          width={1200}
          height={283}
          preload
          sizes="(max-width: 640px) 92vw, 820px"
          className="mx-auto w-[92vw] max-w-[820px] drop-shadow-[0_10px_0_rgba(20,23,18,0.5)] animate-wiggle"
          style={{ "--rot": "-1.2deg" } as React.CSSProperties}
        />

        <p className="display mt-5 text-gold text-[clamp(1.5rem,4.4vw,2.6rem)]">{TAGLINE}</p>

        <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold text-cream-dim sm:text-xl">
          Eggcentric is an arena shooter roguelite. Pick an egg and fight off aliens with weapons that aim and fire
          on their own. Play Survival in 2D or 3D, or take a 3D Adventure through the Rocklands.
        </p>

        <div className="mt-9">
          <DownloadCta sizes={sizes} />
        </div>

        <p className="mx-auto mt-6 max-w-xl text-base font-semibold text-cream-dim">
          Eggcentric is in alpha. Try it now for free. It is coming to Steam soon, and the Steam page will be
          posted here when it is ready.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-bold text-cream-dim">
          <span className="inline-flex items-center gap-2"><Dot color="var(--color-gold)" />Free alpha</span>
          <span className="inline-flex items-center gap-2"><Dot color="#66c0f4" />Coming to Steam</span>
          <span className="inline-flex items-center gap-2"><Dot color="var(--color-xp)" />Windows, Mac, Linux and Steam Deck</span>
          <span className="inline-flex items-center gap-2"><Dot color="var(--color-good)" />Keyboard and mouse or controller</span>
          <span className="inline-flex items-center gap-2"><Dot color="#ff8a5c" />Online co-op for up to 4</span>
        </div>
      </div>

      <a
        href="#game"
        aria-label="Scroll to learn more"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream-dim hover:text-gold transition animate-bob"
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}

function Dot({ color }: { color: string }) {
  return <span aria-hidden className="inline-block h-3 w-3 rounded-full border-2 border-ink" style={{ background: color }} />;
}
