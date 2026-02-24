// Service Worker for caching blob storage images
const CACHE_NAME = 'solidsteel-blob-cache-v1';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

// URLs to cache
const urlsToCache = [
  '/placeholder.svg',
  '/images/logo.png',
  '/images/hero-bg.jpg',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching static assets');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - implement caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Only cache GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Handle blob storage images and API proxy
  if (url.pathname.includes('/api/blob-proxy') || url.hostname.includes('blob.vercel-storage.com')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
          // Check if cache is still fresh
          const cachedDate = new Date(cachedResponse.headers.get('date'));
          const now = new Date();
          const age = now - cachedDate;
          
          if (age < CACHE_DURATION) {
            console.log('Service Worker: Serving from cache:', request.url);
            return cachedResponse;
          }
        }
        
        // Try to fetch from network
        try {
          const networkResponse = await fetch(request);
          
          // Cache successful responses
          if (networkResponse.ok) {
            const responseToCache = networkResponse.clone();
            cache.put(request, responseToCache);
            console.log('Service Worker: Cached new response:', request.url);
          }
          
          return networkResponse;
        } catch (error) {
          console.error('Service Worker: Fetch failed, trying cache:', error);
          
          // If network fails, try cache again (even if expired)
          if (cachedResponse) {
            console.log('Service Worker: Network failed, serving stale cache:', request.url);
            return cachedResponse;
          }
          
          // If no cache and network fails, return fallback
          if (request.destination === 'image') {
            console.log('Service Worker: Returning fallback image');
            return caches.match('/placeholder.svg');
          }
          
          throw error;
        }
      })
    );
    return;
  }
  
  // For other requests, use network-first strategy
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request);
    })
  );
});