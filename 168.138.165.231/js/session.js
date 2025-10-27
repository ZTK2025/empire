import { getDatabase, ref, set } from "firebase/database";
import { app } from "./firebaseConfig.js"; // tu archivo con initializeApp

const database = getDatabase(app);

// ---------------- Sesión / Login ----------------

function saveSession(userId, sessionId) {
    set(ref(database, 'sessions/' + userId), {
        sessionId: sessionId,
        timestamp: Date.now()
    });
}

function logout() {
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log("Logout. Session cookie eaten");

    // Guardar evento en Firebase
    const eventId = "logout_" + Date.now();
    set(ref(database, 'events/' + eventId), {
        type: "logout",
        timestamp: Date.now()
    });

    location.href = "/login.html";
}

function newPlayer() {
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log("Go to New Player. Session cookie eaten");

    const eventId = "newPlayer_" + Date.now();
    set(ref(database, 'events/' + eventId), {
        type: "new_player",
        timestamp: Date.now()
    });

    location.href = "/new.html";
}

function cleanHome() {
    document.cookie= "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log("Go home with no cookies. Session cookie eaten");

    const eventId = "cleanHome_" + Date.now();
    set(ref(database, 'events/' + eventId), {
        type: "clean_home",
        timestamp: Date.now()
    });

    location.href = "/home.html";
}

function login(sessionId) {
    console.log("Change Session. sessionId = " + sessionId);
    const cookieValue = sessionId.replace(":", "=") + "; max-age=" + (60 * 60 * 24 * 365 * 2);
    console.log(cookieValue);
    document.cookie = cookieValue;

    // Guardar sesión en Firebase
    saveSession("user123", sessionId); // reemplaza user123 por login real

    location.href = "/home.html";
}

function changeSession(sessionId) { // cookieCrumble
    console.log("Change Session. sessionId = " + sessionId);
    const cookieValue = sessionId.replace(":", "=") + "; max-age=" + (60 * 60 * 24 * 365 * 2);
    document.cookie = cookieValue;

    // Guardar sesión en Firebase
    saveSession("user123", sessionId); // reemplaza user123 por login real

    location.reload();
}
