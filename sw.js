//asignar nombre y version de cache
const CACHE_NAME = 'v1_cache_angel_toapanta_pwa';

//ficheros a cachear en la aplicacion
var urlsToCache = [
    './',
    './css/styles.css',
    './img/favicon.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png',
    './img/favicon-1024.png',
    './img/favicon-512.png',
    './img/favicon-384.png.png',
    './img/favicon-256.png',
    './img/favicon-192.png',
    './img/favicon-128.png',
    './img/favicon-96.png',
    './img/favicon-64.png',
    './img/favicon-32.png',
    './img/favicon-16.png'     
];
//Evento install para instalar la aplicacion del sw y guardar en cache los recursos staticos
self.addEventListener('install', e => {
    e.waitUntil(
        cache.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                .then(() => {
                    self.skipWaiting();
                });
                
            })
            .catch(err => console.log('No se ha registrado el cache', err))
            
    );
});


//Evento activate para activar la aplicacio que la app funcione sin conexión
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    
                    if(cacheWhitelist.indexOf(cacheName) === -1){
                        //borrar elementos que no se necesitan
                        return caches.delete(cacheName);
                    }
                })            
            );
        })
        .then(() => {
            //Activa cache en el dispositivo
            self.clients.claim();
        })
    );
});



//Evento fetch consigue toda la informacion de internet y le cachea recupera datos de url

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if(res){
                    //devuelvo datos de cache
                    return res;
                }
                return fetch(e.request);
            })
    );
})
