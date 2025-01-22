import React, { useState } from 'react';
import './App.css';
import Buscador from './components/Buscador';
import Resultados from './components/Resultados';

function App() {
  const [resultados, setResultados] = useState([]);

  // Función que recibe un nuevo resultado y lo agrega al estado resultados.
  // setResultados actualiza el estado resultados añadiendo el nuevo resultado al array resultados
  const handleSearch = (nuevoResultado) => {
    setResultados((prevResultados) => [...prevResultados, nuevoResultado]);
  };

  return (
    <div>
      <Buscador onSearch={handleSearch} />
      <Resultados resultados={resultados} />
    </div>
  );
}

export default App;
