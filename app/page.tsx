import { Arenas } from "@/components/Arenas";
import { Changelog } from "@/components/Changelog";
import { Downloads } from "@/components/Downloads";
import { Eggs } from "@/components/Eggs";
import { Footer } from "@/components/Footer";
import { Game } from "@/components/Game";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Showcase } from "@/components/Showcase";
import { SteamDeck } from "@/components/SteamDeck";
import { getLatestRelease } from "@/lib/releases";

// Keep in sync with REVALIDATE_SECONDS in lib/releases.ts (Next requires a literal here).
export const revalidate = 300;

export default async function Page() {
  const release = await getLatestRelease();

  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero release={release} />
        <Game />
        <Eggs />
        <Arenas />
        <Showcase />
        <Downloads release={release} />
        <SteamDeck />
        <Changelog release={release} />
      </main>
      <Footer />
    </>
  );
}
