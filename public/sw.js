const CACHE = 'bens-v1'

self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()))

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url)
  if (e.request.method !== 'GET' || url.origin !== location.origin) return

  // pages: network first, fall back to cached shell when offline
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(() => caches.match('/')))
    return
  }

  // everything else: cache first, refresh the cache quietly
  e.respondWith(
    caches.open(CACHE).then(async (c) => {
      const hit = await c.match(e.request)
      const net = fetch(e.request)
        .then((res) => {
          if (res.ok) c.put(e.request, res.clone())
          return res
        })
        .catch(() => hit)
      return hit || net
    })
  )
})