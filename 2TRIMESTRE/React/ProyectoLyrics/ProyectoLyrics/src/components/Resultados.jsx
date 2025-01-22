import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Resultados.css';

function Resultados({ resultados }) {

  return (
    <div className="container mt-5">
      <h2>Resultados</h2>
    
   {/*  Agregamos una tabla con los resultados de la búsqueda.
    Mostramos el artista, la canción y la letra. */}
   
      <table className="table table-striped">
          <thead>
            <tr>
              <th>Artista</th>
              <th>Canción</th>
              <th>Letra</th>
            </tr>
          </thead>
          

{/*     Utilizamos la función map para recorrer el arreglo de resultados.
 */}        <tbody>
          {resultados.map((resultado, index) => (
            <tr key={index}>
{/*               // Mostramos el artista, la canción y la letra en cada fila de la tabla.
 */}              <td>{resultado.artista}</td>
              <td>{resultado.cancion}</td>
              <td>
                <pre>{resultado.lyrics}</pre>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Resultados;
