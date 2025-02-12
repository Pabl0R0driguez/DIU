// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth"; // Asegúrate de importar estas funciones

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBbMgMiFEvuerhGK1f8L-sHNrRE4ZVF6KQ",
  authDomain: "loginproyectofinal-f76cb.firebaseapp.com",
  projectId: "loginproyectofinal-f76cb",
  storageBucket: "loginproyectofinal-f76cb.firebasestorage.app",
  messagingSenderId: "991930152122",
  appId: "1:991930152122:web:fdf48ac05af4fa40067e83",
  measurementId: "G-41K341S8RX"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Función para iniciar sesión con Google
const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider); // Iniciar sesión con Google
};

// Función para iniciar sesión con email y contraseña
const signInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password); // Iniciar sesión con email y contraseña
};

// Exportar la autenticación y las funciones
export { auth, signInWithGoogle, signInWithEmail };
