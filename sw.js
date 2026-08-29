/* Lucky Table service worker — offline app shell so the list opens without signal */
var VERSION = 'lt-v21';
/* Cache Storage is shared across every app on this origin (marktran4.github.io), so the
   activate sweep must only ever touch OUR caches — deleting by "not the current version"
   would wipe the other PWAs hosted here. */
var CACHE_PREFIX = 'lt-';
var ASSETS = ['./', 'index.html', 'manifest.webmanifest', 'firebase-config.js', 'places-config.js', 'icon-180.png', 'icon-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(VERSION).then(function (c) { return c.addAll(ASSETS); }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) {
        return k.lastIndexOf(CACHE_PREFIX, 0) === 0 && k !== VERSION;   // our old versions only
      }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;

  // App shell: network-first so updates land, cache fallback for offline
  if (url.origin === location.origin) {
    e.respondWith(
      fetch(e.request).then(function (res) {
        if (res.ok) {
          var copy = res.clone();
          caches.open(VERSION).then(function (c) { c.put(e.request, copy); });
        }
        return res;
      }).catch(function () {
        return caches.match(e.request, { ignoreSearch: true }).then(function (hit) {
          return hit || caches.match('index.html');
        });
      })
    );
  }
  // Cross-origin (Firebase SDK, Google Places, place photos): let the browser handle it normally.
});
