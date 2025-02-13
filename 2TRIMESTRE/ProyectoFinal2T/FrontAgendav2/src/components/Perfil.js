import React, { useContext } from "react";
import { UserContext } from "../provider/UserProvider";
import { Redirect } from "react-router-dom"; // Para redirigir al login si no está autenticado
import { auth } from "../firebase";

const Perfil = () => {
  const user = useContext(UserContext); // Obtiene el contexto del usuario

  console.log(user);
  
  // Si no hay usuario autenticado, redirigir a /login
  if (!user) {
    return <Redirect to="/login" />;
  }

  const { photoURL, displayName, email } = user;

  return (
    <div className="mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
      <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
        <div
          style={{
            background: `url(${photoURL || 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg'}) no-repeat center center`,
           
            backgroundSize: "cover",
            height: "200px",
            width: "200px",
          }}
          className="border border-blue-300"
        ></div>
        <div className="md:pl-4">
          <h2 className="text-2xl font-semibold">{displayName}</h2>
          <h3 className="italic">{email}</h3>
        </div>
      </div>
      <button
        className="w-full py-3 bg-red-600 mt-4 text-white"
        onClick={() => {
          auth.signOut().then(() => {
            window.location.href = "/login"; // Redirigir al login después de cerrar sesión
          }).catch((error) => {
            console.error("Error al cerrar sesión", error);
          });
        }}
      >
        Sign out
      </button>
    </div>
  );
};

export default Perfil;
