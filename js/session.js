// session.js REPARADO - compatible con Netlify
// ---------------- Sesión / Login ----------------
function saveSession(userId, sessionId) {
    // Guardar sesión en localStorage
    const sessionData = {
        userId: userId,
        sessionId: sessionId,
        timestamp: Date.now()
    };
    
    localStorage.setItem('empire_session', JSON.stringify(sessionData));
    console.log("Sesión guardada localmente:", sessionData);
    
    // También guardar en lista de sesiones
    const sessions = JSON.parse(localStorage.getItem('empire_sessions') || '{}');
    sessions[userId] = sessionData;
    localStorage.setItem('empire_sessions', JSON.stringify(sessions));
}

function getCurrentSession() {
    const sessionData = localStorage.getItem('empire_session');
    if (sessionData) {
        return JSON.parse(sessionData);
    }
    return null;
}

function logout() {
    // Limpiar cookies
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // Guardar evento de logout localmente
    const events = JSON.parse(localStorage.getItem('empire_events') || '[]');
    events.push({
        type: "logout",
        timestamp: Date.now(),
        session: getCurrentSession()
    });
    localStorage.setItem('empire_events', JSON.stringify(events));
    
    // Limpiar sesión actual
    localStorage.removeItem('empire_session');
    
    console.log("Logout completado - sesión removida");
    location.href = "login.html";
}

function newPlayer() {
    // Limpiar cookies
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // Guardar evento de nuevo jugador
    const events = JSON.parse(localStorage.getItem('empire_events') || '[]');
    events.push({
        type: "new_player",
        timestamp: Date.now()
    });
    localStorage.setItem('empire_events', JSON.stringify(events));
    
    console.log("Nuevo jugador - redirigiendo");
    location.href = "new.html";
}

function cleanHome() {
    // Limpiar cookies
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // Guardar evento
    const events = JSON.parse(localStorage.getItem('empire_events') || '[]');
    events.push({
        type: "clean_home", 
        timestamp: Date.now()
    });
    localStorage.setItem('empire_events', JSON.stringify(events));
    
    // Limpiar sesión
    localStorage.removeItem('empire_session');
    
    console.log("Home limpio - sin sesión");
    location.href = "home.html";
}

function login(sessionId) {
    console.log("Login. sessionId =", sessionId);
    
    // Crear cookie de sesión
    const cookieValue = sessionId.replace(":", "=") + "; max-age=" + (60 * 60 * 24 * 365 * 2);
    document.cookie = cookieValue;

    // Guardar sesión
    const userId = "user_" + Math.floor(Math.random() * 10000);
    saveSession(userId, sessionId);

    console.log("Login exitoso - redirigiendo a home");
    location.href = "home.html";
}

function changeSession(sessionId) {
    console.log("Cambiar Sesión. sessionId =", sessionId);
    
    // Actualizar cookie
    const cookieValue = sessionId.replace(":", "=") + "; max-age=" + (60 * 60 * 24 * 365 * 2);
    document.cookie = cookieValue;

    // Guardar nueva sesión
    const userId = "user_" + Math.floor(Math.random() * 10000);
    saveSession(userId, sessionId);

    console.log("Sesión cambiada - recargando página");
    location.reload();
}

// Función para obtener todas las sesiones guardadas
function getAllSessions() {
    const sessions = JSON.parse(localStorage.getItem('empire_sessions') || '{}');
    console.log("Sesiones guardadas:", sessions);
    return sessions;
}

// Función para cargar sesión automáticamente al iniciar
function autoLoadSession() {
    const currentSession = getCurrentSession();
    if (currentSession) {
        console.log("Sesión cargada automáticamente:", currentSession);
        return currentSession;
    } else {
        console.log("No hay sesión activa");
        return null;
    }
}

// ---------------- Inicialización ----------------
document.addEventListener("DOMContentLoaded", function() {
    console.log("Session.js inicializado");
    autoLoadSession();
});

// Hacer funciones globales para compatibilidad
window.login = login;
window.logout = logout;
window.newPlayer = newPlayer;
window.cleanHome = cleanHome;
window.changeSession = changeSession;
window.getCurrentSession = getCurrentSession;
window.getAllSessions = getAllSessions;