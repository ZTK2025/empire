// socketio.js modificado para GitHub Pages y Firebase
import { getDatabase, ref, set, push } from "firebase/database";
import { app } from "./firebaseConfig.js"; // tu archivo con initializeApp

const database = getDatabase(app);

// ---------------- Simular socket.io con Firebase ----------------
// Cada evento se guardará en Firebase en lugar de socket.io

function logEvent(type, msg) {
    const newLogRef = push(ref(database, 'logs/' + type));
    set(newLogRef, {
        message: msg,
        timestamp: Date.now()
    }).catch(e => console.error("Error guardando log:", e));
}

// Simular 'connect'
console.log("Connected to Firebase logs");

// Simular 'delete_save' click
const deleteBtn = document.getElementById('delete_save');
if (deleteBtn) {
    deleteBtn.addEventListener('click', function(event) {
        console.log('deleting save');
        logEvent('delete_save', "Deleting save game");

        console.log('deleting cookie');
        document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
}

// Simular logs recibidos
function simulateLog(type, msg) {
    console.log(msg);
    logEvent(type, msg);

    const container = document.getElementById(type + '_log');
    if (container) {
        const div = document.createElement('div');
        div.innerHTML = JSON.stringify(msg);
        container.prepend(div);
        container.scrollTop = 0;
    }
}

// ---------------- Exportar la función para otros módulos ----------------
export { logEvent, simulateLog };
