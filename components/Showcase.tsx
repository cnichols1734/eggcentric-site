import Image from "next/image";
import { SectionHeading } from "./SectionHeading";

const SHOTS = [
  {
    src: "/shots/shop.jpg",
    alt: "The between-wave shop with four offers, a weapon rack and a stats panel",
    title: "The shop",
    body: "Buy weapons and passive items, reroll, or lock an offer for the next wave. The stats panel updates as you shop.",
  },
  {
    src: "/shots/fusion.jpg",
    alt: "Two tier-3 weapons fusing into a new weapon with sparks flying",
    title: "Fusion",
    body: "Two identical weapons fuse into a higher tier. Some pairs of different weapons have their own recipe.",
  },
  {
    src: "/shots/miniboss.jpg",
    alt: "The wave 7 mini-boss arena",
    title: "Mini-bosses",
    body: "Waves 7 and 14 bring a mini-boss. Wave 20 brings two at once.",
  },
  {
    src: "/shots/omelette.jpg",
    alt: "The Omelette boss charging at the egg on wave 14",
    title: "The Omelette",
    body: "Bosses telegraph their charge lanes and landing spots. Dodge the marker, then punish.",
  },
  {
    src: "/shots/levelup.jpg",
    alt: "The level-up screen offering a choice of stat upgrades",
    title: "Level up",
    body: "Materials are XP. Each level offers a pick of stat upgrades mid-wave.",
  },
  {
    src: "/shots/arena-station.jpg",
    alt: "A Horde Rush event on the Space Station with conveyor belts",
    title: "Mid-wave events",
    body: "Horde rushes, meteor showers and more land partway through a wave with a banner warning.",
  },
];

export function Showcase() {
  return (
    <section id="showcase" className="relative stripes py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading kicker="Screens" title="Between the waves" />

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
