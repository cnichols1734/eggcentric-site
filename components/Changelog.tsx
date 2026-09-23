import { RELEASE_HIGHLIGHTS } from "@/lib/content";
import { formatDate, RELEASES_URL, type ReleaseInfo } from "@/lib/releases";
import { SectionHeading } from "./SectionHeading";

/** First "# Eggcentric x.y.z — Headline" line of the release notes, minus the version prefix. */
function headlineFrom(body: string): string | null {
  const line = body.split("\n").find((l) => l.startsWith("# "));
  if (!line) return null;
  const text = line.replace(/^#\s+/, "").replace(/^Eggcentric\s+v?[\d.]+\s*[—–-]\s*/, "").trim();
  return text || null;
}

export function Changelog({ release }: { release: ReleaseInfo }) {
  const curated = RELEASE_HIGHLIGHTS[release.version];
  const headline = curated?.headline ?? headlineFrom(release.body);

  return (
    <section id="changelog" className="relative stripes-dark py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHeading kicker="Changelog" title={`What's new in ${release.version}`} />

        <article className="ink-card tilt-3 mt-12 p-6 sm:p-8">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b-[3px] border-ink pb-4">
            <div>
              <h3 className="display-sm text-cream text-2xl">{headline ?? release.name}</h3>
              <p className="mt-1 text-sm font-bold text-cream-dim">
                Version {release.version} · Released {formatDate(release.publishedAt)}
              </p>
            </div>
            <a
              href={release.htmlUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border-[3px] border-ink bg-panel-deep px-3 py-1.5 text-sm font-extrabold text-gold shadow-ink-sm transition hover:bg-panel-soft"
            >
              Full notes on GitHub
            </a>
          </header>

          {curated ? (
            <ul className="mt-5 space-y-2.5">
              {curated.items.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] font-semibold leading-snug text-cream-dim">
                  <span aria-hidden className="mt-1.5 inline-block h-2.5 w-2.5 shrink-0 rounded-full border-2 border-ink bg-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-[15px] font-semibold text-cream-dim">The full release notes are on GitHub.</p>
          )}
        </article>

        <p className="mt-8 text-center text-sm font-bold text-cream-dim">
          Every release, with notes and checksums, is on the{" "}
          <a href={RELEASES_URL} target="_blank" rel="noreferrer" className="text-gold underline decoration-2 underline-offset-2 hover:text-cream">
            full releases page
          </a>
          .
        </p>
      </div>
    </section>
  );
}
