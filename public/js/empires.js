// empires.js REPARADO - compatible con Netlify
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

// ---------------- Firebase funciones SIMPLIFICADAS ----------------
function saveUserInfo(userId, name, level = 1, coins = 100) {
  // Guardar en localStorage como respaldo
  const userData = { name, level, coins, timestamp: Date.now() };
  localStorage.setItem('user_' + userId, JSON.stringify(userData));
  console.log("Usuario guardado localmente:", userData);
}

function loadUserInfo(userId) {
  const userData = localStorage.getItem('user_' + userId);
  if (userData) {
    console.log("Datos usuario:", JSON.parse(userData));
    return JSON.parse(userData);
  } else {
    console.log("No hay datos para el usuario");
    return null;
  }
}

function saveFriend(userId, friendId, friendName) {
  const friends = JSON.parse(localStorage.getItem('friends_' + userId) || '{}');
  friends[friendId] = { name: friendName, timestamp: Date.now() };
  localStorage.setItem('friends_' + userId, JSON.stringify(friends));
  console.log("Amigo guardado:", friendName);
}

function loadFriends(userId) {
  const friends = localStorage.getItem('friends_' + userId);
  if (friends) {
    console.log("Amigos:", JSON.parse(friends));
    return JSON.parse(friends);
  } else {
    console.log("No hay amigos guardados");
    return {};
  }
}

// ---------------- Game functions ----------------
function inner_getUserInfo() {
  const loadingMessage = document.getElementById("loading_message");
  const progressBar = document.getElementById("inner_progress_bar");
  const flashEnabler = document.getElementById("flash_enabler");

  if (loadingMessage) loadingMessage.innerHTML = "Loading User info...";
  if (progressBar) progressBar.style.width = "30%";
  if (flashEnabler) flashEnabler.style.display = "none";

  const userId = "user_" + Math.floor(Math.random() * 10000); // ID único
  saveUserInfo(userId, "Jugador");
  loadUserInfo(userId);
}

function inner_getFriendData() {
  const progressBar = document.getElementById("inner_progress_bar");
  const loadingMessage = document.getElementById("loading_message");

  if (progressBar) progressBar.style.width = "50%";
  if (loadingMessage) loadingMessage.innerHTML = "Loading Friends data...";

  const userId = "user_" + Math.floor(Math.random() * 10000);
  
  // Agregar algunos amigos de ejemplo
  saveFriend(userId, "friend1", "Amigo 1");
  saveFriend(userId, "friend2", "Amigo 2");
  saveFriend(userId, "friend3", "Amigo 3");
  
  loadFriends(userId);
}

function inner_getAppFriendIds() {
  const progressBar = document.getElementById("inner_progress_bar");
  if (progressBar) progressBar.style.width = "70%";
  console.log("App Friend IDs cargados");
}

function inner_onGameLoaded(seen, popp, canvas) {
  const progressBar = document.getElementById("inner_progress_bar");
  const loadingGame = document.getElementById("loading_game");
  const loadingMessage = document.getElementById("loading_message");
  
  if (progressBar) progressBar.style.width = "100%";
  if (loadingMessage) loadingMessage.innerHTML = "¡Juego listo!";
  
  // Esperar 1 segundo antes de ocultar la pantalla de carga
  setTimeout(() => {
    if (loadingGame) loadingGame.style.display = "none";
    console.log("Juego completamente cargado");
  }, 1000);
}

// Dummy functions para compatibilidad
function openInAppPurchaseAPI(gid, snid, snuid, cid, a, b, c) {
  console.log("Purchase", gid, snid, snuid, cid, a, b, c);
}

function hasPermission(perm, snuid, name) { 
  console.log("Perm", perm, snuid, name);
  return true; // Siempre permitir para testing
}

function showPermissions(d) { 
  console.log("Show Perm", d);
}

// ---------------- Ejecutar funciones al cargar la página ----------------
document.addEventListener("DOMContentLoaded", () => {
  console.log("Empires.js inicializado");
  
  // Iniciar secuencia de carga
  setTimeout(inner_getUserInfo, 500);
  setTimeout(inner_getFriendData, 1500);
  setTimeout(inner_getAppFriendIds, 2500);
});

// Función global para compatibilidad
window.inner_getUserInfo = inner_getUserInfo;
window.inner_getFriendData = inner_getFriendData;
window.inner_getAppFriendIds = inner_getAppFriendIds;
window.inner_onGameLoaded = inner_onGameLoaded;