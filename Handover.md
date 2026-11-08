# Miracle Morning App — Handover

**Live site:** https://asbfmckay.github.io/asm-miracle-morning/
**Repo:** github.com/asbfmckay/asm-miracle-morning (GitHub Pages, served from `main`, repo root)
**Local folder:** `App Projects\Miracle Morning App`

## Folder layout
```
Miracle Morning App\
  Handover.md            ← this file
  new-build\             ← working copy of the latest files (also copied into the repo)
  asm-miracle-morning\   ← the GitHub repo (created by GitHub Desktop clone)
```

## v2.3.0 (9 Nov 2026) — beige base
- Background near-white warm cream (#FCFAF6) with only a small yellow glow (v2.3.1).
- Step colours back (olive, green, teal, blue, purple, berry) — deeper, not pastel. Each session step gets a light wash of its colour.
- Start/Done buttons stay yellow (single colour).
- Settings → "Install on this device" button (Chrome install prompt). Hidden once installed.

## v2.2.0 (9 Nov 2026) — yellow & charcoal (superseded by v2.3)
- One colour only: warm yellow/gold + charcoal. No multi-colour gradients, no per-step colours.
- Drifting background is all yellow tones; buttons are solid yellow with a slight same-colour fade.

## v2.1.0 (9 Nov 2026) — soft refresh (colours superseded by v2.2)
- Warm grey-beige base with a slowly drifting pastel background (mint, peach, sky, lilac) — tints to each step's colour during a session.
- Muted step colours, frosted-glass cards, Outfit font at lighter weights, thin-line icons.
- Faded gradient buttons (no heavy solid fills); dial is a faded gradient ring with a gentle breathing glow.
- Little touches: tick pop on the home list, soft bubbles on the finish screen, sections fade/slide in.

## v2.0.0 (9 Nov 2026) — what changed
- Redesign with bottom tab bar (Today / Affirm / Goals / Settings) and a colour per S.A.V.E.R.S step (look softened in v2.1).
- Big countdown ring, large play/pause.
- **Overall timer** on the session screen: segmented progress bar + Elapsed / Remaining / Finish time.
- **Keep screen on** toggle (Settings, and the sun button bottom-right in a session). Uses the Screen Wake Lock API — works in Chrome on Android over https.
- Vibrate between steps (toggle), chime toggle, step durations editable per plan.
- Daily tick-offs + day streak (step auto-ticks when its timer finishes, or if you move on after at least half the time). Tap a circle on the home screen to tick/untick manually.
- Installable app (manifest + icons + service worker). Service worker is network-first, so new deploys show up on next open.
- Uses the same saved-data keys as v1, so existing affirmations, name and durations carry over.

## Files
| File | Purpose |
|---|---|
| index.html | The whole app (HTML/CSS/JS in one file) |
| manifest.json | Makes it installable (Add to Home screen) |
| sw.js | Offline cache, network-first. Bump `CACHE` name if anything looks stale |
| icon-192.png, icon-512.png, icon-maskable-512.png | App icons |
| .gitignore | Ignores Windows/Mac junk files |

## Deploying changes (GitHub Desktop)
1. Edit files inside `asm-miracle-morning\`.
2. GitHub Desktop → write a summary → **Commit to main** → **Push origin**.
3. Live in approx 1 minute. On the phone, close and reopen the app to pick it up.

## Ideas / next
- Reading Program link (currently "coming soon").
- Bump `APP_VERSION` in index.html on each release.
