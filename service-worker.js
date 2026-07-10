const CACHE_NAME = "studymate-v6";

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


self.addEventListener("install", function(event){

    event.waitUntil(

        caches.open(CACHE_NAME)
        .then(function(cache){

            return cache.addAll(FILES_TO_CACHE);

        })

    );

});


self.addEventListener("activate", function(event){

    event.waitUntil(

        caches.keys()
        .then(function(keys){

            return Promise.all(

                keys.map(function(key){

                    if(key !== CACHE_NAME){

                        return caches.delete(key);

                    }

                })

            );

        })

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
