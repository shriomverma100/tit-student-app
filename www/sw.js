/* Service worker: caches the app so the iPhone/Android web app opens offline.
   Bump CACHE when you change any file so phones pick up the new version. */
const CACHE = 'tit-app-v3';
const FILES = [
  './', 'index.html', 'manifest.webmanifest',
  'css/style.css', 'js/icons.js', 'js/store.js', 'js/card.js', 'js/app.js', 'lib/qrcode.js',
  'assets/logo.jpg', 'assets/icons/apple-touch-icon.png', 'assets/icons/icon-192.png', 'assets/icons/icon-512.png', 'assets/icons/favicon.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// network first (so updates show up), fall back to cache when offline
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res; })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('index.html')))
  );
});
