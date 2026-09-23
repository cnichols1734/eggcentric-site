import Image from "next/image";
import { STEAM_DECK_NOTES, STEAM_DECK_STEPS } from "@/lib/content";
import { latestDownloadUrl } from "@/lib/releases";
import { FILE_TOKENS, Mono } from "./Mono";
import { SectionHeading } from "./SectionHeading";

export function SteamDeck() {
  return (
    <section id="steam-deck" className="relative stripes py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker="Steam Deck"
          title="Runs great on Steam Deck"
          body="Eggcentric has a native Linux build, so it runs on Steam Deck without Proton. The interface is designed for the Deck's 16:10 screen and a controller. Here is how to add it to your Steam library."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="space-y-6">
            <figure className="ink-frame tilt-3">
              <Image
                src="/shots/menu.jpg"
                alt="The Eggcentric Hatchery home screen"
                width={1600}
                height={1000}
                sizes="(max-width: 1024px) 100vw, 520px"
                className="block h-auto w-full"
              />
            </figure>

            <a
              href={latestDownloadUrl("Eggcentric-Linux.zip")}
              className="btn btn-primary flex items-center justify-center gap-3 px-6 py-4 text-2xl leading-none"
              data-platform="linux"
            >
              Download the Linux build
            </a>

            <ul className="ink-card-deep tilt-2 space-y-2.5 p-5">
              {STEAM_DECK_NOTES.map((note) => (
                <li key={note} className="flex gap-2.5 text-sm font-semibold leading-snug text-cream-dim">
                  <span aria-hidden className="mt-1.5 inline-block h-2.5 w-2.5 shrink-0 rounded-full border-2 border-ink bg-good" />
                  {note}
                </li>
              ))}
            </ul>
          </div>

          <ol className="space-y-4">
            {STEAM_DECK_STEPS.map((step, i) => (
              <li key={step.title} className={`ink-card flex gap-4 p-5 ${i % 2 ? "tilt-2" : "tilt-3"}`}>
                <div className="display flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-[3px] border-ink bg-gold text-2xl text-cream shadow-ink-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="display-sm text-cream text-xl">{step.title}</h3>
                  <p className="mt-1.5 text-[15px] font-semibold leading-snug text-cream-dim">
                    <Mono text={step.body} tokens={FILE_TOKENS} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
