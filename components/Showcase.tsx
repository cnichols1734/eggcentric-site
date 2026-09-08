import Image from "next/image";
import { SectionHeading } from "./SectionHeading";

const SHOTS = [
  {
    src: "/shots/shop.jpg",
    alt: "The between-wave shop with four offers, a weapon rack and a stats panel",
    title: "The shop",
    body: "Buy weapons and passive items, reroll the offers, or lock one to buy next wave. Your stats update as you shop.",
  },
  {
    src: "/shots/fusion.jpg",
    alt: "Two tier-3 weapons fusing into a new weapon with sparks flying",
    title: "Fusion",
    body: "Two of the same weapon combine into a higher tier. Some pairs of different weapons have their own fusion recipe.",
  },
  {
    src: "/shots/miniboss.jpg",
    alt: "The wave 7 mini-boss arena",
    title: "Mini-bosses",
    body: "A mini-boss shows up on waves 7 and 14. Wave 20 has two at once.",
  },
  {
    src: "/shots/omelette.jpg",
    alt: "The Omelette boss charging at the egg on wave 14",
    title: "The Omelette",
    body: "Bosses show where they are about to charge or land before they do it, so you have a moment to get out of the way.",
  },
  {
    src: "/shots/levelup.jpg",
    alt: "The level-up screen offering a choice of stat upgrades",
    title: "Level up",
    body: "Gold doubles as XP. When you level up, you choose a stat upgrade right there in the middle of the wave.",
  },
  {
    src: "/shots/arena-station.jpg",
    alt: "A Horde Rush event on the Space Station with conveyor belts",
    title: "Mid-wave events",
    body: "Horde rushes, meteor showers and other events can hit partway through a wave. A banner warns you before they start.",
  },
];

export function Showcase() {
  return (
    <section id="showcase" className="relative stripes py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading kicker="Screenshots" title="In the game" />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SHOTS.map((s, i) => (
            <li key={s.src} className={`ink-card overflow-hidden ${i % 3 === 0 ? "tilt-3" : i % 3 === 1 ? "tilt-2" : "tilt-1"}`}>
              <div className="ink-frame m-3 mb-0 rounded-[12px] border-[3px]" style={{ boxShadow: "none" }}>
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={2000}
                  height={1255}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="block h-auto w-full"
                />
              </div>
              <div className="p-4">
                <h3 className="display-sm text-gold text-xl">{s.title}</h3>
                <p className="mt-1.5 text-sm font-semibold leading-snug text-cream-dim">{s.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
