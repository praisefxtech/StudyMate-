const CACHE_NAME = "studymate-v10";

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
  "dream.mp3",
  "sky.mp3",
  "storm.mp3",
  "piano.mp3",
  "ocean.mp3",
  "space.mp3",
  "silent.mp3"
];


// INSTALL
self.addEventListener("install", event => {

  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();

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

      return response || fetch(event.request)
      .catch(() => caches.match("index.html"));

    })

  );

});
