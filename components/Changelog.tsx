import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatDate, RELEASES_URL, type ReleaseInfo } from "@/lib/releases";
import { SectionHeading } from "./SectionHeading";

export function Changelog({ release }: { release: ReleaseInfo }) {
  const body = release.body.trim();
  return (
    <section id="changelog" className="relative stripes-dark py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHeading kicker="Changelog" title={`What's new in ${release.version}`} />

        <article className="ink-card tilt-3 mt-12 p-6 sm:p-8">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b-[3px] border-ink pb-4">
            <div>
              <h3 className="display-sm text-cream text-2xl">{release.name}</h3>
              <p className="mt-1 text-sm font-bold text-cream-dim">Released {formatDate(release.publishedAt)}</p>
            </div>
            <a
              href={release.htmlUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border-[3px] border-ink bg-panel-deep px-3 py-1.5 text-sm font-extrabold text-gold shadow-ink-sm transition hover:bg-panel-soft"
            >
              View on GitHub
            </a>
          </header>

          <div className="prose-notes mt-5 text-[15px] leading-relaxed">
            {body ? (
              <Markdown remarkPlugins={[remarkGfm]}>{body}</Markdown>
            ) : (
              <p>Release notes for this version are on GitHub.</p>
            )}
          </div>
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
