import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase"; // Firebase Auth
import { onAuthStateChanged } from "firebase/auth";

// Crear el contexto
export const UserContext = createContext();

// Proveedor del contexto
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para el usuario

  useEffect(() => {
    // Listener de autenticación de Firebase
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // Si el usuario está autenticado, guardamos la información
        setUser({
          displayName: userAuth.displayName,
          email: userAuth.email,
          photoURL: userAuth.photoURL,
        });
      } else {
        // Si no hay usuario autenticado
        setUser(null);
      }
    });

    return () => unsubscribe(); // Limpieza del listener
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
