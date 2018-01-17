var cacheName = 'v1';
var cacheFiles = [
    './',
    './index.html',
    './src/css/style.css',
    './src/js/app.js'
]


// Tha Worker

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Installed');

    // e.waitUntil Delays the event until the Promise is resolved
    e.waitUntil(

    	// Open the cache
	    caches.open(cacheName).then(function(cache) {

	    	// Add all the default files to the cache
			console.log('[ServiceWorker] Caching cacheFiles');
			return cache.addAll(cacheFiles);
	    })
	); // end e.waitUntil
});

self.addEventListener('activate', function(e) {
    console.log("[serviceWorker] activated");

    e.waitUntil(

        caches.keys().then(function(cacheName) {
            return Promise.all(cacheNames.map(function(thisCacheName) {
                if (thisCacheName !== cacheName) {

                    console.log("[serviceWorker] Removing Chched files from ",thisCacheName);
                    return chaches.delete(thisCacheName);
                }
            }));
        })
    ); // end waitUntil
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activated');

    e.waitUntil(

    	// Get all the cache keys (cacheName)
		caches.keys().then(function(cacheNames) {
			return Promise.all(cacheNames.map(function(thisCacheName) {

				// If a cached item is saved under a previous cacheName
				if (thisCacheName !== cacheName) {

					// Delete that cached file
					console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
					return caches.delete(thisCacheName);
				}
			}));
		})
	); // end e.waitUntil

});
