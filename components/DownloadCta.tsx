"use client";

import { useSyncExternalStore } from "react";
import { latestDownloadUrl, PLATFORMS, type PlatformId } from "@/lib/releases";

let cached: PlatformId | null = null;
function detectPlatform(): PlatformId {
  if (cached) return cached;
  const ua = navigator.userAgent;
  const platform = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform ?? navigator.platform ?? "";
  const hay = `${ua} ${platform}`;
  if (/Mac|iPhone|iPad/i.test(hay)) cached = "macos";
  else if (/Linux|X11|SteamOS|CrOS/i.test(hay) && !/Android/i.test(hay)) cached = "linux";
  else cached = "windows";
  return cached;
}

const noop = () => () => {};

interface Props {
  sizes: Partial<Record<PlatformId, string>>;
}

export function DownloadCta({ sizes }: Props) {
  // Server renders Windows; the client swaps in the detected OS on hydration.
  const platform = useSyncExternalStore(noop, detectPlatform, () => "windows" as PlatformId);

  const current = PLATFORMS.find((p) => p.id === platform)!;
  const others = PLATFORMS.filter((p) => p.id !== current.id);

  return (
    <div className="flex flex-col items-center gap-3">
      <a
        href={latestDownloadUrl(current.asset)}
        className="btn btn-primary animate-pulse-gold inline-flex items-center gap-3 px-8 py-4 text-2xl sm:text-3xl leading-none"
        data-platform={current.id}
      >
        <DownloadIcon />
        <span>
          Download for {current.label}
          {sizes[current.id] ? <span className="ml-2 text-base opacity-80 align-middle">{sizes[current.id]}</span> : null}
        </span>
      </a>
      <p className="text-sm font-bold text-cream-dim">
        Also for{" "}
        {others.map((p, i) => (
          <span key={p.id}>
            <a href={latestDownloadUrl(p.asset)} className="text-gold underline decoration-2 underline-offset-2 hover:text-cream">
              {p.label}
            </a>
            {i < others.length - 1 ? " and " : "."}
          </span>
        ))}{" "}
        Free. No account.
      </p>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0 drop-shadow-[0_2px_0_#191c18]">
      <path d="M12 3v11m0 0 4.5-4.5M12 14 7.5 9.5" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 17v1.5A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5V17" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}
