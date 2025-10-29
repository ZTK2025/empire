// firebase/firebase-config.js CON TU LLAVE
const firebaseConfig = {
  apiKey: "AIzaSyBOfc3XXaw_qOqy4_DaH1Se4LuoepM_n0g",
  authDomain: "empirerevive-6571e.firebaseapp.com",
  projectId: "empirerevive-6571e",
  storageBucket: "empirerevive-6571e.firebasestorage.app",
  messagingSenderId: "114385329257",
  appId: "1:114385329257:web:59ef812f148e6b851f56f8"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referencias globales
const auth = firebase.auth();
const db = firebase.firestore();
console.log("Firebase configurado correctamente para Empire Revive");
