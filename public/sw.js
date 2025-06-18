// const CACHE_NAME = "nordengineering-v2";
// const STATIC_CACHE_URLS = [
//   "/",
//   "/manifest.json",
//   "/offline.html",
// ];

// const RUNTIME_CACHE = "runtime-cache-v2";
// const IMAGE_CACHE = "image-cache-v2";
// const FONT_CACHE = "font-cache-v2";

// // Install Service Worker
// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches
//       .open(CACHE_NAME)
//       .then((cache) => {
//         return cache.addAll(STATIC_CACHE_URLS);
//       })
//       .then(() => {
//         return self.skipWaiting();
//       }),
//   );
// });

// // Activate Service Worker
// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     caches
//       .keys()
//       .then((cacheNames) => {
//         return Promise.all(
//           cacheNames.map((cacheName) => {
//             if (![CACHE_NAME, RUNTIME_CACHE, IMAGE_CACHE, FONT_CACHE].includes(cacheName)) {
//               return caches.delete(cacheName);
//             }
//           }),
//         );
//       })
//       .then(() => {
//         return self.clients.claim();
//       }),
//   );
// });

// // Fetch Event - Advanced Caching Strategy
// self.addEventListener("fetch", (event) => {
//   const { request } = event;
//   const url = new URL(request.url);

//   // Only handle requests from the same origin or allowed external domains
//   // if (url.origin !== location.origin && 
//   //     !url.hostname.includes('pexels.com') && 
//   //     !url.hostname.includes('fonts.googleapis.com') &&
//   //     !url.hostname.includes('fonts.gstatic.com')) {
//   //   return;
//   // }

//   // Font caching strategy
//   if (request.destination === 'font' || url.pathname.includes('.woff')) {
//     event.respondWith(
//       caches.open(FONT_CACHE).then(cache => {
//         return cache.match(request).then(response => {
//           if (response) {
//             return response;
//           }
//           return fetch(request).then(fetchResponse => {
//             cache.put(request, fetchResponse.clone());
//             return fetchResponse;
//           });
//         });
//       })
//     );
//     return;
//   }

//   // Image caching strategy
//   if (request.destination === 'image' || url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
//     event.respondWith(
//       caches.open(IMAGE_CACHE).then(cache => {
//         return cache.match(request).then(response => {
//           if (response) {
//             return response;
//           }
//           return fetch(request).then(fetchResponse => {
//             // Only cache successful responses
//             if (fetchResponse.status === 200) {
//               cache.put(request, fetchResponse.clone());
//             }
//             return fetchResponse;
//           }).catch(() => {
//             // Return a fallback image if available
//             return cache.match('/images/placeholder.jpg');
//           });
//         });
//       })
//     );
//     return;
//   }

//   // Navigation requests (HTML pages)
//   if (request.mode === 'navigate') {
//     event.respondWith(
//       fetch(request)
//         .then((response) => {
//           const responseClone = response.clone();
//           caches.open(RUNTIME_CACHE).then((cache) => {
//             cache.put(request, responseClone);
//           });
//           return response;
//         })
//         .catch(() => {
//           return caches.match(request).then((cachedResponse) => {
//             return cachedResponse || caches.match('/offline.html');
//           });
//         }),
//     );
//     return;
//   }

//   // CSS and JS files - Cache First with Network Fallback
//   if (request.destination === 'script' || 
//       request.destination === 'style' ||
//       url.pathname.includes('.css') ||
//       url.pathname.includes('.js')) {
//     event.respondWith(
//       caches.open(RUNTIME_CACHE).then(cache => {
//         return cache.match(request).then(response => {
//           if (response) {
//             // Serve from cache and update in background
//             fetch(request).then(fetchResponse => {
//               if (fetchResponse.status === 200) {
//                 cache.put(request, fetchResponse.clone());
//               }
//             }).catch(() => {});
//             return response;
//           }
          
//           return fetch(request).then(fetchResponse => {
//             if (fetchResponse.status === 200) {
//               cache.put(request, fetchResponse.clone());
//             }
//             return fetchResponse;
//           });
//         });
//       })
//     );
//     return;
//   }

//   // API requests - Network First with Cache Fallback
//   if (url.pathname.startsWith('/api/')) {
//     event.respondWith(
//       fetch(request)
//         .then((response) => {
//           if (response.status === 200) {
//             const responseClone = response.clone();
//             caches.open(RUNTIME_CACHE).then((cache) => {
//               cache.put(request, responseClone);
//             });
//           }
//           return response;
//         })
//         .catch(() => {
//           return caches.match(request);
//         }),
//     );
//     return;
//   }

//   // Default strategy for other requests
//   event.respondWith(
//     fetch(request)
//       .then((response) => {
//         if (response.status === 200) {
//           const responseClone = response.clone();
//           caches.open(RUNTIME_CACHE).then((cache) => {
//             cache.put(request, responseClone);
//           });
//         }
//         return response;
//       })
//       .catch(() => {
//         return caches.match(request);
//       }),
//   );
// });

// // Background Sync for form submissions
// self.addEventListener("sync", (event) => {
//   if (event.tag === "contact-form") {
//     event.waitUntil(sendPendingContactForms());
//   }
// });

// async function sendPendingContactForms() {
//   const formData = await getStoredFormData();
//   if (formData && formData.length > 0) {
//     for (const form of formData) {
//       try {
//         await fetch("/api/contact", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(form),
//         });
//         await removeStoredFormData(form.id);
//       } catch (error) {
//         console.log("Failed to send form data:", error);
//       }
//     }
//   }
// }

// async function getStoredFormData() {
//   return [];
// }

// async function removeStoredFormData(id) {
//   return Promise.resolve();
// }

// // Push notification handling
// self.addEventListener("push", (event) => {
//   const options = {
//     body: event.data
//       ? event.data.text()
//       : "Новое уведомление от НОРДИНЖИНИРИНГ",
//     icon: "/icon-192.png",
//     badge: "/badge-72.png",
//     vibrate: [100, 50, 100],
//     data: {
//       dateOfArrival: Date.now(),
//       primaryKey: 1,
//     },
//     actions: [
//       {
//         action: "explore",
//         title: "Перейти на сайт",
//         icon: "/icon-action.png",
//       },
//       {
//         action: "close",
//         title: "Закрыть",
//         icon: "/icon-close.png",
//       },
//     ],
//   };

//   event.waitUntil(
//     self.registration.showNotification("НОРДИНЖИНИРИНГ", options),
//   );
// });

// // Notification click handling
// self.addEventListener("notificationclick", (event) => {
//   event.notification.close();

//   if (event.action === "explore") {
//     event.waitUntil(clients.openWindow("/"));
//   }
// });

// // Periodic background sync for cache cleanup
// self.addEventListener("periodicsync", (event) => {
//   if (event.tag === "cache-cleanup") {
//     event.waitUntil(cleanupOldCaches());
//   }
// });

// async function cleanupOldCaches() {
//   const cacheNames = await caches.keys();
//   const oldCaches = cacheNames.filter(name => 
//     !name.includes('v2') && 
//     (name.includes('nordengineering') || name.includes('runtime') || name.includes('image'))
//   );
  
//   await Promise.all(oldCaches.map(name => caches.delete(name)));
// }