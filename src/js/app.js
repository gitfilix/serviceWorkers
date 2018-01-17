if ('serviceWorker' in navigator) {
    console.log('App.js: serviceWorker are supported');
    navigator.serviceWorker
        .register('./service-worker.js', { scope: './'})
        //registration
        .then(function(registration) {
            console.log("App: serviceWorker: Registred", registration);
        })
        .catch(function(err) {
            console.log("service Worker failed to register", err);
        })

}
