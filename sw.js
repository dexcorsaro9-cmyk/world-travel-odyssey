// World Travel Odyssey (WTO) - Service Worker PWA
const CACHE_NAME = 'wto-cache-v8';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon.svg',
  './assets/logo.svg',
  './assets/cards/brazil.jpg',
  './assets/cards/card_argentina_tango.jpg',
  './assets/cards/card_australia_reef.jpg',
  './assets/cards/card_australia_sydney.jpg',
  './assets/cards/card_brazil_corcovado.jpg',
  './assets/cards/card_brazil_samba.jpg',
  './assets/cards/card_canada_niagara.jpg',
  './assets/cards/card_egypt_cleopatra.jpg',
  './assets/cards/card_egypt_pyramids.jpg',
  './assets/cards/card_france_champ.jpg',
  './assets/cards/card_france_champagne.jpg',
  './assets/cards/card_france_eiffel.jpg',
  './assets/cards/card_germany_autobahn.jpg',
  './assets/cards/card_germany_brandenburg.jpg',
  './assets/cards/card_iceland_aurora.jpg',
  './assets/cards/card_iceland_geysir.jpg',
  './assets/cards/card_italy_champ.jpg',
  './assets/cards/card_italy_colosseum.jpg',
  './assets/cards/card_italy_espresso.jpg',
  './assets/cards/card_japan_champ.jpg',
  './assets/cards/card_japan_fuji.jpg',
  './assets/cards/card_japan_shinkansen.jpg',
  './assets/cards/card_korea_kpop.jpg',
  './assets/cards/card_korea_tower.jpg',
  './assets/cards/card_mexico_chichen.jpg',
  './assets/cards/card_mexico_mariachi.jpg',
  './assets/cards/card_spain_flamenco.jpg',
  './assets/cards/card_spain_sagrada.jpg',
  './assets/cards/card_swiss_banker.jpg',
  './assets/cards/card_swiss_train.jpg',
  './assets/cards/card_uk_agent.jpg',
  './assets/cards/card_uk_bigben.jpg',
  './assets/cards/card_usa_broadway.jpg',
  './assets/cards/card_usa_champ.jpg',
  './assets/cards/card_usa_wallstreet.jpg',
  './assets/cards/egypt.jpg',
  './assets/cards/france.jpg',
  './assets/cards/italy.jpg',
  './assets/cards/japan.jpg',
  './assets/cards/korea.jpg',
  './assets/cards/spell_diplomatic_pass.jpg',
  './assets/cards/spell_lastminute.jpg',
  './assets/cards/switzerland.jpg',
  './assets/cards/trap_lost_luggage.jpg',
  './assets/cards/trap_strike.jpg',
  './assets/cards/trap_visa_denied.jpg',
  './assets/cards/usa.jpg',
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
