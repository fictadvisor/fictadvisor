const CACHE_NAME = 'cacheV1';

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    event.respondWith(fetch(event.request));
    return;
  }

  if (
    event.request.url.includes('/login') ||
    event.request.url.includes('/register') ||
    event.request.url.includes('/account') ||
    event.request.url.includes('/v2/auth/me')
  ) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches
      .match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(event.request).then(response => {
          if (response.status === 404) {
            return caches.open(CACHE_NAME).then(cache => {
              return cache.match('404.html');
            });
          }

          if (new URL(event.request.url).protocol === 'chrome-extension:') {
            return response;
          }

          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request.url, response.clone());
            return response;
          });
        });
      })
      .catch(async error => {
        console.log('Error, ', error);
        return caches.open(CACHE_NAME).then(cache => {
          return cache.match('offline.html');
        });
      }),
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
  event.waitUntil(clients.claim());
});
