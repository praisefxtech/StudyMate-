const CACHE_NAME = "studymate-v7";

const FILES_TO_CACHE = [

"index.html",
"main.js",
"style.css",
"manifest.json",

"icon-192.png",
"icon-512.png",


// notification sound
"notification.mp3",


// focus music
"calm.mp3",
"dream.mp3",
"sky.mp3",
"storm.mp3",
"piano.mp3",
"ocean.mp3",
"space.mp3",
"silent.mp3"

];


self.addEventListener("install", (event) => {

    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );

});


self.addEventListener("activate", (event) => {

    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );

});


self.addEventListener("fetch", function(event){

    event.respondWith(

        caches.match(event.request)
        .then(function(response){

            return response || fetch(event.request);

        })

    );

});
