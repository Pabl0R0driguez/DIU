import React, { useState } from 'react';
import './App.css';
import Buscador from './components/Buscador';
import Resultados from './components/Resultados';

function App() {
  const [resultados, setResultados] = useState([]);

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
