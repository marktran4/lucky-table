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

- **Dine out tab** is home. Filter chips (Distance / Cuisine / Price / Rating /
  More) open bottom sheets; the meal window auto-sets from the clock. A
  **Most popular** rail (4.5★+, 300+ reviews) sits above **Let's OG** (Google
  discovery of new nearby spots) and **Jenny's Hit List** (draw 3 from the saved
  list, pool count on the button). Tap a card or **Spin the wheel** for the
  3-wedge tie-breaker. Lock it in for Directions / Call, or **Show 3 others** once.
- **Places tab** holds the shortlist (Want to try / Been). Tap **+** to add a place
  by name (Google fills the details). **We went** moves it to Been and out of the
  pool.

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

From `projects/lucky-table/`:

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
- Google Places (New) is called **only** at add time, on Refresh details, and
  once per locked-in pick (the live open-check). The everyday spin loop makes
  zero API calls (opening hours are stored and checked client-side).
- Icons are generated by `../make_icons.py` (pure stdlib, plum plate + cutlery).
- Source of truth lives in `ea-automation` at `projects/lucky-table/`; the
  `marktran4/lucky-table` repo is the GitHub Pages deploy target.
