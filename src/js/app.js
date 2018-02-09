if ('serviceWorker' in navigator) {
    console.log('App.js: serviceWorker are supported');

    navigator.serviceWorker
        .register('./service-worker.js', { scope: './'})
        .then(function(registration) {
            console.log('app: serviceWorker is registereded', registration);
        })
        .catch(function(err) {
            console.log("ServiceWorker failed to registrer:", err);
        })
}




// Function to perform HTTP request
var get = function(url) {
  return new Promise(function(resolve, reject) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var result = xhr.responseText
                result = JSON.parse(result);
                resolve(result);
            } else {
                reject(xhr);
            }
        }
    };

    xhr.open("GET", url, true);
    xhr.send();

  });
};

get('https://api.nasa.gov/planetary/earth/imagery?api_key=fWfSMcDzyHfMuH3BW6jiIUBYaj3hKRyKBRTBqgEQ')
  .then(function(response) {
    // There is an issue with the image being pulled from the API, so using a different one instead
    document.getElementsByClassName('targetImage')[0].src = "https://api.nasa.gov/images/earth.png";

  })
  .catch(function(err) {
    console.log("Error", err);
  })
