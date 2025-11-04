// sw.js - Service Worker para interceptar peticiones
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
  
  // Interceptar record_stats.php
  if (url.includes('record_stats.php')) {
    console.log('🔄 Service Worker interceptando:', url);
    
    // Crear respuesta simulada
    const mockResponse = new Response(
      JSON.stringify({
        status: 'success',
        message: 'Stats recorded via Service Worker',
        timestamp: Date.now()
      }), {
        status: 200,
        statusText: 'OK',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
    
    event.respondWith(mockResponse);
    return;
  }
  
  // Interceptar 127.0.0.1record_stats.php específicamente
  if (url.includes('127.0.0.1record_stats.php')) {
    console.log('🔄 Service Worker interceptando 127.0.0.1record_stats.php');
    
    const mockResponse = new Response(
      JSON.stringify({
        status: 'success', 
        message: '127.0.0.1 stats recorded',
        timestamp: Date.now()
      }), {
        status: 200,
        statusText: 'OK',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
    
    event.respondWith(mockResponse);
    return;
  }
  
  // Para otras peticiones, continuar normalmente
  event.respondWith(fetch(event.request));
});