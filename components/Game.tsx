import Image from "next/image";
import { LOOP, NUMBERS } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

export function Game() {
  return (
    <section id="game" className="relative stripes-dark py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker="About the game"
          title="How it plays"
          body="Your weapons aim and fire automatically, so your job is to keep moving, dodge, and pick up the gold enemies drop. Between waves you spend that gold in the shop on new weapons, items and upgrades. Survive all 20 waves and beat the final boss to win the run."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <figure className="ink-frame tilt-1 relative">
            <Image
              src="/shots/swarm.jpg"
              alt="Wave 13 in The Quarry with a dense swarm of aliens closing in on the egg"
              width={2000}
              height={1255}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="block h-auto w-full"
            />
            <figcaption className="absolute bottom-3 left-3 rounded-lg border-[3px] border-ink bg-panel-deep/90 px-3 py-1 text-sm font-bold text-cream-dim shadow-ink-sm">
              Wave 13, The Quarry
            </figcaption>
          </figure>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {LOOP.map((step, i) => (
              <li key={step.n} className={`ink-card flex gap-4 p-4 ${i % 2 ? "tilt-2" : "tilt-3"}`}>
                <div className="ink-inset flex h-16 w-16 shrink-0 items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={step.art} alt="" className="max-h-11 max-w-11 object-contain drop-shadow-[0_3px_0_#191c18]" />
                </div>
                <div>
                  <h3 className="display-sm text-cream text-xl">
                    <span className="text-gold mr-2">{step.n}.</span>
                    {step.title}
                  </h3>
                  <p className="mt-1 text-[15px] font-semibold leading-snug text-cream-dim">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {NUMBERS.map((n, i) => (
            <li key={n.label} className={`ink-card-deep flex flex-col items-center px-3 py-5 text-center ${i % 3 === 0 ? "tilt-3" : i % 3 === 1 ? "tilt-2" : "tilt-1"}`}>
              <div className="mb-3 flex h-14 items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={n.art} alt="" className="max-h-14 max-w-16 object-contain drop-shadow-[0_4px_0_#191c18] animate-bob" style={{ animationDelay: `${i * 0.35}s` }} />
              </div>
              <div className="display text-gold text-4xl">{n.value}</div>
              <div className="mt-1 text-sm font-extrabold uppercase tracking-wide text-cream-dim">{n.label}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
