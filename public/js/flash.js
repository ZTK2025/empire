// flash.js REPARADO - compatible con Netlify
// ---------------- Flash y Loading ----------------
function isFlashEnabled() {
    let flash = false;
    try {
        // Para Internet Explorer
        const fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if (fo) flash = true;
    } catch (e) {
        // Para navegadores modernos
        if (navigator.mimeTypes && navigator.mimeTypes['application/x-shockwave-flash'] !== undefined &&
            navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
            flash = true;
        }
    }
    return flash;
}

function loadingScreenUpdate() {
    const loadingGif = document.getElementById("loading_gif");
    const loadingMessage = document.getElementById("loading_message");
    const progressBar = document.getElementById("inner_progress_bar");

    if (!isFlashEnabled()) {
        if (loadingGif) loadingGif.style.display = "none";
        if (loadingMessage) loadingMessage.innerHTML =
            '<b>Flash no está habilitado.</b><br>Por favor, habilita Flash y <a href="javascript:document.location.reload()">recarga la página</a>.';
        
        // Guardar evento localmente
        const events = JSON.parse(localStorage.getItem('empire_events') || '[]');
        events.push({
            type: "flash_disabled",
            timestamp: Date.now(),
            message: "Flash no detectado"
        });
        localStorage.setItem('empire_events', JSON.stringify(events));
        
        console.log("Flash no habilitado - evento guardado localmente");

    } else {
        if (loadingMessage) loadingMessage.innerHTML = 'Cargando juego...';
        if (progressBar) progressBar.style.width = "10%";

        // Guardar evento de inicio de carga localmente
        const events = JSON.parse(localStorage.getItem('empire_events') || '[]');
        events.push({
            type: "loading_started", 
            timestamp: Date.now(),
            message: "Inicio de carga detectado"
        });
        localStorage.setItem('empire_events', JSON.stringify(events));
        
        console.log("Flash habilitado - inicio de carga registrado");
        
        // Continuar con la secuencia de carga
        setTimeout(() => {
            if (typeof inner_getUserInfo === 'function') {
                inner_getUserInfo();
            }
        }, 1000);
    }
}

// Función para obtener eventos guardados (útil para debug)
function getStoredEvents() {
    const events = JSON.parse(localStorage.getItem('empire_events') || '[]');
    console.log("Eventos almacenados:", events);
    return events;
}

// Función para limpiar eventos antiguos
function cleanupOldEvents() {
    const events = JSON.parse(localStorage.getItem('empire_events') || '[]');
    const now = Date.now();
    const oneDayAgo = now - (24 * 60 * 60 * 1000); // 24 horas
    
    const recentEvents = events.filter(event => event.timestamp > oneDayAgo);
    localStorage.setItem('empire_events', JSON.stringify(recentEvents));
    console.log("Eventos limpiados. Quedan:", recentEvents.length);
}

// ---------------- Ejecutar al cargar la página ----------------
document.addEventListener("DOMContentLoaded", () => {
    console.log("Flash.js inicializado");
    
    // Limpiar eventos antiguos
    cleanupOldEvents();
    
    // Iniciar detección de Flash
    setTimeout(loadingScreenUpdate, 500);
});

// Hacer funciones globales para compatibilidad
window.loadingScreenUpdate = loadingScreenUpdate;
window.isFlashEnabled = isFlashEnabled;
window.getStoredEvents = getStoredEvents;