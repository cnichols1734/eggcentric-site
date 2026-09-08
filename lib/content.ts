// Copy in this file is pulled from the game itself (character_db.gd, arena_db.gd,
// README.md) so the site says exactly what the game says.

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
  { id: "rooftop", name: "Rooftop", desc: "Industrial fans shove anything in their gust.", unlock: "Win on Danger 2", color: "#8fd3ff" },
  { id: "station", name: "Space Station", desc: "Conveyor belts carry you and the aliens along.", unlock: "Win on Danger 3", color: "#d59bff" },
] as const;

export const LOOP = [
  {
    n: 1,
    title: "Survive the wave",
    body: "The timer counts down. Weapons aim and fire on their own. You move, dodge, and stay alive. Waves get longer and denser.",
    art: "/art/enemies/alien-purple.png",
  },
  {
    n: 2,
    title: "Grab materials",
    body: "Killed aliens drop green materials. They are both currency and XP, and they magnetise toward you.",
    art: "/art/pickups/gold3.png",
  },
  {
    n: 3,
    title: "Level up",
    body: "Each level offers a pick of stat upgrades. Bank the rest of your materials for the shop.",
    art: "/art/pickups/chest-open.png",
  },
  {
    n: 4,
    title: "Shop and fuse",
    body: "Buy weapons (up to six) and passive items, reroll offers, or lock one for later. Two identical weapons fuse into a higher tier.",
    art: "/art/weapons/shotgun.png",
  },
] as const;

export const NUMBERS = [
  { value: "12", label: "playable eggs", art: "/art/eggs/ninja.png" },
  { value: "40+", label: "weapons", art: "/art/weapons/rocket-launcher.png" },
  { value: "69", label: "passive items", art: "/art/items/hot-sauce.png" },
  { value: "5", label: "arenas", art: "/art/pickups/vending-machine.png" },
  { value: "20", label: "waves per run", art: "/art/enemies/miniboss.png" },
  { value: "3", label: "boss fights", art: "/art/enemies/omelette.png" },
] as const;

export const STEAM_DECK_STEPS = [
  {
    title: "Switch to Desktop Mode",
    body: "Hold the Power button and choose Switch to Desktop, or open the Steam menu, then Power, then Switch to Desktop.",
  },
  {
    title: "Download the Linux build",
    body: "Open a browser in Desktop Mode and download Eggcentric-Linux.zip from this page. Save it somewhere you will keep it, such as a folder in Home.",
  },
  {
    title: "Extract the zip",
    body: "Right-click the zip and choose Extract Here. You will get a folder containing Eggcentric.x86_64 and its .pck file. Keep them together.",
  },
  {
    title: "Mark it executable if asked",
    body: "Right-click Eggcentric.x86_64, open Properties, then Permissions, and tick Is executable. Most Decks already have this set.",
  },
  {
    title: "Add it to Steam",
    body: "In Steam, choose Games, then Add a Non-Steam Game to My Library. Click Browse, change the file type filter to All Files, pick Eggcentric.x86_64, and click Add Selected Programs.",
  },
  {
    title: "Return to Gaming Mode",
    body: "Double-click Return to Gaming Mode on the desktop. Eggcentric is in your Library under Non-Steam. No compatibility layer is needed because it is a native Linux build.",
  },
] as const;

export const STEAM_DECK_NOTES = [
  "The UI is built for 16:10 and a controller, so it fits the Deck screen with no tweaks.",
  "Controller support works out of the box. Use the default Gamepad layout if Steam asks.",
  "The game updates itself. Open Options on the title screen and choose Check for Updates.",
  "Keep the game in a folder you can write to so the built-in updater can swap files.",
] as const;
