import Image from "next/image";
import { MODES } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

export function Modes() {
  return (
    <section id="modes" className="relative stripes py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker="Game modes"
          title="Survival and Adventure"
          body="Every run starts in the Hatchery. Pick an egg, then choose Survival or Adventure. 2D and 3D Survival share one collection, so your unlocks, Pantry upgrades and Egg Cartons carry across both styles."
        />

        <figure className="ink-frame tilt-2 mx-auto mt-14 max-w-4xl">
          <Image
            src="/shots/menu.jpg"
            alt="The Hatchery home screen with Survival and Adventure, a 2D or 3D play style toggle, and Co-op"
            width={1600}
            height={1000}
            sizes="(max-width: 1024px) 100vw, 896px"
            className="block h-auto w-full"
          />
        </figure>

        <ul className="mt-14 grid gap-8 lg:grid-cols-2">
          {MODES.map((mode, i) => (
            <li key={mode.id} className={`ink-card overflow-hidden ${i % 2 ? "tilt-1" : "tilt-3"}`}>
              <figure className="ink-frame relative m-3 mb-0 rounded-[12px] border-[3px]" style={{ boxShadow: "none" }}>
                <Image
                  src={mode.shot}
                  alt={mode.shotAlt}
                  width={1600}
                  height={1004}
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="block h-auto w-full"
                />
                <figcaption className="absolute bottom-3 left-3 rounded-lg border-[3px] border-ink bg-panel-deep/90 px-3 py-1 text-sm font-bold text-cream-dim shadow-ink-sm">
                  {mode.caption}
                </figcaption>
              </figure>
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="display text-gold text-3xl">{mode.name}</h3>
                  <span className="rounded-lg border-[3px] border-ink bg-panel-deep px-2.5 py-1 text-xs font-extrabold uppercase tracking-wide text-cream-dim shadow-ink-sm">
                    {mode.style}
                  </span>
                </div>
                <p className="mt-1 text-sm font-extrabold uppercase tracking-wide text-cream-dim">{mode.summary}</p>
                <ul className="mt-4 space-y-2">
                  {mode.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[15px] font-semibold leading-snug text-cream-dim">
                      <span aria-hidden className="mt-1.5 inline-block h-2.5 w-2.5 shrink-0 rounded-full border-2 border-ink bg-gold" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="ink-card-deep tilt-2 p-5">
            <h3 className="display-sm text-cream text-xl">Online co-op</h3>
            <p className="mt-1.5 text-[15px] font-semibold leading-snug text-cream-dim">
              Play 2D Survival with up to four players in a private room. Everyone needs the same game version.
            </p>
          </div>
          <div className="ink-card-deep tilt-3 p-5">
            <h3 className="display-sm text-cream text-xl">Extras</h3>
            <p className="mt-1.5 text-[15px] font-semibold leading-snug text-cream-dim">
              The Extras tab has a standalone Dungeon Run preview with its own progress.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
