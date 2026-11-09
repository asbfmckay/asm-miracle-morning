# Miracle Morning App — Handover

**Live site:** https://asbfmckay.github.io/life-app/ (was /asm-miracle-morning/ until the v3.1 rename)
**Repo:** github.com/asbfmckay/life-app (renamed from asm-miracle-morning; GitHub Pages, served from `main`, repo root). The local folder keeps its old name `asm-miracle-morning`, which is fine.
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

## Where we are: Goals v2 built — v3.3.0 (10 Nov 2026). Phase 2 (Reading) done. Next: Phase 3 (Sharing) when Andrew says go.

### v3.3.0 (10 Nov 2026) — Goals v2
- **Levels:** Area → 10-year vision → **Goal** (a result by a date) → **Milestones** (dated checkpoints, with a number where it makes sense) → **Habits** (recurring) and **Tasks** (one-off, dated). Standards live in the area affirmation.
- **Goals tab:** clean cards grouped by area (small colour dot, no thick band), each with a progress ring, "x of y", due date, a pace pill (On pace / N behind / Achieved) and Shared tag. 10-year vision folds open under each area. "Vision & affirmation" edits the area in a panel.
- **Tap a goal:** progress ring, chart of you against the on-pace line (straight lines through the milestones), update box (+1 with note for counts, a reading for measures), Why, Milestones (auto-ticked when the number is reached), linked Habits (tick here), Tasks, If–then plan, Notes, Links, Updates log, Edit goal (title, area, Just me/Shared, how it's measured, counted from, start/target/unit, dates, why), archive or delete.
- **Self-updating goals:** NT goal counts New Testament chapters ticked on the Reading tab; Subjects goal counts subjects; White Book goal = White Books finished inside their week of those received (pace = none missed).
- **The 8 goals to 31 Dec 2027** from the goals doc are loaded with milestones, if–then plans, and habits (Subject with the boys 4/wk shared, One-on-one 1/wk, Train 4/wk, Weigh in 1/wk, Log food 6/wk, Terakor step 3/wk, Sunday budget review 1/wk shared) and tasks. The old goal list is archived (kept, hidden). Terakor has no target yet: open it → Edit goal → Target.
- Loaded once, by Andrew's profile after signing in and syncing (flag item `goals-v2` in hh). Bronnia sees the shared goals only.
- **Today:** "Goal steps due" card (tasks due today or overdue). **Weekly review:** each goal with its pace, On track / At risk / Off track, and a next step (becomes a task due in 6 days).
- Data: `goal` (v:2; hh = shared, u: = just me), `ms`, `gtask`, `glog` (one item per update, so two people never overwrite each other), all in the goal's space. Old v1 goals: `archived:true`.
- Files: links only for now (paste a OneDrive/Google link). Uploading files would need storage added to the Worker — ask if wanted.

### Your steps for v3.3.0
1. GitHub Desktop → life-app → commit "v3.3.0 Goals v2" → Push.
2. In the app: Reading → change plan → book by book, Matthew to Revelation, 1 chapter a day.
3. Goals → Terakor → Edit goal → set the target when ready.

### v3.2.1 (10 Nov 2026)
- Removed "Ends if started now" from the Today plan card (Andrew: not really required).

### v3.2.0 (10 Nov 2026) — Phase 2: Reading
- **New Reading tab** (tabs: Today · Reading · Habits · Goals · Review).
- **Morning Bible (yours):** pick a plan — the same six as the Holy Bible app (whole Bible in a year, OT & NT together, NT in 90 days, chronological, Gospels in 30 days, Psalms & Proverbs) or book by book at 1–5 chapters a day. Shows today's chapters, chapters done of total, on track / N behind. Tick all, or tap each chapter. Unread chapters roll forward to the next day (nothing is skipped).
- **Lunchtime Proverb (yours):** a random group of 5–10 verses in a row from Proverbs, new each day, the same all day on every device. Shows on Today from 11am.
- **Tonight's Psalm (family, shared):** methodical from Psalm 1:1. Short Psalms (15 verses or fewer) are one reading; longer ones split into parts of about 10 verses; Psalm 119 by its 8-verse sections. 260 readings, then starts again. Either of you ticking it ticks it for both. "Start from a different Psalm" to jump ahead. Shows on Today from 5pm.
- **White Book (yours):** enter the number (e.g. 1034), pages to read, 1 or 2 weeks, and first page number. It splits the pages over the days left and shows today's pages; falls behind or reads ahead, it re-spreads. "Read up to page" to correct. Earlier White Books listed.
- **Other ministry (yours):** author, volume, pages; tick when read; read list kept with dates.
- **Subjects for the boys (family, shared):** "Bible reading for the young" (Bible & Gospel Trust) — all 218 passages from the PDF, ticked with who and when. Next three shown; "Show the whole list" by book.
- **Holy Bible app link:** the book button on each reading opens the Holy Bible app at that passage (verses highlighted). Its **✓ Done · back to Life App** bar brings you back and ticks it (and marks the chapters read in the Bible app too). Address: https://holy-bible-app.pages.dev/ (change at the bottom of the Reading tab).
- **Today screen:** "Reading today" card (Morning Bible, Proverb after 11am, Psalm after 5pm, White Book). **Session Reading step** shows the morning chapters and today's White Book pages with the same buttons.
- Reminders are the time-of-day cards above; phone notifications are not built (needs push — later if wanted).

**Holy Bible app v1.7.0** (separate project, `Holy Bible App` folder): adds the Life App link bar (`LifeLink` in `src/js/main.js`). Push that repo in GitHub Desktop; Cloudflare Pages rebuilds it. No API change.

### Your steps for v3.2.0
1. GitHub Desktop → Holy Bible App repo → commit "1.7.0 Life App link" → Push.
2. GitHub Desktop → life-app repo → commit "v3.2.0 Reading" → Push.
3. Open the app → Reading → choose your morning plan.

### v3.1.0 (9 Nov 2026) — repo renamed to life-app; habits removed from Folio
- Repo renamed to `life-app` (your choice). New address https://asbfmckay.github.io/life-app/. `manifest.json` id is now `/life-app/`, so reinstall the app on the phone. Saved data on this phone carries over (same site).
- **Phase 1 complete:** Habits removed from Folio (Folio v104, app-only, nothing deleted, Folio's Habits link points here). You hadn't set habits up in Folio, so there was nothing to import.

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
3. Rename the repo: github.com/asbfmckay/asm-miracle-morning → **Settings** → Repository name → `life-app` → Rename. GitHub Desktop keeps working (it follows the rename).
4. Push the app: GitHub Desktop → "v3.1.0 Life App phase 1" → Commit to main → Push origin. Live at https://asbfmckay.github.io/life-app/ in approx 1 minute (check Settings → Pages still shows it switched on).
5. On your phone: uninstall the old Miracle Morning app, open the new address in Chrome, install it again. Settings → Sign in → Andrew → PIN.
6. Folio: push it in GitHub Desktop (v104 — Habits removed). No wrangler step.

If the address differs from life-api.andrew-bronnia.workers.dev, enter it under Sign in → Server address and tell me so I update the default.

### Still to do
- Phone notifications (habit and reading reminders) not built — needs push; ask if wanted.
- Phase 3 Sharing · Phase 4 Links · Phase 5 Brighta and polish (see spec).
- Bronnia's own reading plan, Proverb, White Book and ministry work now under her profile; her own goals/affirmations are Phase 3.

### Tested (in the cloud, not on your phone)
- Old v2 data carried over (streak kept), goals seeded, editing saved, milestones, measured goal update.
- Folio import (private + shared habit, ticks, notes, a second person's ticks kept).
- Habit linked to a goal feeds the weekly score. Full session incl. Scribing autosave. Weekly review save.
- Sign-in + sync against a local copy of the Worker; a second "device" signed in and got everything (habits, goals edits, milestones, family note).
- v3.2: plan picking, Bible app round trip (open → Done → back ticks it, range highlighted), Psalm and Subjects shared between profiles, White Book private.
- v3.1: wrong PIN refused; Andrew and Bronnia sign in on separate devices; Bronnia can't see Andrew's Scribing; Bronnia's tick on a shared habit shows on Andrew's phone; Folio ticks mapped to Bronnia.

## How it works (for future changes)
- Every record is an "item" `{id, type, space, updatedAt, deleted?}`. Spaces: `hh` = household (areas, goals, ms, habit, hm ticks, famnote), `u:<uid>` = private (prefs, mm daily log, scribe, review).
- Saved to localStorage (`life_items`), changes queued in `life_dirty`, pushed to `POST /sync`, pulled from `GET /sync?since=`. Newest `updatedAt` wins per item.
- Worker rules: you can only read `hh` and your own `u:` space; habits only changed by their owner; habit ticks only by the person ticking. Daily snapshot of each space kept 14 days.
- Habit tick docs keep Folio's shape: `hm-<habitId>-<uid>-<YYYY-MM>` with `d` (day → g/r/s) and `n` (day → note).
- Reading items: `rplan` (u:, plan + `done` map "book:chapter" → date), `proverb` `pv-<date>` (u:), `psread` `ps-<round>-<idx>` (hh; idx into the fixed Psalm sequence `PSEQ`), `wb` (u:, `readTo`, `log` date → [from,to]), `ministry` (u:), `subject` `sj-<idx>` (hh; idx into `SUBJECTS`). Don't reorder `SUBJECTS` or change `PSEQ` rules without migrating ids.
- Bible app link: `bibleUrl()` builds `<bible>/?ret=<this app>&rid=<id>[&to][&mark]#Book.c.v`; `handleReturn()` reads `#done=<rid>`.
- Bump `APP_VERSION` (index.html), `WORKER_VERSION` (worker.js) and `CACHE` (sw.js) together. (v3.2.0 had no Worker change.)

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

