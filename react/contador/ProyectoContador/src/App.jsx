import './App.css';
import IncContador from './components/IncContador';
import { useState } from 'react';

function App() {
  const [num, setNum] = useState(0);

  const incrementar = () => setNum(num + 1);
  const decrementar = () => setNum(num - 1);
  const limpiar = () => setNum(0);

  return (
    <>
      <h1>Contador pulsaciones</h1>
      <IncContador
        num={num} // Pasa el estado num como prop
        incrementar={incrementar} // Pasa la función incrementar como prop
        decrementar={decrementar} // Pasa la función decrementar como prop
        limpiar={limpiar} // Pasa la función limpiar como prop
      />
    </>
  );
}

export default App;
