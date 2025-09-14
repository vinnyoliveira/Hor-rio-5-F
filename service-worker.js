
const CACHE_NAME = 'school-schedule-v5'; // Bumped version
const APP_SHELL_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/index.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// On install, cache the app shell
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching app shell');
        return cache.addAll(APP_SHELL_URLS);
      })
      .then(() => {
        // Force the waiting service worker to become the active service worker.
        return self.skipWaiting();
      })
  );
});

// On activation, clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
        // Take control of all clients as soon as the SW is activated.
        return self.clients.claim();
    })
  );
});


self.addEventListener('fetch', event => {
  const { request } = event;

  // For navigation requests (e.g., loading the page), use a network-first strategy.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // If the fetch is successful, cache the response for offline use.
          if (response.ok) {
            const cacheCopy = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, cacheCopy);
            });
          }
          return response;
        })
        .catch(() => {
          // If the network fails, serve the main page from the cache.
          return caches.match('/');
        })
    );
    return;
  }

  // For other requests (JS, CSS, images, etc.), use a stale-while-revalidate strategy.
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(request).then(cachedResponse => {
        const fetchPromise = fetch(request).then(networkResponse => {
          // If the request is successful, update the cache.
          if (networkResponse && networkResponse.ok) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(err => {
            console.warn('Service Worker: Fetch failed; relying on cache.', err);
        });

        // Return the cached response immediately, while the fetch happens in the background.
        return cachedResponse || fetchPromise;
      });
    })
  );
});


// Listen for a message from the client to skip waiting
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});