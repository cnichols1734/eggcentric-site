#!/usr/bin/env bash
# Copies fonts, logo and sprite art from the game repo into public/ so the site's
# asset set is reproducible. Run from the site root: ./scripts/sync-assets.sh
set -euo pipefail

GAME="${EGGCENTRIC_GAME_DIR:-$HOME/brotato-clone}"
SITE="$(cd "$(dirname "$0")/.." && pwd)"
PUB="$SITE/public"

if [[ ! -d "$GAME/assets" ]]; then
  echo "Game repo not found at $GAME (set EGGCENTRIC_GAME_DIR)" >&2
  exit 1
fi

mkdir -p "$PUB/fonts" "$PUB/art/ui" "$PUB/art/eggs" "$PUB/art/enemies" \
  "$PUB/art/weapons" "$PUB/art/items" "$PUB/art/pickups" "$PUB/art/fx"

cp "$GAME/assets/fonts/LuckiestGuy-Regular.ttf" "$PUB/fonts/"
cp "$GAME/assets/fonts/Baloo2-VF.ttf" "$PUB/fonts/"

cp "$GAME/assets/sprites/ui/eggcentric-logo.png" "$PUB/art/ui/"
cp "$GAME/assets/sprites/ui/nichmann-games.png" "$PUB/art/ui/"
cp "$GAME/assets/icon.png" "$PUB/art/ui/icon.png"

for f in "$GAME"/assets/sprites/characters/egg-*-right.png; do
  cp "$f" "$PUB/art/eggs/$(basename "$f" | sed 's/^egg-//; s/-right//')"
done
cp "$GAME/assets/sprites/characters/egg-chicken-cracked.png" "$PUB/art/eggs/chicken-cracked.png"

ENEMIES=(alien-blue alien-green alien-orange alien-purple alien-red alien-spikey
  medium-alien ufo frog mushroom scorpion fried-egg deviled-egg scrambled-egg
  omelette spitter miniboss skelehorse bone-egg)
for e in "${ENEMIES[@]}"; do
  cp "$GAME/assets/sprites/enemies/$e-right.png" "$PUB/art/enemies/$e.png"
done
for e in bomber blinker shielder leech healer-jelly; do
  cp "$GAME/assets/sprites/enemies/$e.png" "$PUB/art/enemies/$e.png"
done

WEAPONS=(pistol smg shotgun knife rocket-launcher flamethrower katana minigun
  frying-pan tesla-gun railgun harpoon-gun boombox yoyo chainsaw crossbow
  grenade-launcher freeze-ray sledgehammer laser-pistol shield-emitter turret-kit)
for w in "${WEAPONS[@]}"; do
  cp "$GAME/assets/sprites/weapons/$w.png" "$PUB/art/weapons/$w.png" 2>/dev/null \
    || cp "$GAME/assets/sprites/$w.png" "$PUB/art/weapons/$w.png"
done

ITEMS=(honey hot-sauce golden-spatula piggy-bank pink-himalayan-salt bacon-strips
  egg-timer tin-foil-hat infinity-skillet star-anise maple-syrup lava-cake
  cast-iron-pan sriracha ghost-pepper coupon-book)
for i in "${ITEMS[@]}"; do
  cp "$GAME/assets/sprites/items/$i.png" "$PUB/art/items/$i.png"
done

for p in gold1 gold2 gold3 gold4 chest-closed chest-open vending-machine drink-energy-drink honey-health; do
  cp "$GAME/assets/sprites/pickups/$p.png" "$PUB/art/pickups/$p.png"
done

cp "$GAME/assets/sprites/fx/spawn-x.png" "$PUB/art/fx/"
cp "$GAME/assets/sprites/fx/dodge.png" "$PUB/art/fx/"

echo "Synced assets into $PUB"
