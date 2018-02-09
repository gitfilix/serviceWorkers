

var cacheName = 'v3';
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


// activate!
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

// fetching
self.addEventListener('fetch', function(e) {
    console.log("[ServiceWorker:] Fetching", e.request.url);

    e.respondWith(
        caches.match(e.request).then(function(response) {

            if (response) {
                console.log("[ServiceWorker:] Found in cache:", e.request.url);
                return response;
            }

            // if
            var requestClone = e.request.clone();
            fetch(requestClone)
                .then(function(response) {

                    if(!response) {
                        console.log("[ServiceWorker:] no response from fetch");
                        return response;
                    }

                    var responseClone = response.clone();

                    caches.open(cacheName).then(function(cache) {
                        cache.put(e.request, responseClone);
                        return response;

                    });
                })
                .catch(function(err) {
                    console.log("[ServiceWorker:] Error Fetching & chaching");
                })

        })
    )
});
