// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBJZ4HvSxc3Ed_mlgNMQfGQ0QFGDMAoFkk",
  authDomain: "empire-6ea26.firebaseapp.com",
  projectId: "empire-6ea26",
  storageBucket: "empire-6ea26.appspot.com",
  messagingSenderId: "617496523953",
  appId: "1:617496523953:web:4136245f1c114219f75e90"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta para que otros JS lo usen
export { app };
