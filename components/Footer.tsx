import Image from "next/image";
import { RELEASES_URL } from "@/lib/releases";

export function Footer() {
  return (
    <footer className="relative border-t-4 border-ink bg-bg-deep py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-4">
          <Image src="/r/art/ui/nichmann-games-dark.png" alt="Nichmann Games" width={720} height={532} className="h-auto w-24" />
          <div>
            <p className="display-sm text-cream text-lg">Eggcentric</p>
            <p className="text-sm font-bold text-cream-dim">Made by Nichmann Games with Godot 4.</p>
          </div>
        </div>
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-bold text-cream-dim">
          <li><a href="#download" className="hover:text-gold">Download</a></li>
          <li><a href="#steam-deck" className="hover:text-gold">Steam Deck</a></li>
          <li><a href={RELEASES_URL} target="_blank" rel="noreferrer" className="hover:text-gold">Releases on GitHub</a></li>
        </ul>
      </div>
      <p className="mt-8 text-center text-xs font-semibold text-border-dim">
        &copy; {new Date().getFullYear()} Nichmann Games
      </p>
    </footer>
  );
}
