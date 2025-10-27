// flash.js modificado para GitHub Pages y Firebase
import { getDatabase, ref, set } from "firebase/database";
import { app } from "./firebaseConfig.js"; // tu archivo con initializeApp

const database = getDatabase(app);

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
            '<b>Flash is not enabled.</b><br>Please, enable flash and <a href="javascript:document.location.reload()">refresh</a>.';
        // if (document.getElementById("flash_enabler")) document.getElementById("flash_enabler").style.display = "block";

        // Guardar evento en Firebase
        const eventId = "flash_disabled_" + Date.now();
        set(ref(database, 'events/' + eventId), {
            type: "flash_disabled",
            timestamp: Date.now()
        }).catch(e => console.error(e));

    } else {
        if (loadingMessage) loadingMessage.innerHTML = 'Loading game...';
        if (progressBar) progressBar.style.width = "10%";

        // Guardar evento de inicio de carga
        const eventId = "loading_started_" + Date.now();
        set(ref(database, 'events/' + eventId), {
            type: "loading_started",
            timestamp: Date.now()
        }).catch(e => console.error(e));
    }
}

// ---------------- Ejecutar al cargar la página ----------------
window.addEventListener("load", () => {
    loadingScreenUpdate();
});
