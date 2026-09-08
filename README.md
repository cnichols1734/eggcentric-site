# Eggcentric site

One-page launch site for [Eggcentric](https://github.com/cnichols1734/eggcentric-releases/releases), styled after the game and deployed on Railway.

## How it stays current

- Download buttons point at GitHub's permanent `releases/latest/download/<asset>` URLs, so they never go stale.
- Version number, file sizes, release notes and SHA-256 checksums come from the GitHub Releases API and are cached with a 5 minute ISR window (`lib/releases.ts`).
- `POST /api/revalidate?secret=...` busts that cache immediately. The game's release workflow can call it after publishing so the site updates the moment a release lands.
- If GitHub is unreachable or rate-limited, the page falls back to a baked-in snapshot of the last known release instead of breaking.

## Develop

```bash
npm install
npm run dev
```

Game art, fonts and the logo are copied from the game repo with `npm run sync-assets` (expects `~/brotato-clone`, or set `EGGCENTRIC_GAME_DIR`). Screenshots in `public/shots/` were captured with the game's built-in `EGGCENTRIC_SHOT` capture mode.

## Environment

See `.env.example`. `REVALIDATE_SECRET` is required for the webhook; `GITHUB_TOKEN` is optional but lifts the anonymous API limit.

## Hero video

Drop a `hero.mp4` (and optional `hero.jpg` poster) into `public/` and the hero picks it up as a background layer on the next build. No code change needed.

## Deploy

Live at [eggcentric-game.com](https://eggcentric-game.com). The Railway service `eggcentric-site` is linked to this repo's `main` branch, so every push (or merged PR) builds and deploys automatically.

- Build `npm run build`, start `npm start`. `PORT=3000` is set on the service and both domains target port 3000.
- DNS lives at Squarespace: `ALIAS @` and `CNAME www` point at the Railway targets, plus the two `_railway-verify` TXT records.
- Variables: `REVALIDATE_SECRET`, `NEXT_PUBLIC_SITE_URL`, `PORT`.
