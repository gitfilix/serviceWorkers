if ('serviceWorker' in navigator) {
    console.log('serviceWorker is supported');
    navigator.serviceWorker
        .register('./service-worker.js', { scope: './'})
        //registration
        .then(function(registration) {
            console.log("serviceWorker: Registred", registration);
        })
        .catch(function(err) {
            console.log("service Worker failed to register", err);
        })

}
