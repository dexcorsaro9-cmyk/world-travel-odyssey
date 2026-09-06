// World Travel Odyssey (WTO) - Service Worker PWA
const CACHE_NAME = 'wto-cache-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon.svg',
  './assets/cards/italy.jpg',
  './assets/cards/japan.jpg',
  './assets/cards/usa.jpg',
  './assets/cards/france.jpg',
  './assets/cards/brazil.jpg',
  './assets/cards/switzerland.jpg',
  './assets/cards/egypt.jpg',
  './assets/cards/korea.jpg',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
];

// Install Event: Cache Core Assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[WTO Service Worker] Caching core assets...');
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('[WTO Service Worker] Pre-cache non-fatal error:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Clear Old Caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[WTO Service Worker] Clearing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Cache-First with Network Fallback
self.addEventListener('fetch', (e) => {
  // Solo richieste GET
  if (e.request.method !== 'GET') return;

  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch in background per aggiornare la cache
        fetch(e.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, networkResponse.clone());
            });
          }
        }).catch(() => {});
        return cachedResponse;
      }

      // Altrimenti recupera da rete e metti in cache
      return fetch(e.request).then((response) => {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, responseToCache);
        });
        return response;
      }).catch(() => {
        // Se offline e la richiesta riguarda la pagina principale
        if (e.request.destination === 'document') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
