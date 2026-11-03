// Cache offline restrito a arquivos públicos; nunca guarda respostas pessoais, de login ou pagamento.
const CACHE_NAME = "sabe-mais-v2";
const APP_SHELL = ["/manifest.webmanifest", "/icons/sabe-mais.svg", "/favicon.ico"];
const STATIC = /\.(?:js|css|svg|png|jpg|jpeg|webp|woff2?|ico)$/i;

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || !STATIC.test(url.pathname) || url.pathname.startsWith("/api/") || url.pathname.startsWith("/_serverFn")) return;
  event.respondWith(
    fetch(req)
      .then((response) => {
        if (response.ok && response.type === "basic") {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        }
        return response;
      })
      .catch(() => caches.match(req))
  );
});
