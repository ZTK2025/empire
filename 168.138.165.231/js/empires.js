// empires.js modificado para GitHub Pages y Firebase
import { getDatabase, ref, set, get, child } from "firebase/database";
import { app } from "./firebaseConfig.js"; // tu archivo con initializeApp

const database = getDatabase(app);

// ---------------- Dummy APIs ----------------
const zynga = {
  ads: {
    WatchToEarn: {
      service: {
        available: () => {
          console.log("W2E avail");
          return false;
        },
        initializeFlash: (oid, a, b, c) => {
          console.log("initF", oid, a, b, c);
          return false;
        }
      }
    }
  }
};

const statTracker = {
  logWorldObjectCount: () => {
    console.log("World Count");
  }
};

const ZYFrameManager = {
  reloadApp: () => {
    console.log("Reload App");
    window.location.reload();
  },
  navigateTo: (a, b, c) => console.log("Navigate To", a, b, c),
  openTab: (a, b, c) => console.log("Open Tab", a, b, c),
  switchToTab: (a) => console.log("Switch To Tab", a)
};

// ---------------- Firebase funciones ----------------
function saveUserInfo(userId, name, level = 1, coins = 100) {
  set(ref(database, 'users/' + userId), { name, level, coins })
    .then(() => console.log("Usuario guardado en Firebase"))
    .catch((error) => console.error(error));
}

function loadUserInfo(userId) {
  const dbRef = ref(database);
  get(child(dbRef, 'users/' + userId))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log("Datos usuario:", snapshot.val());
      } else {
        console.log("No hay datos para el usuario");
      }
    })
    .catch((error) => console.error(error));
}

function saveFriend(userId, friendId, friendName) {
  set(ref(database, 'friends/' + userId + '/' + friendId), { name: friendName });
}

function loadFriends(userId) {
  const dbRef = ref(database);
  get(child(dbRef, 'friends/' + userId))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log("Amigos:", snapshot.val());
      } else {
        console.log("No hay amigos guardados");
      }
    });
}

// ---------------- Game functions ----------------
function inner_getUserInfo() {
  const loadingMessage = document.getElementById("loading_message");
  const progressBar = document.getElementById("inner_progress_bar");
  const flashEnabler = document.getElementById("flash_enabler");

  if (loadingMessage) loadingMessage.innerHTML = "Loading User info...";
  if (progressBar) progressBar.style.width = "30%";
  if (flashEnabler) flashEnabler.style.display = "none";

  const userId = "user123"; // reemplaza por login real
  saveUserInfo(userId, "Jugador");
  loadUserInfo(userId);
}

function inner_getFriendData() {
  const progressBar = document.getElementById("inner_progress_bar");
  const loadingMessage = document.getElementById("loading_message");

  if (progressBar) progressBar.style.width = "50%";
  if (loadingMessage) loadingMessage.innerHTML = "Loading Friends data...";

  const userId = "user123";
  saveFriend(userId, "friend1", "Amigo 1");
  loadFriends(userId);
}

function inner_getAppFriendIds() {
  const progressBar = document.getElementById("inner_progress_bar");
  if (progressBar) progressBar.style.width = "70%";
}

function inner_onGameLoaded(seen, popp, canvas) {
  const progressBar = document.getElementById("inner_progress_bar");
  const loadingGame = document.getElementById("loading_game");
  if (progressBar) progressBar.style.width = "100%";
  if (loadingGame) loadingGame.style.display = "none";
}

// Dummy functions para compatibilidad
function openInAppPurchaseAPI(gid, snid, snuid, cid, a, b, c) {
  console.log("Purchase", gid, snid, snuid, cid, a, b, c);
}
function hasPermission(perm, snuid, name) { console.log("Perm", perm, snuid, name); }
function showPermissions(d) { console.log("Show Perm", d); }

// ---------------- Ejecutar funciones al cargar la página ----------------
window.addEventListener("load", () => {
  inner_getUserInfo();
  inner_getFriendData();
  inner_getAppFriendIds();
});
