import React, { useState, useEffect } from 'react';
import Calculadora from './components/Calculadora';
import './App.css';

function App() {
  const [valorPantalla, setValorPantalla] = useState('');
  const [valorOperando, setValorOperando] = useState(null);
  const [tipoOperacion, setTipoOperacion] = useState(null);
  const [esResultadoFinal, setEsResultadoFinal] = useState(false);

  // Función para hacer la llamada a la API externa
  const realizarOperacionConAPI = async (expresion) => {
    try {

      /* encodeURIComponent asegura que caracteres especiales como +, /, = no causen errores en la URL. */
      /* Si la expresión es "3 + 5", encodeURIComponent la convierte en "3%20%2B%205". */
      const response = await fetch(`https://api.mathjs.org/v4/?expr=${encodeURIComponent(expresion)}`);
     
      /* Comprueba si la  */
      if (!response.ok) {
        throw new Error(`Error al obtener el resultado: ${response.status}`);
      }
      const resultado = await response.json();
      return resultado; // Devuelve el resultado para que pueda ser usado
    } catch (error) {
      console.error("Error al hacer la llamada:", error);
      throw error; // Lanza el error para que pueda ser manejado por quien llama la función
    }
  };
  
  const ingresarNumero = (numero) => {
    if (esResultadoFinal) {
      setValorPantalla(numero);
      setEsResultadoFinal(false);
    } else {
      setValorPantalla((prev) => prev + numero);
    }
  };

  const seleccionarOperacion = (operacion) => {
    if (valorPantalla === '') return;

    if (esResultadoFinal) {
      setValorOperando(valorPantalla);
      setTipoOperacion(operacion);
      setValorPantalla('');
      setEsResultadoFinal(false);
    } else if (valorOperando === null) {
      setValorOperando(valorPantalla);
      setTipoOperacion(operacion);
      setValorPantalla('');
    } else {
      ejecutarOperacion();
      setTipoOperacion(operacion);
    }
  };

  const ejecutarOperacion = async () => {
    if (valorOperando === null || valorPantalla === '') return;
  
    const operacion = `${valorOperando} ${tipoOperacion} ${valorPantalla}`;
    try {
      const resultado = await realizarOperacionConAPI(operacion);
      setValorPantalla(resultado.toString());
      setValorOperando(resultado);
      setTipoOperacion(null);
      setEsResultadoFinal(true);
    } catch (error) {
      setValorPantalla('Error'); // Muestra "Error" en caso de fallo
    }
  };
  

  const reiniciarPantalla = () => {
    setValorPantalla('');
    setValorOperando(null);
    setTipoOperacion(null);
    setEsResultadoFinal(false);
  };

  const ponerPunto = () => {
    if (esResultadoFinal) {
      setValorPantalla('0.');
      setEsResultadoFinal(false);
    } else if (!valorPantalla.includes('.')) {
      setValorPantalla((prev) => prev + '.');
    }
  };

  const alternarSigno = () => {
    setValorPantalla((prev) => (prev.startsWith('-') ? prev.slice(1) : '-' + prev));
  };

  return (
    <div className="App">
      <Calculadora
        valorPantalla={valorPantalla}
        ingresarNumero={ingresarNumero}
        seleccionarOperacion={seleccionarOperacion}
        ejecutarOperacion={ejecutarOperacion}
        reiniciarPantalla={reiniciarPantalla}
        ponerPunto={ponerPunto}
        alternarSigno={alternarSigno}
      />
    </div>
  );
}

export default App;
