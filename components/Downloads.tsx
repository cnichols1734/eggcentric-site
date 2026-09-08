import { assetFor, formatBytes, formatDate, latestDownloadUrl, PLATFORMS, RELEASES_URL, type PlatformId, type ReleaseInfo } from "@/lib/releases";
import { CopyButton } from "./CopyButton";
import { FILE_TOKENS, Mono } from "./Mono";
import { SectionHeading } from "./SectionHeading";

const ICONS: Record<PlatformId, React.ReactNode> = {
  windows: (
    <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden>
      <path d="M3 5.5 10.5 4.4v7.2H3V5.5Zm0 13L10.5 19.6v-7.1H3v6Zm8.4 1.2L21 21v-8.5h-9.6v7.2Zm0-15.4v7.3H21V3L11.4 4.3Z" />
    </svg>
  ),
  macos: (
    <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden>
      <path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.8 3-.8s1.8.8 3 .7c1.3 0 2-1.1 2.8-2.3.9-1.3 1.2-2.6 1.3-2.6-.1 0-2.5-1-2.5-3.7ZM14.2 5.8c.6-.8 1.1-1.9.9-3-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1.1.1 2.1-.5 2.8-1.3Z" />
    </svg>
  ),
  linux: (
    <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden>
      <path d="M12 2c-2.4 0-3.7 1.9-3.7 4.4 0 .9.1 1.7.1 2.3-.6.9-1.7 2.5-2.4 4.3-.5 1.3-.7 2.7-.4 3.9-.6.4-1.2 1-1.2 1.6 0 .9 1.1 1.2 2.1 1.5.5.2 1.1.6 1.8 1 .8.5 1.6.9 2.4.6.6-.2.9-.7 1-1.1h.6c.1.4.4.9 1 1.1.8.3 1.6-.1 2.4-.6.7-.4 1.3-.8 1.8-1 1-.3 2.1-.6 2.1-1.5 0-.6-.6-1.2-1.2-1.6.3-1.2.1-2.6-.4-3.9-.7-1.8-1.8-3.4-2.4-4.3 0-.6.1-1.4.1-2.3C15.7 3.9 14.4 2 12 2Zm-1.3 4.3c.4 0 .7.5.7 1.1s-.3 1.1-.7 1.1-.7-.5-.7-1.1.3-1.1.7-1.1Zm2.6 0c.4 0 .7.5.7 1.1s-.3 1.1-.7 1.1-.7-.5-.7-1.1.3-1.1.7-1.1ZM12 8.6c.8 0 1.6.4 1.6.9s-.8 1.3-1.6 1.3-1.6-.8-1.6-1.3.8-.9 1.6-.9Zm-2.2 2.9c.5 1 1.3 1.6 2.2 1.6s1.7-.6 2.2-1.6c.7.9 1.5 2.2 2 3.5.5 1.2.6 2.3.3 3.1-.6.1-1.2.4-1.7.7-.7.4-1.3.7-1.8.6-.2 0-.3-.2-.4-.6h-1.2c-.1.4-.2.6-.4.6-.5.1-1.1-.2-1.8-.6-.5-.3-1.1-.6-1.7-.7-.3-.8-.2-1.9.3-3.1.5-1.3 1.3-2.6 2-3.5Z" />
    </svg>
  ),
};

export function Downloads({ release }: { release: ReleaseInfo }) {
  return (
    <section id="download" className="relative stripes-dark py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker={`Version ${release.version} · ${formatDate(release.publishedAt)}`}
          title="Download"
          body="Eggcentric is free. There is no installer and no account. Download the zip for your system, unzip it, and run the game. The builds are not code-signed yet, so Windows and macOS will show a warning the first time you open it. The steps under each download explain how to get past it."
        />

        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLATFORMS.map((p, i) => {
            const asset = assetFor(release, p);
            const sum = release.checksums[p.asset];
            return (
              <li key={p.id} className={`ink-card flex flex-col p-5 ${i === 1 ? "tilt-2" : i === 0 ? "tilt-3" : "tilt-1"}`}>
                <div className="flex items-center gap-3">
                  <div className="ink-inset flex h-14 w-14 shrink-0 items-center justify-center text-gold">{ICONS[p.id]}</div>
                  <div>
                    <h3 className="display-sm text-cream text-2xl">{p.label}</h3>
                    <p className="text-sm font-bold text-cream-dim">{p.requirements}</p>
                  </div>
                </div>

                <a
                  href={latestDownloadUrl(p.asset)}
                  className="btn btn-primary mt-5 flex items-center justify-between px-5 py-3 text-xl leading-none"
                  data-platform={p.id}
                >
                  <span>Download</span>
                  <span className="text-sm opacity-85">{asset ? formatBytes(asset.size) : "zip"}</span>
                </a>

                <ol className="mt-5 space-y-2.5">
                  {p.steps.map((step, n) => (
                    <li key={n} className="flex gap-2.5 text-sm font-semibold leading-snug text-cream-dim">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-gold text-[11px] font-extrabold text-ink">
                        {n + 1}
                      </span>
                      <span>
                        <Mono text={step} tokens={FILE_TOKENS} />
                      </span>
                    </li>
                  ))}
                </ol>

                {sum ? (
                  <div className="mt-auto pt-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-cream-dim">SHA-256</span>
                      <CopyButton text={sum} />
                    </div>
                    <code className="mt-1.5 block select-all break-all rounded-md border-2 border-ink bg-panel-deep px-2 py-1.5 font-mono text-[11px] leading-relaxed text-cream-dim">
                      {sum}
                    </code>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-center text-sm font-bold text-cream-dim">
          All builds and older versions are on the{" "}
          <a href={RELEASES_URL} target="_blank" rel="noreferrer" className="text-gold underline decoration-2 underline-offset-2 hover:text-cream">
            GitHub releases page
          </a>
          . The game can also update itself from the Options menu on the title screen.
          {release.stale ? " Version info shown is the last known release." : ""}
        </p>
      </div>
    </section>
  );
}
