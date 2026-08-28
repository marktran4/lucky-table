# Lucky Table

The going-out sibling of Dinner Wheel. A shared shortlist of Melbourne
restaurants you want to try, narrowed to three, with an optional spin wheel to
break the tie. Two people, one table code, warm-paper look, plum accent.

**Live app:** https://marktran4.github.io/lucky-table/ (after first deploy)

## Put it on your phone

1. Open the link (with the table code, see below) in Safari.
2. Share button then **Add to Home Screen**.
3. Open it from the icon; it runs full-screen like a normal app.

## How it works

- **Dine out tab** is home. The **two entry points come first**, in this order:
  **your picks** (the main feature, always the big accent button and always on
  top — including when no Places key is set and it is the only one shown) and
  **Somewhere new**. Everything else sits below them. The first button carries
  **the table's own name for its picks** — "Our Picks" until someone renames it
  in Settings (this table calls it "Jenny's Picks").
- Filter chips (Distance / Cuisine / Price / Rating /
  More) open bottom sheets. **No filters are selected by default** (and none
  carry over a reload), so the picks draw from the whole saved list —
  seeded and manually added places alike; a **Clear all** chip appears at the
  end of the row whenever any filter is active. The chips govern **the saved-list
  picks only** — Somewhere new takes its constraints from the guided flow instead (see
  below), so a chip you set for the saved list never silently narrows a Google
  search. **Below ~8 places in the pool the whole row collapses** to a single
  "Narrow it down" chip — six ways to shrink a list of five is noise. It expands
  on tap for the rest of the session, and it is **always shown in full whenever a
  filter is active**, however small the list, so the bar can never hide the reason
  results look thin.
- The **Tonight's crowd-pleasers** rail (4.5★+, 300+ reviews) is a *discovery* suggestion —
  crowd-pleasers near your home point that you haven't saved yet, not places
  already on your list. It **rotates daily**: the day's pool of ~21 is fetched
  once and cached (in localStorage, by date + home point + table), then ordered by a
  date-seeded shuffle, so it's the same 6 all day and a different set tomorrow.
  Both phones usually land on the same 6 because the shuffle is deterministic and
  they ask Google the same question — but the cache is per-device, so each phone
  builds the day's pool once for itself; it is not shared through the table. Same-day reopens make zero Google calls (pool + photo
  URLs come from cache), which is cheaper than the old fetch-on-every-open. It
  shows 6 to start; each **Show more** tap reveals 5 more from the day's pool for
  up to 3 taps, then the button retires. It shows even when the saved list is
  empty, and it sits **below** the two entry points — it is a suggestion, not the
  main event, and above them it pushed the primary button toward the fold.
  Its cards each print their own rating and review count, which is where the
  4.5★/300+ gate is visible rather than spelled out in the heading.
- **The picks button** draws 3 from the saved list, live pool count on it;
  the draw is **weighted** — places shown in the last few draws, and ones you keep
  skipping past, come up less often, while places that have been waiting come up more.
  Nothing is ever excluded, so a much-skipped favourite still turns up eventually.
  **Somewhere new** is Google discovery of new nearby spots. Tap a card or
  **Spin the wheel** for the 3-wedge tie-breaker. Lock it in for Directions /
  Call, or **Show 3 others** once. Mega fast-food franchises (McDonald's, KFC,
  Hungry Jack's, Subway, Pizza Hut, Domino's and similar — list in `BANNED_NAME`,
  global product policy, not a per-table setting)
  are kept out of every suggestion, saved list and discovery alike. Other chains
  that aren't banned are **collapsed to one location** in discovery + the rail
  (`brandKey`): you won't see El Jannah from two suburbs. It keys on the first two
  words (brand, not suburb); chains whose branches differ earlier — "Brunetti Oro"
  vs "Brunetti Classico", or single-word brands like "Grill'd" — go in
  `DEDUP_BRANDS` to force one result.
- **Somewhere new: the guided flow.** Tapping it does not fire a search. It opens a
  bottom sheet that asks four questions, one per screen, with a back arrow and a
  step counter: **How far?** (the distance rings), **What are we feeling?** (cuisines,
  multi-select, plus a **🎲 Surprise me** that spins the old cuisine roulette and fills
  the answer in), **What are we spending?** (price levels, multi-select) and
  **How good does it need to be?** (rating floor). Every step has a **Skip**, and
  skipping means *no constraint* — never a quiet default. The answers then run the
  same nearby search as before. They are **session-local**: they never write to the
  filter chips and never survive a reload.
  The results list carries the answers on **one tappable line** at the top
  ("< 5 km · Thai, Viet · $$ · 4.0★+"); tapping a segment reopens the flow at that
  question. Open now / meal window are not flow questions, so they still come from
  the chip bar — and they appear on that line too, tinted, so nothing narrows the
  search invisibly. If a combination returns nothing, the empty state offers to
  loosen the tightest answer (cuisine first, then rating, price, distance) or to
  widen the ring, rather than dead-ending.
- **Discovery variety (Somewhere new + the rail).** Google's `searchNearby` returns at
  most 20 results with no pagination, so a fixed centre + ranking always returns
  the same ~20. To keep surfacing *new* restaurants, each batch is varied: batch 0
  is ranked by POPULARITY at your home point (the best spots), and every later
  batch is ranked by DISTANCE from a search centre that rotates around home and
  expands outward each full rotation. Results accumulate into a growing pool with
  a "seen" set, so "show a different 15" and repeated Somewhere new searches only show
  places you haven't seen this session (verified live: ~15 all-new per tap). When
  Google is genuinely tapped out it recycles the pool rather than dead-ending.
  A **30-day seen ledger** on the phone carries that across reloads too, so reopening the
  app no longer re-serves the same top-20 it showed yesterday; it is a preference, not a
  filter, so a thin result list fills up with already-seen places rather than dead-ending.
  Discovery also skips whatever the rail is showing on the same screen, as long as there
  are enough others to fill the list. Each day rotates which *direction* the later batches
  search, without changing how far out they go.
- **Places tab** holds the shortlist (Want to try / Been). Tap **+** to add a place
  by name (Google fills the details). **We went** moves it to Been and out of the
  pool. **Swipe a row right to remove it** (a 5-second Undo snackbar appears);
  the row's detail sheet still has a Remove button too.
  **Search** and a **sort** control sit above the segments (recently added by
  default; also longest-on-list, nearest, rating, cuisine, name). Sort order is
  remembered on the phone; the search box is not, so reopening never shows you a
  filtered list you forgot about.
- **Map tab** pins every saved place that has coordinates: green for want-to-try,
  saffron with a star for favourites, dim grey for Been, blue for home. Tapping a
  pin opens the same detail sheet as the list. Google Maps loads **only on first
  open of this tab**, never at app boot, and the view makes zero Places calls.
- **Settings** (gear, top right) covers the home point and distance rings, who this
  phone is, **what this table calls its picks**, **Never suggest**, the masked table
  code + copy-invite-link, sync status, and the Places API state. Most of this used
  to be reachable once at first launch and never again.
- **Never suggest** is per table and starts empty. Add a word (say `indian`, or
  `oyster`) and it is matched anywhere in a place's cuisine, on every phone at the
  table, for both the saved list and Google discovery. This used to be a hardcoded
  list in the source, which was fine as one household's preference and wrong the
  moment a second table existed — an invisible exclusion nobody could see or undo.
  The mega fast-food block (`BANNED_NAME`) is deliberately **not** part of this: it
  is a product stance about what the app is for, not a taste, so it stays global.
- **People at the table are data.** Each member has a name they typed and a colour;
  bylines and visit logs use them. Records written before this still render, falling
  back to the original two names. A new person joins by opening the invite link and
  tapping **Someone else** on the "who's on this phone?" step.
- **A new table starts in build mode.** Below **five** saved places the Dine out tab is a
  progress screen, not a picker: "Build your table — save 5 places you'd actually eat at",
  a progress bar, the crowd-pleasers rail, and *Add one by name*. Every rail card has a
  one-tap **+** that saves it straight to the list with no sheet in between (the card body
  still opens the detail sheet). At five it celebrates and the normal home screen appears.
  Five is the single number used by the copy, the bar and the unlock alike — at three every
  draw returns the identical three cards and the wheel is decorative, which is a worse first
  impression than one more tap of saving.
  Build mode needs a home point and a Places key, because without them the rail is empty and
  it would be a progress bar over nothing; that case gets **Set your area** instead, and
  adding by name works with neither.
- **First run is one sheet, not three.** Joining a table, saying who you are and
  setting a home point are three steps of a single flow, and only the ones actually
  missing are asked. Entering a code connects in place — no reload. The home step is
  required here, because discovery and the crowd-pleasers rail both need it and
  skipping it strands a brand-new table on an empty screen; the same sheet opened
  later from Settings still has **Skip**. Adding a place by name never needs a home
  point or a Places key.
- **A star** marks a favourite. `★ Favourites` on the Dine out filter bar draws only
  from starred places; it clears with **Clear all** like every other filter, and it
  never silently weights the odds.
- **Visits are a log, not a flag.** Each visit records a date, an optional 1-5
  personal rating, optional notes, and whether it's worth going back. Repeat visits
  append. Editing or deleting an old visit never moves a place between Want to try
  and Been — that's decided only by "We went" and "Back in the pool".
- **Sync is silent when it's fine.** A banner appears only when you're offline, when
  changes are queued, or when the table code is rejected. It reconnects and re-sends
  by itself, including when the app was opened with no connection at all.

---

# What's left for Mark (one-time setup)

Roughly 20 minutes, all in the browser console. Nothing here is committed to git.

## 1. Firebase rule (about 2 min, no new project)

Lucky Table reuses the existing **dinner-wheel** Firebase project, just a new
top-level node. In the Firebase console for `dinner-wheel-7de5f`:

- **Build > Realtime Database > Rules**, add the `luckytable` block alongside the
  existing `mealwheel` one, then **Publish**:

  ```json
  {
    "rules": {
      "mealwheel":  { "$house": { ".read": true, ".write": true } },
      "luckytable": { "$table": { ".read": true, ".write": true } }
    }
  }
  ```

Same open-under-an-unguessable-code model Dinner Wheel already uses.

## 2. Google Cloud: Places API (New) key (about 15 min)

This is the only real prerequisite. Without it the add-flow still works by manual
name entry, but there's no autocomplete or live open-check.

1. In the same Google Cloud project (or any project with billing), **enable the
   Places API (New)**. Billing must be on even though expected spend is $0.
2. **APIs & Services > Credentials > Create credentials > API key.** Leave it
   **unrestricted for now** (the seed script can't use a referrer-locked key).
3. **Set the guardrails before you share the app:**
   - Budget: **$5/month** budget with alerts at 50% and 100%.
   - Quota: cap **Places API (New) requests at ~200/day** (real use is under 10).
4. After seeding (step 5) come back and lock the key down:
   - **API restriction:** Places API (New) only.
   - **Application restriction:** HTTP referrers, `https://marktran4.github.io/*`
     (add `http://localhost:*` only while developing, remove after).

## 3. Paste the keys

- **Firebase web config** is already in `firebase-config.js` (reused from
  dinner-wheel, public by design). Nothing to do.
- **Places key** goes in `places-config.js`, replacing `REPLACE_ME_PLACES_KEY`:

  ```js
  window.PLACES_API_KEY = "your-key-here";
  ```

  Or just paste the key to Claude and it will drop it in.

## 4. Generate and share the table code

The table code is the private room key. It is **never committed** and lives only
in the URL hash.

- Pick any random string, 8+ letters/numbers/dashes (e.g. `lucky-EXAMPLE1` — pick your own; anything printed in this public README must never be the real code).
- Open the app once with it in the hash:
  `https://marktran4.github.io/lucky-table/#k=YOUR-CODE`
- Send Jenny the same link. Both phones now share one list.

## 5. Seed the list (about 1 min + Jenny)

Order matters: run the seed while the key is still **unrestricted**, then lock it.

1. Build/confirm `seed.csv` (already has ~18 real Melbourne candidates; Jenny
   reviews before seeding). Columns: `name, suburb, cuisine, price, mode, why`.
   `mode` = `family` sets kid-friendly true, `date` sets it false.
2. Run it (key and code as env vars so nothing secret is printed):

   ```bash
   LUCKY_PLACES_KEY="your-unrestricted-key" \
   LUCKY_TABLE_CODE="YOUR-CODE" \
   python3 ../seed.py            # add --dry-run first to preview matches
   ```

3. **Now apply the HTTP-referrer + API restriction** from step 2.4.
4. Open the app, run the kid-friendly pass in-app (2 min), and take the first
   real spin on a weekend.

## 6. Deploy

From `~/side-projects/lucky-table/`:

```bash
python3 deploy.py "Lucky Table v1"
```

Creates the `marktran4/lucky-table` repo (if needed), uploads `app/`, and enables
GitHub Pages. First build can take a minute.

---

## Dev notes

- One static page: `index.html` (all CSS/JS inline), `sw.js` offline shell,
  `manifest.webmanifest` + icons. Cloned from Dinner Wheel: Firebase Realtime
  Database (compat CDN), path-patch writes, `on('value')` listener, localStorage
  mirror, 4s offline-fallback boot, `#k=` table-code pairing, who-is-this-phone
  overlay.
- Google Places (New) calls, in full: the add flow (autocomplete + details + photo), an
  open-check when you open a *saved* place's result card, "Refresh details", the daily
  **Most popular nearby** pool (once per day per phone, then free from cache), a photo per
  card actually shown, a **Somewhere new** search per batch, and a dish-notes lookup the
  first time a place's result card is opened (cached for 30 days, deduped in flight).
  Drawing from the saved list and spinning the wheel still cost nothing — opening hours
  are stored and checked client-side.
- The nearby search deliberately does **not** request `reviews`/`editorialSummary`: they
  are Atmosphere-tier fields that would bill the whole 20-result call at the top rate to
  show dish notes on the one or two places anyone opens. Those are fetched per place
  instead. Don't add them back to that field mask.
- Icons are generated by `../make_icons.py` (pure stdlib, plum plate + cutlery).
- Source of truth lives in `~/side-projects/lucky-table/`; the
  `marktran4/lucky-table` repo is the GitHub Pages deploy target.
