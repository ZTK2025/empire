// sw.js - Service Worker MEJORADO
self.addEventListener('install', function(event) {
  console.log('🎯 Service Worker instalado');
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('🎯 Service Worker activado');
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  const url = event.request.url;
  
  // Interceptar SPECÍFICAMENTE 127.0.0.1record_stats.php
  if (url.includes('127.0.0.1record_stats.php')) {
    console.log('🔄 Service Worker interceptando 127.0.0.1record_stats.php');
    
    // Para peticiones POST, crear una respuesta vacía exitosa
    const mockResponse = new Response('', {
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
    
    event.respondWith(mockResponse);
    return;
  }
  
  // Para otras peticiones, continuar normalmente
  event.respondWith(fetch(event.request));
});
