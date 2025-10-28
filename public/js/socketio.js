// socketio.js REPARADO - compatible con Netlify
// ---------------- Sistema de logs local ----------------

// Almacenar logs en localStorage
function logEvent(type, msg) {
    const logEntry = {
        type: type,
        message: msg,
        timestamp: Date.now()
    };
    
    // Guardar en localStorage
    const logs = JSON.parse(localStorage.getItem('empire_logs') || '[]');
    logs.push(logEntry);
    localStorage.setItem('empire_logs', JSON.stringify(logs));
    
    // Mostrar en consola
    console.log(`[${type}]`, msg);
    
    // Mostrar en la interfaz si existe el contenedor
    updateLogDisplay(type, msg);
}

// Actualizar la visualización de logs en la página
function updateLogDisplay(type, msg) {
    const container = document.getElementById(type + '_log');
    if (container) {
        const div = document.createElement('div');
        div.innerHTML = `<span style="color: #666;">[${new Date().toLocaleTimeString()}]</span> ${msg}`;
        div.style.padding = '2px 5px';
        div.style.borderBottom = '1px solid #eee';
        container.prepend(div);
        container.scrollTop = 0;
        
        // Limitar a 50 entradas máximo
        if (container.children.length > 50) {
            container.removeChild(container.lastChild);
        }
    }
}

// Simular 'connect'
console.log("Sistema de logs inicializado");

// Simular 'delete_save' click
document.addEventListener('DOMContentLoaded', function() {
    const deleteBtn = document.getElementById('delete_save');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function(event) {
            console.log('Eliminando partida guardada');
            logEvent('delete_save', "Eliminando partida guardada");

            console.log('Eliminando cookie de sesión');
            document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            
            // También limpiar localStorage relacionado
            localStorage.removeItem('empire_session');
            logEvent('system', "Sesión y datos locales limpiados");
        });
    }
});

// Función para simular logs (compatibilidad)
function simulateLog(type, msg) {
    logEvent(type, msg);
}

// Función para obtener todos los logs
function getAllLogs() {
    const logs = JSON.parse(localStorage.getItem('empire_logs') || '[]');
    console.log("Logs almacenados:", logs);
    return logs;
}

// Función para limpiar logs antiguos (más de 1 día)
function cleanupOldLogs() {
    const logs = JSON.parse(localStorage.getItem('empire_logs') || '[]');
    const now = Date.now();
    const oneDayAgo = now - (24 * 60 * 60 * 1000);
    
    const recentLogs = logs.filter(log => log.timestamp > oneDayAgo);
    localStorage.setItem('empire_logs', JSON.stringify(recentLogs));
    console.log(`Logs limpiados. Quedan ${recentLogs.length} entradas recientes.`);
}

// Función para exportar logs (útil para debug)
function exportLogs() {
    const logs = getAllLogs();
    const logText = logs.map(log => 
        `[${new Date(log.timestamp).toLocaleString()}] ${log.type}: ${log.message}`
    ).join('\n');
    
    console.log("Logs exportados:\n" + logText);
    return logText;
}

// Inicializar sistema de logs
document.addEventListener('DOMContentLoaded', function() {
    console.log("SocketIO.js (local) inicializado");
    
    // Limpiar logs antiguos al iniciar
    cleanupOldLogs();
    
    // Log de inicio
    logEvent('system', 'Sistema de logs local iniciado');
    logEvent('connection', 'Conectado al juego Empire and Allies');
    
    // Inicializar contenedores de log si existen
    initializeLogContainers();
});

// Inicializar contenedores de log en la interfaz
function initializeLogContainers() {
    const logTypes = ['tutorial_step', 'world_log', 'other_log'];
    
    logTypes.forEach(type => {
        const container = document.getElementById(type + '_log');
        if (container) {
            // Estilo básico para contenedores de log
            container.style.height = '150px';
            container.style.overflowY = 'auto';
            container.style.border = '1px solid #ccc';
            container.style.padding = '5px';
            container.style.fontFamily = 'monospace';
            container.style.fontSize = '12px';
            container.style.backgroundColor = '#f9f9f9';
            
            // Mensaje inicial
            const initialMsg = document.createElement('div');
            initialMsg.innerHTML = `Sistema de ${type} listo - ${new Date().toLocaleTimeString()}`;
            initialMsg.style.color = '#666';
            initialMsg.style.fontStyle = 'italic';
            container.appendChild(initialMsg);
        }
    });
}

// Hacer funciones globales para compatibilidad
window.logEvent = logEvent;
window.simulateLog = simulateLog;
window.getAllLogs = getAllLogs;
window.exportLogs = exportLogs;