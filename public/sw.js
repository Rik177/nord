const CACHE_NAME = "nordengineering-v1";
const STATIC_CACHE_URLS = [
  "/",
  "/static/js/bundle.js",
  "/static/css/main.css",
  "/favicon.ico",
  "/logo.png",
];

const RUNTIME_CACHE = "runtime-cache-v1";

// Install Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        return self.skipWaiting();
      }),
  );
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => {
        return self.clients.claim();
      }),
  );
});

// Fetch Event - Cache Strategy
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle requests from the same origin
  if (url.origin !== location.origin) {
    return;
  }

  // Different strategies for different types of requests
  if (request.mode === "navigate") {
    // Network First for navigation (HTML pages)
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || caches.match("/");
          });
        }),
    );
  } else if (request.destination === "image") {
    // Cache First for images
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((response) => {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        });
      }),
    );
  } else if (
    request.destination === "script" ||
    request.destination === "style"
  ) {
    // Stale While Revalidate for CSS/JS
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request).then((response) => {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        });

        return cachedResponse || fetchPromise;
      }),
    );
  } else {
    // Network First for other requests
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request);
        }),
    );
  }
});

// Background Sync for form submissions
self.addEventListener("sync", (event) => {
  if (event.tag === "contact-form") {
    event.waitUntil(
      // Handle offline form submissions
      sendPendingContactForms(),
    );
  }
});

async function sendPendingContactForms() {
  // Implementation for handling offline form submissions
  const formData = await getStoredFormData();
  if (formData && formData.length > 0) {
    for (const form of formData) {
      try {
        await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        await removeStoredFormData(form.id);
      } catch (error) {
        console.log("Failed to send form data:", error);
      }
    }
  }
}

async function getStoredFormData() {
  // Get stored form data from IndexedDB
  return [];
}

async function removeStoredFormData(id) {
  // Remove sent form data from IndexedDB
  return Promise.resolve();
}

// Push notification handling
self.addEventListener("push", (event) => {
  const options = {
    body: event.data
      ? event.data.text()
      : "Новое уведомление от НОРДИНЖИНИРИНГ",
    icon: "/icon-192.png",
    badge: "/badge-72.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "Перейти на сайт",
        icon: "/icon-action.png",
      },
      {
        action: "close",
        title: "Закрыть",
        icon: "/icon-close.png",
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification("НОРДИНЖИНИРИНГ", options),
  );
});

// Notification click handling
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/"));
  }
});
