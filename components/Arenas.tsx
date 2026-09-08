import Image from "next/image";
import { ARENAS } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

export function Arenas() {
  return (
    <section id="arenas" className="relative stripes-dark py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker="Arenas"
          title="Five floors, five problems"
          body="Every arena has its own floor and its own hazard. Grease slows you, hay blocks shots, fans shove, conveyors carry. The Quarry is open from the start. The others unlock as you win on higher Danger."
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-2">
          {ARENAS.map((arena, i) => (
            <li
              key={arena.id}
              className={`ink-frame group relative ${i === 0 ? "md:col-span-2" : ""} ${i % 2 ? "tilt-2" : "tilt-3"}`}
            >
              <Image
                src={`/shots/arena-${arena.id}.jpg`}
                alt={`${arena.name}: ${arena.desc}`}
                width={2000}
                height={1255}
                sizes={i === 0 ? "(max-width: 1024px) 100vw, 1152px" : "(max-width: 768px) 100vw, 560px"}
                className="block h-auto w-full transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-deep/90 via-ink-deep/50 to-transparent p-4 pt-14 sm:p-5 sm:pt-16">
                <div className="flex flex-wrap items-end justify-between gap-2">
                  <div>
                    <h3 className="display text-2xl sm:text-3xl" style={{ color: arena.color }}>{arena.name}</h3>
                    <p className="mt-1 text-sm font-bold text-cream sm:text-base">{arena.desc}</p>
                  </div>
                  <span className="rounded-lg border-[3px] border-ink bg-panel-deep px-2.5 py-1 text-xs font-extrabold uppercase tracking-wide text-cream-dim shadow-ink-sm">
                    {arena.unlock}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
