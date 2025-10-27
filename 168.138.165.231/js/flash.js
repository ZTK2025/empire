import { getDatabase, ref, set } from "firebase/database";
import { app } from "./firebaseConfig.js"; // tu archivo con initializeApp

const database = getDatabase(app);

// ---------------- Flash y Loading ----------------
function isFlashEnabled() {
    var flash = false;
    try {
        var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if(fo) flash = true;
    } catch (e) {
        if (navigator.mimeTypes && navigator.mimeTypes['application/x-shockwave-flash'] != undefined &&
            navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
            flash = true;
        }
    }
    return flash;
}

function loadingScreenUpdate() {
    if (!isFlashEnabled()) {
        document.getElementById("loading_gif").style.display = "none";
        document.getElementById("loading_message").innerHTML= 
            '<b>Flash is not enabled.</b><br>Please, enable flash and <a href="javascript: document.location.reload()">refresh</a>.';
        //document.getElementById("flash_enabler").style.display = "block";

        // Guardar evento en Firebase
        const eventId = "flash_disabled_" + Date.now();
        set(ref(database, 'events/' + eventId), {
            type: "flash_disabled",
            timestamp: Date.now()
        });

    } else {
        document.getElementById("loading_message").innerHTML = 'Loading game...';
        document.getElementById("inner_progress_bar").style.width = "10%";

        // Guardar evento de inicio de carga
        const eventId = "loading_started_" + Date.now();
        set(ref(database, 'events/' + eventId), {
            type: "loading_started",
            timestamp: Date.now()
        });
    }
}

// ---------------- Opcional ----------------
// Llamar la función cada cierto tiempo o al cargar la página
// window.onload = loadingScreenUpdate;
