
const CACHE_NAME = 'school-schedule-v4';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/index.js',
  '/App.js',
  '/constants.js',
  '/hooks/useCurrentTime.js',
  '/components/Schedule.js',
  '/components/ScheduleCell.js',
  '/components/ViewSwitcher.js',
  '/components/views/TableView.js',
  '/components/views/ListView.js',
  '/components/Controls.js',
  '/components/FilterModal.js',
  '/components/NextClassNotifier.js'
];

// On install, cache the app shell
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching app shell');
        return cache.addAll(URLS_TO_CACHE);
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
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
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

// Use a "Stale-While-Revalidate" strategy for all requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          // If we got a valid response, update the cache
          if (networkResponse && networkResponse.ok) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(err => {
            console.log('Service Worker: Fetch failed; returning offline page instead.', err);
            // Optionally, return a custom offline fallback page here
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