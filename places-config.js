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
