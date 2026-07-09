const CACHE_NAME = "studymate-v4-release";

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
"music/calm.mp3",
"music/dream.mp3",
"music/sky.mp3",
"music/storm.mp3",
"music/piano.mp3",
"music/ocean.mp3",
"music/space.mp3",
"music/silent.mp3"

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
