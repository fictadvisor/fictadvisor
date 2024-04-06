const CACHE_NAME = 'cache';

self.addEventListener('fetch', event => {
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
