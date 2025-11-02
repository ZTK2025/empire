// firebase/firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyBOfc3XXaw_qOqy4_DaH1Se4LuoepM_n0g",
  authDomain: "empirerevive-6571e.firebaseapp.com",
  projectId: "empirerevive-6571e",
  storageBucket: "empirerevive-6571e.firebasestorage.app",
  messagingSenderId: "114385329257",
  appId: "1:114385329257:web:59ef812f148e6b851f56f8"
};

// Inicializar Firebase
try {
  if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    console.log("✅ Firebase configurado correctamente");
  } else {
    console.error("❌ Firebase no está disponible");
  }
} catch (error) {
  console.error("❌ Error inicializando Firebase:", error);
}
