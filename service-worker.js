const CACHE_NAME = "studymate-v13";

const FILES_TO_CACHE = [
  "./",
  "index.html",
  "style.css",
  "main.js",
  "manifest.json",
  "privacy.html",

  "icon-192.png",
  "icon-512.png",

  "notification.mp3",

  "calm.mp3",
  "sky.mp3",
  "dream.mp3",
  "storm.mp3",
  "ocean.mp3",
  "piano.mp3",
  "space.mp3",
  "silent.mp3"
];


// INSTALL
self.addEventListener("install", (event) => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {

      for (const file of FILES_TO_CACHE) {
        try {
          await cache.add(file);
          console.log("Cached:", file);
        } catch (err) {
          console.error("Failed to cache:", file, err);
        }
      }

    })
  );

});

// ACTIVATE
self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys().then(keys => {

      return Promise.all(

        keys.map(key => {

          if(key !== CACHE_NAME){
            return caches.delete(key);
          }

        })

      );

    }).then(() => self.clients.claim())

  );

});


// FETCH
self.addEventListener("fetch", event => {

  event.respondWith(

    caches.match(event.request)
    .then(response => {

      if(response){
        return response;
      }

      return fetch(event.request)
      .catch(() => {

        if(event.request.destination === "audio"){
          return caches.match("./" + event.request.url.split("/").pop());
        }

        return caches.match("index.html");

      });

    })

  );

});
