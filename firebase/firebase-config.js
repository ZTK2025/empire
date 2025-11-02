// firebase/firebase-config.js - VERSIÓN CORREGIDA
// Configuración de Firebase para Empire Revive
const firebaseConfig = {
  apiKey: "AIzaSyBOfc3XXaw_qOqy4_DaH1Se4LuoepM_n0g",
  authDomain: "empirerevive-6571e.firebaseapp.com",
  projectId: "empirerevive-6571e",
  storageBucket: "empirerevive-6571e.firebasestorage.app",
  messagingSenderId: "114385329257",
  appId: "1:114385329257:web:59ef812f148e6b851f56f8"
};

// Inicializar Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // Si ya está inicializado, usa esa instancia
}

console.log("✅ Firebase configurado correctamente para Empire Revive");
