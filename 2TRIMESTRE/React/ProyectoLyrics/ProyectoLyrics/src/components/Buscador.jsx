// Importamos useState, hook que nos permitirá manejar estados dento del compoenente.
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Buscador.css';

// Creamos el componente Buscador, el cual recibe la función onSearch como prop.
function Buscador({ onSearch }) {
  // Declaramos los estados artista, cancion y cargando.
  const [artista, setArtista] = useState('');
  const [cancion, setCancion] = useState('');
  const [cargando, setCargando] = useState(false);

  // Declaramos la función handleSubmit, la cual se encargará de realizar la petición a la API.
  // Recibe un evento como argumento.
  // Prevenimos el comportamiento por defecto del formulario.
  // Cambiamos el estado cargando a true.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      // Realizamos la petición a la API.
      const response = await fetch(`https://api.lyrics.ovh/v1/${artista}/${cancion}`);
       // Si la respuesta no es exitosa, lanzamos un error.
      if (!response.ok) {
        throw new Error('No se encontró la letra. Verifica los datos ingresados.' );
      }
      // Convertimos la respuesta a JSON.
      const data = await response.json();

      // onSearch es una función que recibe los datos de la canción.
      onSearch({artista, cancion, lyrics:data.lyrics});

      } catch (error) {
      alert(error.message);
    } finally {
      // Una vez cargado los datos cambiamos el estado de cargando a false.
      // Cambiamos el estado cargando a false.
      setCargando(false);
    }
  };

  // Retornamos el formulario con los campos de artista y canción.
  // Al hacer submit se ejecuta la función handleSubmit.
  // Si cargando es true, el botón se deshabilita y muestra el texto 'Buscando...'.

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="row justify-content-center">
        <div className="col-12 text-center mb-4">
          <h1 className="display-5">Buscador de Canciones</h1>
        </div>
        <div className="col-md-6 col-12 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Artista"
            value={artista}
            onChange={(e) => setArtista(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6 col-12 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Canción"
            value={cancion}
            onChange={(e) => setCancion(e.target.value)}
            required
          />
        </div>
        <div className="col-12 text-center">
          <button
            type="submit"
            className="btn btn-primary w-50"
            disabled={cargando}
          >
            {cargando ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Buscador;
