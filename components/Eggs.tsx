import Image from "next/image";
import { EGGS } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

export function Eggs() {
  return (
    <section id="eggs" className="relative stripes py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker="Characters"
          title="12 playable eggs"
          body="Each egg has different starting stats and a rule that changes how the run plays out. The Chef gets shop discounts, the Vampire heals by dealing damage, and the Robo-Egg builds turrets that do the shooting for it. You start with the plain Egg and unlock the rest by playing. Your egg's perks and starting gear come with it into Survival and Adventure."
        />

        <ul className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {EGGS.map((egg, i) => (
            <li
              key={egg.id}
              className={`ink-card group relative flex flex-col items-center px-4 pb-5 pt-6 text-center transition hover:-translate-y-1 ${i % 3 === 0 ? "tilt-3" : i % 3 === 1 ? "tilt-2" : "tilt-1"}`}
            >
              <div className="relative mb-3 h-24 w-24">
                <Image
                  src={`/r/art/eggs/${egg.id}.png`}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-contain drop-shadow-[0_5px_0_#191c18] transition group-hover:scale-110 group-hover:-rotate-3"
                />
              </div>
              <h3 className="display-sm text-cream text-lg">{egg.name}</h3>
              <p className="mt-1.5 text-sm font-semibold leading-snug text-cream-dim">{egg.blurb}</p>
            </li>
          ))}
        </ul>

        <figure className="ink-frame mx-auto mt-14 max-w-4xl">
          <Image
            src="/r/shots/eggs.jpg"
            alt="The Choose Your Egg screen showing all twelve eggs unlocked"
            width={1600}
            height={1004}
            sizes="(max-width: 1024px) 100vw, 896px"
            className="block h-auto w-full"
          />
        </figure>
      </div>
    </section>
  );
}
