/* Sam's Table service worker.
   VERSION matches the CSS version (?v=) and is set by tools/pwa.py on every build,
   so each deploy gets fresh caches and old ones are deleted. */
const VERSION = '20261019c';
/* Visited pages live in st-pages and survive deploys, so saved recipes keep working offline. */
const SHELL = 'st-shell-' + VERSION, PAGES = 'st-pages', ASSETS = 'st-assets-' + VERSION, IMAGES = 'st-images';
const PRECACHE = [
  '/', '/index.html', '/recipes.html', '/meal-prep.html', '/what-to-make.html', '/offline.html',
  '/css/style.css?v=' + VERSION, '/js/search.js', '/js/app.js', '/js/picker.js', '/js/rate.js',
  '/data/recipes.js', '/data/picker.js', '/icons/icon-192.png', '/favicon.ico', '/favicon-32.png'
];
const MAX_PAGES = 80, MAX_ASSETS = 60, MAX_IMAGES = 200;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(PRECACHE.map(u => new Request(u, {cache: 'reload'})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('st-') && ![SHELL, PAGES, ASSETS, IMAGES].includes(k)).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

async function trim(name, max) {
  const c = await caches.open(name), keys = await c.keys();
  for (let i = 0; i < keys.length - max; i++) await c.delete(keys[i]);
}
function put(name, req, res, max) {
  if (!res || !res.ok || res.type !== 'basic') return;
  const copy = res.clone();
  caches.open(name).then(c => c.put(req, copy)).then(() => trim(name, max));
}
const timeout = (ms) => new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms));

/* Pages: network first (fresh after every deploy), cached copy when offline, then the offline page. */
async function page(e) {
  const req = e.request;
  try {
    const res = await Promise.race([fetch(req), timeout(6000)]);
    put(PAGES, req, res, MAX_PAGES);
    return res;
  } catch (err) {
    const hit = (await (await caches.open(PAGES)).match(req, {ignoreSearch: true})) || (await caches.match(req, {ignoreSearch: true}));
    return hit || caches.match('/offline.html');
  }
}
/* CSS, JS and data: network first so a deploy never shows stale styles or scripts; cache is the offline fallback. */
async function fresh(e) {
  try {
    const res = await fetch(e.request);
    put(ASSETS, e.request, res, MAX_ASSETS);
    return res;
  } catch (err) {
    return (await caches.match(e.request)) || (await caches.match(e.request, {ignoreSearch: true})) || Response.error();
  }
}
/* Images and fonts: cache first (they don't change in place), refreshed in the background. */
async function image(e) {
  const hit = await caches.match(e.request);
  const net = fetch(e.request).then(res => { put(IMAGES, e.request, res, MAX_IMAGES); return res; }).catch(() => null);
  if (hit) { e.waitUntil(net); return hit; }
  return (await net) || Response.error();
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;                       // never touch form posts (Web3Forms etc.)
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;         // GoatCounter, EchoThread, fonts, maps: straight to network
  if (url.pathname === '/sw.js' || url.pathname.startsWith('/count')) return;
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) return e.respondWith(page(e));
  if (/\.(css|js|json|xml|webmanifest)$/.test(url.pathname)) return e.respondWith(fresh(e));
  if (/\.(webp|jpe?g|png|gif|svg|ico|avif|woff2?|ttf)$/.test(url.pathname)) return e.respondWith(image(e));
});
