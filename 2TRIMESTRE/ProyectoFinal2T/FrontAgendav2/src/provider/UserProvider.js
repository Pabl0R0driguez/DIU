import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase"; // Importa la instancia de Firebase
import { onAuthStateChanged } from "firebase/auth";

// Crear el contexto
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // Si hay un usuario autenticado, actualiza el estado con la información
        setUser({
          displayName: userAuth.displayName,
          email: userAuth.email,
          photoURL: userAuth.photoURL,
        });
      } else {
        // Si no hay usuario autenticado, establece el estado como null
        setUser(null);
      }
    });

    // Limpiar el listener cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
