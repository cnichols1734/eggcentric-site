import Image from "next/image";
import { RELEASES_URL } from "@/lib/releases";

const LINKS = [
  { href: "#modes", label: "Modes" },
  { href: "#demo", label: "Demo" },
  { href: "#game", label: "Survival" },
  { href: "#arenas", label: "Arenas" },
  { href: "#download", label: "Download" },
  { href: "#steam-deck", label: "Steam Deck" },
  { href: "#changelog", label: "Changelog" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <div className="mx-auto max-w-6xl px-4 pt-3">
        <nav
          aria-label="Site"
          className="pointer-events-auto flex items-center justify-between gap-4 rounded-2xl border-[3px] border-ink bg-panel/85 px-3 py-2 backdrop-blur-md shadow-ink-sm"
        >
          <a href="#top" className="flex items-center gap-2 pl-1" aria-label="Eggcentric home">
            <Image src="/r/art/ui/icon.png" alt="" width={34} height={34} className="rounded-lg border-2 border-ink" preload />
            <span className="display-sm text-gold text-lg leading-none pt-0.5 hidden sm:inline">Eggcentric</span>
          </a>
          <ul className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-lg px-3 py-1.5 text-sm font-bold text-cream-dim transition hover:bg-panel-soft hover:text-cream focus-visible:outline focus-visible:outline-4 focus-visible:outline-gold"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a
              href={RELEASES_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex rounded-lg px-3 py-1.5 text-sm font-bold text-cream-dim transition hover:bg-panel-soft hover:text-cream focus-visible:outline focus-visible:outline-4 focus-visible:outline-gold"
            >
              GitHub
            </a>
            <a href="#download" className="btn btn-primary px-4 py-2 text-base leading-none">
              Download
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
