// World Travel Odyssey (WTO) - Service Worker PWA
const CACHE_NAME = 'wto-cache-v19';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './manifest.json',
  './apple-touch-icon.png',
  './apple-touch-icon-180.png',
  './apple-touch-icon-1024.png',
  './icon-192.png',
  './icon-512.png',
  './assets/logo.png',
  './assets/characters/flight_attendant.jpg',
  './assets/videos/intro_travel_case.mp4',
  './assets/videos/intro_travel_case.webm',
  './assets/pixi.min.js',
  './assets/boosters/pack_economy.jpg',
  './assets/boosters/pack_business.jpg',
  './assets/boosters/pack_sovereign.jpg',
  './assets/backgrounds/bg_arena.jpg',
  './assets/backgrounds/bg_spire.jpg',
  './assets/backgrounds/bg_deck.jpg',
  './assets/backgrounds/bg_dutyfree.jpg',
  './assets/backgrounds/bg_codex.jpg',
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

// Install Event: Force immediate activation
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[WTO Service Worker] Caching core assets v14...');
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('[WTO Service Worker] Pre-cache non-fatal warning:', err);
      });
    })
  );
});

// Activate Event: Clear Old Caches and Claim Clients Immediately
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[WTO Service Worker] Purging legacy cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Network-First for HTML/CSS/Backgrounds, Stale-While-Revalidate for other assets
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  const url = e.request.url;
  const isCoreDocOrStyle = e.request.destination === 'document' || 
                           e.request.destination === 'style' || 
                           url.includes('styles.css') || 
                           url.includes('index.html') ||
                           url.includes('assets/backgrounds/');

  if (isCoreDocOrStyle) {
    // Network-First: Always try network to get the freshest visuals immediately
    e.respondWith(
      fetch(e.request).then((networkRes) => {
        if (networkRes && networkRes.status === 200) {
          const clone = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
        }
        return networkRes;
      }).catch(() => {
        return caches.match(e.request).then(cached => cached || (e.request.destination === 'document' ? caches.match('./index.html') : null));
      })
    );
    return;
  }

  // Cache-First with Background Update for other static assets
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        fetch(e.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(e.request, networkResponse.clone()));
          }
        }).catch(() => {});
        return cachedResponse;
      }

      return fetch(e.request).then((response) => {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, responseToCache));
        return response;
      });
    })
  );
});
