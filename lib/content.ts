// Copy in this file is pulled from the game itself (character_db.gd, arena_db.gd,
// the Hatchery menu, RELEASE_NOTES.md) so the site says exactly what the game says.

export const TAGLINE = "Auto-blast the alien horde";

export const EGGS = [
  { id: "chicken", name: "Egg", blurb: "Balanced shell. No gimmicks - just blast." },
  { id: "tank", name: "Hard-Boiled", blurb: "Dense shell. Slow, stubborn, and hits like a brick." },
  { id: "ninja", name: "Ninja Egg", blurb: "Slippery. Dodges everything, blocks nothing." },
  { id: "runner", name: "Sunny Side Sprint", blurb: "Never stops moving. Thin shell, fast hands." },
  { id: "brawler", name: "Dino Egg", blurb: "Big claws, no guns. Gets in your face." },
  { id: "pyro", name: "Dragon Egg", blurb: "Everything it touches catches fire. Including itself, a little." },
  { id: "engineer", name: "Robo-Egg", blurb: "Builds things that shoot for it. Terrible aim itself." },
  { id: "chef", name: "Chef Egg", blurb: "Knows a guy. Every shop is a discount shop." },
  { id: "gambler", name: "Scrambled", blurb: "Nobody knows what it'll be next wave. Not even it." },
  { id: "vampire", name: "Vampire Egg", blurb: "Heals by hurting. Honey does nothing for it." },
  { id: "glass", name: "Faberge", blurb: "Priceless and fragile. Shatters everything before it shatters." },
  { id: "golden", name: "Golden Egg", blurb: "Rolls in it. Too heavy with coin to hit hard." },
] as const;

export const ARENAS = [
  { id: "quarry", name: "The Quarry", desc: "Cracked rock, no surprises.", unlock: "Available from the start", color: "#c9c9cf" },
  { id: "diner", name: "Diner Floor", desc: "Grease slicks slow everyone who steps in them.", unlock: "Win a run", color: "#ffb35c" },
  { id: "farm", name: "Farmyard", desc: "Hay bales block shots and bodies. Use them as cover - or don't.", unlock: "Win on Danger 1", color: "#9fdc5a" },
  { id: "rooftop", name: "Rooftop", desc: "Fans turn independently. Yellow arrows warn where the next gust will blow.", unlock: "Win on Danger 2", color: "#8fd3ff" },
  { id: "station", name: "Space Station", desc: "Belts reverse independently. Yellow arrows warn which way they will carry you.", unlock: "Win on Danger 3", color: "#d59bff" },
] as const;

export const MODES = [
  {
    id: "survival",
    name: "Survival",
    style: "2D or 3D",
    summary: "20 waves · Shops · Endless",
    shot: "/shots/survival-3d.jpg",
    shotAlt: "3D Survival on the Farmland with a crowd of aliens around the egg",
    caption: "3D Survival, Farmland",
    points: [
      "Survive 20 timed waves and spend your gold in the shop between them.",
      "Boss fights on waves 7, 14 and 20.",
      "Keep going in Endless mode after a win.",
      "Play it in 2D or 3D. All five arenas are in both.",
    ],
  },
  {
    id: "adventure",
    name: "Adventure",
    style: "3D",
    summary: "Explore · Evolve · Escape",
    shot: "/shots/adventure.jpg",
    shotAlt: "Adventure mode in the Rocklands with a ring of aliens around the egg",
    caption: "Adventure, Rocklands",
    points: [
      "One continuous 12-minute expedition through the Rocklands.",
      "Start with your egg's gear. Each level up, pick one of three upgrades, with 3 free rerolls per run.",
      "Optional objectives earn elemental coatings and weapon augments.",
      "Defeat the final guardian, then survive the extraction horde.",
    ],
  },
] as const;

export const LOOP = [
  {
    n: 1,
    title: "Survive the wave",
    body: "Each wave runs on a timer. Your weapons fire on their own while you move and dodge. Later waves last longer and spawn more enemies.",
    art: "/art/enemies/alien-purple.png",
  },
  {
    n: 2,
    title: "Collect gold",
    body: "Enemies drop gold when they die. Gold is both your money and your XP, and it gets pulled toward you when you are close.",
    art: "/art/pickups/gold3.png",
  },
  {
    n: 3,
    title: "Level up",
    body: "Each level up gives you a choice of stat upgrades. The gold you have collected is still yours to spend in the shop.",
    art: "/art/pickups/chest-open.png",
  },
  {
    n: 4,
    title: "Shop between waves",
    body: "Buy weapons (up to six at a time) and passive items, reroll the offers, or lock one to buy later. Two of the same weapon combine into a higher tier.",
    art: "/art/weapons/shotgun.png",
  },
] as const;

export const NUMBERS = [
  { value: "12", label: "playable eggs", art: "/art/eggs/ninja.png" },
  { value: "45", label: "weapons", art: "/art/weapons/rocket-launcher.png" },
  { value: "14", label: "Legendary fusions", art: "/art/weapons/flamethrower.png" },
  { value: "68", label: "passive items", art: "/art/items/hot-sauce.png" },
  { value: "5", label: "arenas", art: "/art/pickups/vending-machine.png" },
  { value: "86", label: "achievements", art: "/art/enemies/omelette.png" },
] as const;

// Player-facing highlights per release. The GitHub notes are cumulative and include
// developer detail, so the site only shows these. Add an entry for each new version.
export const RELEASE_HIGHLIGHTS: Record<string, { headline: string; items: readonly string[] }> = {
  "3.5.0": {
    headline: "One Hatchery, two ways to survive",
    items: [
      "New Hatchery home screen. Pick your egg, then choose Survival or Adventure.",
      "Survival can be played in 2D or 3D. Unlocks, Pantry upgrades, Egg Cartons, achievements and records carry across both.",
      "Adventure is a 12-minute 3D expedition through the Rocklands with objectives, a final guardian and an extraction horde.",
      "All 12 eggs have been redrawn.",
      "Fusion works correctly in 3D Survival.",
      "Dungeon Run is now a standalone preview in Extras. Daily Run has been removed.",
    ],
  },
};

export const STEAM_DECK_STEPS = [
  {
    title: "Switch to Desktop Mode",
    body: "Hold the Power button and choose Switch to Desktop, or open the Steam menu, then Power, then Switch to Desktop.",
  },
  {
    title: "Download the Linux build",
    body: "Open a browser in Desktop Mode and download Eggcentric-Linux.zip. Save it somewhere permanent, like a folder in Home.",
  },
  {
    title: "Extract the zip",
    body: "Right-click the zip and choose Extract Here. The folder contains Eggcentric.x86_64 and a .pck file. Keep them together.",
  },
  {
    title: "Mark it executable if needed",
    body: "Right-click Eggcentric.x86_64, open Properties, then Permissions, and check Is executable. On most Decks this is already set.",
  },
  {
    title: "Add it to Steam",
    body: "In Steam, choose Games, then Add a Non-Steam Game to My Library. Click Browse, change the file type filter to All Files, pick Eggcentric.x86_64, and click Add Selected Programs.",
  },
  {
    title: "Return to Gaming Mode",
    body: "Double-click Return to Gaming Mode on the desktop. Eggcentric will be in your Library under Non-Steam Games.",
  },
] as const;

export const STEAM_DECK_NOTES = [
  "The interface is designed for a 16:10 screen and a controller.",
  "Controller support uses the default Gamepad layout.",
  "The game can update itself. Open Settings in the Hatchery and choose Check for Updates.",
  "Keep the game in a folder you have write access to so the updater can replace files.",
] as const;
