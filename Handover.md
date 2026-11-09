# Miracle Morning App — Handover

**Live site:** https://asbfmckay.github.io/asm-miracle-morning/
**Repo:** github.com/asbfmckay/asm-miracle-morning (GitHub Pages, served from `main`, repo root)
**API Worker:** `life-api` on your own Cloudflare account (andrew.bronnia@gmail.com, same as Folio/Brighta) → https://life-api.andrew-bronnia.workers.dev
**Spec:** "Life App — Feature Spec" (Claude Doc). Goals seeded from "Andrew's Miracle Morning — Goals, Affirmations & Visualisations".
**Local folder:** `App Projects\Miracle Morning App`

## Folder layout
```
Miracle Morning App\
  Handover.md            ← this file
  new-build\             ← working copy of the latest files (also copied into the repo)
  asm-miracle-morning\   ← the GitHub repo (GitHub Desktop)
    index.html, sw.js, manifest.json, icons
    worker\worker.js, worker\wrangler.toml   ← the API Worker (deployed separately, see below)
```

## Where we are: Phase 1 (Core) built — v3.1.0 (9 Nov 2026). Waiting on your go-ahead for Phase 2.

### v3.1.0 (9 Nov 2026) — PIN sign-in
- Sign-in is now: tap **Andrew** or **Bronnia**, enter your PIN. Email/password removed.
- Two profiles: Andrew (andrew.mckay92@gmail.com, owner) and Bronnia (andrew.bronnia@gmail.com). Set in `PROFILES` at the top of worker.js.
- Each PIN is a Cloudflare secret: `PIN_ANDREW`, `PIN_BRONNIA` (4–8 digits). To change one: `npx wrangler secret put PIN_ANDREW`, type the new PIN (takes effect straight away, no deploy needed).
- 5 wrong PINs locks that profile for 15 minutes. You stay signed in on a device for a year.
- Folio import now asks whose ticks are whose (Andrew / Bronnia / Skip), so Bronnia's ticks on shared habits come across too.
- Bronnia can sign in now: she sees the household goals and all habits and can tick her own. Her own goals/affirmations, reading track and the rest of sharing are Phase 3.

### What's in v3.0.0
- **Tabs:** Today · Habits · Goals · Review. Settings moved to the round button top-right (its dot = sync status: grey not signed in, green saved, yellow waiting, red problem). Reading tab arrives in Phase 2.
- **Today (Morning):** same S.A.V.E.R.S run, timers, overall timer, keep-screen-on, chime/vibrate. Plus **Today's habits** with one-tap ticks.
  - Affirmations step now reads live from Goals: Anchor, Faith, Family, Health, Financial. Your old character list (honesty, trust…) is kept — switch it on in Settings → Affirmations if you want it read too.
  - Visualisation step shows each area's visualisation, highlighting one at a time with its own short timer (step time ÷ number of areas).
  - Scribing step is a form saved as a dated entry: 3 gratitudes, line that struck me, top 3, win from yesterday, open reflection, plus one rotating prompt. Saves as you type. When its timer ends it pauses instead of jumping away. Tap "Scribing" on the Today list to open today's entry any time.
- **Goals:** one card per area (anchor at top). 10-year vision, 12-month goals with % complete, milestones (add/tick/delete, with due dates), daily action, this week's habit score. **Edit** on each card changes vision, goals, affirmation, visualisation in place. Goals marked "suggested" show a yellow tag — tap to confirm.
  - Health "Reach 85kg" is a measured goal (104 → 85kg by 30 Apr 2027); tap Update or use the weekly review to enter your weight. Others are milestone-based. No milestones or habits were seeded (per spec).
- **Habits:** same as Folio — week/month view, tap a day to cycle done → missed → skipped → clear, streak, overall %, notes per day. New: times-a-week target, link to a goal (feeds that area's weekly score), "Both of us" or "Private". Everyone in the household can see each other's habits; you only tick your own.
- **Move habits from Folio:** Settings → Data → Move habits from Folio → choose a Folio backup file (Folio → Settings → Download a backup). Brings habits, every tick and notes. Folio is not changed.
- **Weekly review:** habit scores for the week, the week's Scribing, update measured goals and tick milestones, family discussion note (shared with the household), one thing to do better, notes. Last week's "one thing" shows at the top. Past reviews listed below.
- **Sign-in and sync:** profile + PIN (v3.1). Works offline; changes sync when online (every 30s and on open). Without signing in it still works, saved on the phone only.
- Your v2 data (name, durations, streak history, affirmations) carries over automatically.
- Settings → Data → Download a backup gives a file of everything.

### Decisions made (you didn't pick, so I went with the simplest; easy to change)
- Sign-in: **PIN per profile** (your call, v3.1).
- Hosting: **stays on GitHub Pages** (same address, same GitHub Desktop push). Only the API is on Cloudflare.
- Name: **kept "Miracle Morning"** for now.
- Sharing (from your note): goals are household-shared and either of you can edit; habits visible to both; morning routine, Scribing and reviews private to each person; family discussion notes shared. Bronnia's profile exists now; her own private areas are Phase 3.

### Your steps to go live (approx 10 minutes)
1. Command Prompt:
```
cd "%USERPROFILE%\OneDrive - Criterion Industries\ENTRO\App Projects\Miracle Morning App\asm-miracle-morning\worker"
npx wrangler whoami
npx wrangler kv namespace create DB
```
   `whoami` must show andrew.bronnia@gmail.com (the Cloudflare account Folio uses). Paste the `id` it prints into `wrangler.toml` over `REPLACE_WITH_KV_ID`.
2. Set the PINs and deploy:
```
npx wrangler secret put PIN_ANDREW
npx wrangler secret put PIN_BRONNIA
npx wrangler deploy
```
   Type each PIN (4–8 digits) when asked. Check https://life-api.andrew-bronnia.workers.dev/health shows `"ok":true` and both PINs `"set":true`.
3. Push the app: GitHub Desktop → "v3.1.0 Life App phase 1" → Commit to main → Push origin.
4. In the app: Settings (top right) → Sign in → Andrew → PIN.
5. Folio → Settings → Download a backup. Then here: Settings → Move habits from Folio → choose the file → check the names under "Whose ticks are these?" → Import.
6. Check the habits and history look right, then tell me and I'll remove the habit tracker from Folio (the last Phase 1 item).

If the address differs from life-api.andrew-bronnia.workers.dev, enter it under Sign in → Server address and tell me so I update the default.

### Still to do
- **Phase 1 last step:** remove Habits from Folio after you've checked the import.
- Habit reminders (Folio had a daily reminder time) aren't in yet — needs phone notifications; can add with Reading reminders in Phase 2.
- Phase 2 Reading · Phase 3 Sharing · Phase 4 Links · Phase 5 Brighta and polish (see spec).

### Tested (in the cloud, not on your phone)
- Old v2 data carried over (streak kept), goals seeded, editing saved, milestones, measured goal update.
- Folio import (private + shared habit, ticks, notes, a second person's ticks kept).
- Habit linked to a goal feeds the weekly score. Full session incl. Scribing autosave. Weekly review save.
- Sign-in + sync against a local copy of the Worker; a second "device" signed in and got everything (habits, goals edits, milestones, family note).
- v3.1: wrong PIN refused; Andrew and Bronnia sign in on separate devices; Bronnia can't see Andrew's Scribing; Bronnia's tick on a shared habit shows on Andrew's phone; Folio ticks mapped to Bronnia.

## How it works (for future changes)
- Every record is an "item" `{id, type, space, updatedAt, deleted?}`. Spaces: `hh` = household (areas, goals, ms, habit, hm ticks, famnote), `u:<uid>` = private (prefs, mm daily log, scribe, review).
- Saved to localStorage (`life_items`), changes queued in `life_dirty`, pushed to `POST /sync`, pulled from `GET /sync?since=`. Newest `updatedAt` wins per item.
- Worker rules: you can only read `hh` and your own `u:` space; habits only changed by their owner; habit ticks only by the person ticking. Daily snapshot of each space kept 14 days.
- Habit tick docs keep Folio's shape: `hm-<habitId>-<uid>-<YYYY-MM>` with `d` (day → g/r/s) and `n` (day → note).
- Bump `APP_VERSION` (index.html), `WORKER_VERSION` (worker.js) and `CACHE` (sw.js) together.

## Files
| File | Purpose |
|---|---|
| index.html | The whole app (HTML/CSS/JS in one file) |
| manifest.json | Makes it installable |
| sw.js | Offline cache, network-first. Bump `CACHE` each release |
| worker/worker.js | API Worker: profiles + PIN sign-in, sync, sharing rules |
| worker/wrangler.toml | Worker settings (account, KV id, allowed app address) |
| icon-*.png | App icons |

## Deploying changes
- **App** (index.html, sw.js, icons): GitHub Desktop → Commit to main → Push origin. Live in approx 1 minute; close and reopen the app on the phone.
- **API** (worker/worker.js): `cd worker` then `npx wrangler deploy`. A push does not deploy it.

## Earlier versions
### v2.5.0 (9 Nov 2026) — new step icons
- Silence = dawn over hills, Affirmations = target, Visualisation = lightbulb, Exercise = running shoe. Reading and Scribing unchanged.

### v2.4.0 (9 Nov 2026) — fit + wording
- Home screen tightened so all six steps + Start button fit without scrolling on a typical phone.
- Start/Done/Install buttons now a muted soft yellow.
- Home subheading: "Win the morning, win the day." Affirmations subheading: "Declare who you're becoming."

### v2.3.0 (9 Nov 2026) — beige base
- Background near-white warm cream (#FCFAF6) with only a small yellow glow (v2.3.1).
- Step colours back (olive, green, teal, blue, purple, berry) — deeper, not pastel. Each session step gets a light wash of its colour.
- Start/Done buttons stay yellow (single colour).
- App icon / favicon: muted gold half-sun on white with a straight diagonal soft-yellow fade from the top-left (no round glows, no grey).
- Settings → "Install on this device" button (Chrome install prompt). Hidden once installed.

### v2.2.0 (9 Nov 2026) — yellow & charcoal (superseded by v2.3)
- One colour only: warm yellow/gold + charcoal. No multi-colour gradients, no per-step colours.
- Drifting background is all yellow tones; buttons are solid yellow with a slight same-colour fade.

### v2.1.0 (9 Nov 2026) — soft refresh (colours superseded by v2.2)
- Warm grey-beige base with a slowly drifting pastel background (mint, peach, sky, lilac) — tints to each step's colour during a session.
- Muted step colours, frosted-glass cards, Outfit font at lighter weights, thin-line icons.
- Faded gradient buttons (no heavy solid fills); dial is a faded gradient ring with a gentle breathing glow.
- Little touches: tick pop on the home list, soft bubbles on the finish screen, sections fade/slide in.

### v2.0.0 (9 Nov 2026) — what changed
- Redesign with bottom tab bar (Today / Affirm / Goals / Settings) and a colour per S.A.V.E.R.S step (look softened in v2.1).
- Big countdown ring, large play/pause.
- **Overall timer** on the session screen: segmented progress bar + Elapsed / Remaining / Finish time.
- **Keep screen on** toggle (Settings, and the sun button bottom-right in a session). Uses the Screen Wake Lock API — works in Chrome on Android over https.
- Vibrate between steps (toggle), chime toggle, step durations editable per plan.
- Daily tick-offs + day streak (step auto-ticks when its timer finishes, or if you move on after at least half the time). Tap a circle on the home screen to tick/untick manually.
- Installable app (manifest + icons + service worker). Service worker is network-first, so new deploys show up on next open.
- Uses the same saved-data keys as v1, so existing affirmations, name and durations carry over.

