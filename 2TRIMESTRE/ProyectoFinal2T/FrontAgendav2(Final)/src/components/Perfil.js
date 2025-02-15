import React, { useContext } from "react";
import { UserContext } from "../provider/UserProvider";
import { Redirect } from "react-router-dom"; // Para redirigir al login si no está autenticado
import { auth } from "../firebase";
import '../styles/Perfil.css';  // Importa el archivo CSS

const Perfil = () => {
  const user = useContext(UserContext); // Obtiene el contexto del usuario

  // Si no hay usuario autenticado, redirigir a /login
  if (!user) {
    return <Redirect to="/login" />;
  }

  const { photoURL, displayName, email } = user;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg rounded">
            {/* Imagen de fondo (ajustada a tamaño más pequeño) */}
            <div className="card-img-top perfil-img" style={{ backgroundImage: `url(${photoURL || 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg'})` }}></div>

            <div className="card-body text-center">
              {/* Imagen circular del usuario ajustada */}
              <div className="mb-4">
                <img
                  src={photoURL || 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg'}
                  alt={displayName}
                  className="rounded-circle border perfil-img-circle"
                />
              </div>

              {/* Nombre y correo */}
              <h2 className="card-title text-uppercase font-weight-bold">{displayName}</h2>
              <p className="card-text text-uppercase text-muted">{email}</p>

              {/* Botón de Cerrar sesión */}
              <button
                className="btn btn-danger btn-block mt-4 py-2 text-uppercase font-weight-bold"
                onClick={() => {
                  auth.signOut().then(() => {
                    window.location.href = "/login"; // Redirigir al login después de cerrar sesión
                  }).catch((error) => {
                    console.error("Error al cerrar sesión", error);
                  });
                }}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
