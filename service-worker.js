/* =================================
   STUDYMATE SERVICE WORKER (DEV)
================================= */


const CACHE_NAME = "studymate-dev-cache-1.0";


const FILES_TO_CACHE = [

    "./",
    "index.html",
    "style.css",
    "main.js",
    "ai.js",
    "auth.html",
    "auth.js",
    "firebase.js",
    "manifest.json",
    "privacy.html",

    "icon-192.png",
    "icon-512.png",

    "notification.mp3",
    "reminder.mp3",

    "calm.mp3",
    "sky.mp3",
    "dream.mp3",
    "storm.mp3",
    "ocean.mp3",
    "piano.mp3",
    "space.mp3",
    "silent.mp3"

];



/* ==========================
   INSTALL
========================== */

self.addEventListener(
"install",
event=>{

    console.log(
        "StudyMate SW installing..."
    );


    self.skipWaiting();


    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(cache=>{

            return cache.addAll(
                FILES_TO_CACHE
            );

        })

    );

});



/* ==========================
   ACTIVATE
========================== */

self.addEventListener(
"activate",
event=>{


    console.log(
        "StudyMate SW activated"
    );


    event.waitUntil(

        self.clients.claim()

    );

});



/* ==========================
   FETCH
   NETWORK FIRST
========================== */

self.addEventListener(
"fetch",
event=>{


    if(
        event.request.method !== "GET"
    )
    return;



    event.respondWith(


        fetch(event.request)

        .then(response=>{


            const copy =
            response.clone();



            caches.open(CACHE_NAME)

            .then(cache=>{

                cache.put(
                    event.request,
                    copy
                );

            });



            return response;


        })


        .catch(()=>{


            return caches.match(
                event.request
            );


        })


    );


});



/* ==========================
   PUSH NOTIFICATION
========================== */

self.addEventListener(
"push",
event=>{


let data={

title:"📚 Study Reminder",

body:"It's time to study!"

};


if(event.data){

data=event.data.json();

}


event.waitUntil(


self.registration.showNotification(

data.title,

{

body:data.body,

icon:"icon-192.png",

badge:"icon-192.png",

tag:"study-reminder",

vibrate:[300,200,300],

requireInteraction:true

}


)

);


});



/* ==========================
   NOTIFICATION CLICK
========================== */

self.addEventListener(
"notificationclick",
event=>{


event.notification.close();



event.waitUntil(


clients.matchAll({

type:"window",

includeUncontrolled:true

})


.then(clientsList=>{


for(
const client of clientsList
){


if("focus" in client){

return client.focus();

}


}



return clients.openWindow("./");


})


);


});