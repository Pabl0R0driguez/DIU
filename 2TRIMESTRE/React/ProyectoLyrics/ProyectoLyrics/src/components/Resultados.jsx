import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Resultados.css';

function Resultados({ resultados }) {
  return (
    <div className="container mt-5">
      <h2>Resultados</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Artista</th>
            <th>Canción</th>
            <th>Letra</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map((resultado, index) => (
            <tr key={index}>
              <td>{resultado.artista}</td>
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
