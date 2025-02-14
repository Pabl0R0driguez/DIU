import { initializeApp } from "firebase/app"; 
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword 
} from "firebase/auth"; 
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"; 

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBbMgMiFEvuerhGK1f8L-sHNrRE4ZVF6KQ",
  authDomain: "loginproyectofinal-f76cb.firebaseapp.com",
  projectId: "loginproyectofinal-f76cb",
  storageBucket: "loginproyectofinal-f76cb.appspot.com",
  messagingSenderId: "991930152122",
  appId: "1:991930152122:web:fdf48ac05af4fa40067e83",
  measurementId: "G-41K341S8RX"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener la autenticación y la base de datos
const auth = getAuth(app);
const db = getFirestore(app);

// Proveedor de Google
const googleProvider = new GoogleAuthProvider();

// Función para iniciar sesión con Google
const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

// Función para iniciar sesión con email y contraseña 
const signInWithEmail = (email, password) => 
  signInWithEmailAndPassword(auth, email, password);

// Función para crear documento del usuario
const generateUserDocument = async (userAuth, additionalData) => {
  if (!userAuth) return null;

  const userRef = doc(db, "users", userAuth.uid);
  const userSnap = await getDoc(userRef);

  // Si el documento no existe, lo creamos
  if (!userSnap.exists()) {
    const { email, displayName, photoURL } = userAuth;
    try {
      await setDoc(userRef, {
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creando documento de usuario", error);
    }
  }

  return userSnap.data();
};

// Exportar funciones
export { auth, db, signInWithGoogle, signInWithEmail, generateUserDocument };
