/*
 * Lucky Table — Google Places API (New) key.
 *
 * This key is public in a static PWA, so it is contained, not concealed:
 *   - restricted to Places API (New) only
 *   - HTTP-referrer locked to https://marktran4.github.io/*
 *   - capped at ~200 requests/day + a $5/month budget alert
 * See README.md for the exact Google Cloud steps.
 *
 * Until a real key is pasted below the add-flow degrades gracefully to
 * manual "add by name" entry and the app makes zero Places calls.
 *
 * Paste the key between the quotes, replacing AIzaSyBa61KLqQtsPkzCYdlIcZEZzFzzAMAWYXg.
 */
window.PLACES_API_KEY = "AIzaSyBa61KLqQtsPkzCYdlIcZEZzFzzAMAWYXg";

/*
 * Map ID for the Map tab (Google Cloud > Maps > Map management > Create map ID,
 * type: JavaScript, vector).
 *
 * Required: the Map tab uses AdvancedMarkerElement, which renders NOTHING without a
 * map ID. Until this is filled in the tab shows a short setup message and skips the
 * API load entirely, so an unconfigured map costs nothing.
 */
window.MAPS_MAP_ID = "REPLACE_ME_MAP_ID";
