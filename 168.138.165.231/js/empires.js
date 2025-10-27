// Importa Firebase en tu HTML antes de este JS
// <script type="module" src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js"></script>
// <script type="module" src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js"></script>
// <script type="module" src="tuArchivoModificado.js"></script>

import { getDatabase, ref, set, get, child } from "firebase/database";
import { app } from "./firebaseConfig.js"; // tu archivo con initializeApp

const database = getDatabase(app);

zynga = {
  "ads": {
    "WatchToEarn": {
      "service": {
        "available": function () {
          console.log("W2E avail");
          return false;
        },
        "initializeFlash": function (oid, a, b, c) {
          console.log("initF " + oid + ", " + a + ", " + b + ", " + c);
          return false;
        }
      }
    }
  }
}

statTracker = {
  "logWorldObjectCount": function () {
    console.log("World Count");
    return;
  }
}

ZYFrameManager = {
  "reloadApp": function () {
    console.log("Reload App");
    window.location.reload();
    return;
  },
  "navigateTo": function (a, b, c) {
    console.log("Navigate To " + a + " - " + b + " - " + c);
    return;
  },
  "openTab": function (a, b, c) {
    console.log("Open Tab " + a + " - " + b + " - " + c);
    return;
  },
  "switchToTab": function (a) {
    console.log("Switch To Tab " + a);
    return;
  }
}

// ---------------- Firebase funciones ----------------

// Guardar info del usuario
function saveUserInfo(userId, name, level = 1, coins = 100) {
  set(ref(database, 'users/' + userId), {
    name: name,
    level: level,
    coins: coins
  }).then(() => {
    console.log("Usuario guardado en Firebase");
  }).catch((error) => {
    console.error(error);
  });
}

// Leer info del usuario
function loadUserInfo(userId) {
  const dbRef = ref(database);
  get(child(dbRef, 'users/' + userId)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log("Datos usuario:", snapshot.val());
    } else {
      console.log("No hay datos para el usuario");
    }
  }).catch((error) => {
    console.error(error);
  });
}

// Guardar amigos
function saveFriend(userId, friendId, friendName) {
  set(ref(database, 'friends/' + userId + '/' + friendId), {
    name: friendName
  });
}

// Leer amigos
function loadFriends(userId) {
  const dbRef = ref(database);
  get(child(dbRef, 'friends/' + userId)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log("Amigos:", snapshot.val());
    } else {
      console.log("No hay amigos guardados");
    }
  });
}

// ---------------- Game functions ----------------

function inner_getUserInfo() {
  document.getElementById("loading_message").innerHTML = "Loading User info...";
  document.getElementById("inner_progress_bar").style.width = "30%";
  document.getElementById("flash_enabler").style.display = "none";

  const userId = "user123"; // reemplaza por login real si quieres
  saveUserInfo(userId, "Jugador"); // guarda usuario en Firebase
  loadUserInfo(userId); // lee info para debug
}

function inner_getFriendData() {
  document.getElementById("inner_progress_bar").style.width = "50%";
  document.getElementById("loading_message").innerHTML = "Loading Friends data...";

  const userId = "user123";
  saveFriend(userId, "friend1", "Amigo 1"); // guarda un amigo de ejemplo
  loadFriends(userId); // lee amigos
}

function inner_getAppFriendIds() {
  document.getElementById("inner_progress_bar").style.width = "70%";
}

function inner_onGameLoaded(seen, popp, canvas) {
  document.getElementById("inner_progress_bar").style.width = "100%";
  document.getElementById("loading_game").style.display = "none";
}

function openInAppPurchaseAPI(gid, snid, snuid, cid, a, b, c) {
  console.log("Purchase " + gid + ", " + snid + ", " + snuid + ", " + cid + ", " + a + ", " + b + ", " + c)
  return;
}

function hasPermission(perm, snuid, name) {
  console.log("Perm " + perm + ", " + snuid + ", " + name)
  return;
}

function showPermissions(d) {
  console.log("Show Perm " + d)
  return;
}
