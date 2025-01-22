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
        throw new Error('No se encontró la letra. Verifica los datos ingresados.');
      }
      // Convertimos la respuesta a JSON.
      const data = await response.json();
      onSearch({artista, cancion, lyrics:data.lyrics});

      // Llamamos a la función onSearch con los datos obtenidos.
      } catch (error) {
      alert(error.message);
    } finally {
      // Una vez cargado los datos cambiamos el estado de cargando a false.
      // Cambiamos el estado cargando a false.
      setCargando(false);
    }
  };

  // Retornamos el formulario.
  return (
    // Agregamos la clase container de Bootstrap.
    <div className="contenedor">
  <form onSubmit={handleSubmit}>
    <div className="centrado">
      <h1>Buscador de Canciones</h1>
    </div>
    <div className="campo">
      <input
        type="text"
        className="entrada"
        placeholder="Artista"
        value={artista}
        onChange={(e) => setArtista(e.target.value)}
        required
      />
    </div>
    <div className="campo">
      <input
        type="text"
        className="entrada"
        placeholder="Canción"
        value={cancion}
        onChange={(e) => setCancion(e.target.value)}
        required
      />
    </div>
    <div className="boton">
      <button type="submit" className="boton" disabled={cargando}>
        {cargando ? 'Buscando...' : 'Buscar'}
      </button>
    </div>
  </form>
</div>

  );
}

export default Buscador;
