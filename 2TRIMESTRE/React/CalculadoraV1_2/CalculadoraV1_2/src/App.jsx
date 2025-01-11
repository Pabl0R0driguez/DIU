  // Se importa ek hook useState para manejar el estado del componente
  import React, { useState } from 'react';
  import Calculadora from './components/Calculadora';
  import './App.css';
  import { evaluate } from 'mathjs';

  // Definimos los estados del componente
  // Usamos useState para manejar los estados de la calculadora
  function App() {
    const [valorPantalla, setValorPantalla] = useState(''); /* Contenido actual de la pantalla */
    const [valorOperando, setValorOperando] = useState(null); /* Guarda el primer operando antes de realizar una operación */
    const [tipoOperacion, setTipoOperacion] = useState(null); /* Operador actual utilizado (+, -, ...) */
    const [esResultadoFinal, setEsResultadoFinal] = useState(false); /* Indica si el valor actual es el resultado de una operación */

    // FUNCIONES PRINCIPALES

    // Ingresar un numero
    const ingresarNumero = (numero) => {
      // Si el resultado de la operación es 50 y pulsamos 6, se borra el 50 y aparece el 6
      if (esResultadoFinal) { // Si es el resultado de una operación :
        setValorPantalla(numero); // Cambia el valor de la pantalla por el nuevo valor
        setEsResultadoFinal(false); // Cambia el estado a false, indicando que ahora estamos ingresando un nuevo número.
        // Si no, concatena el resultado al nuevo número que pulsemos
      } else {
        setValorPantalla((valorPrevio) => valorPrevio + numero);
      }
    };


    // valorPantalla : Muestra el número ingresado por el usuario o el resultado de una operación.
    // valorOperando : Almacena el primer número ingresado antes de la operación.
    // tipoOperacion : Guarda el operador seleccionado para realizar la operación.
    // ejecutarOperacion : Esta función se encarga de calcular el resultado cuando se tienen ambos operandos y un operador.

    // Seleccionar operación
    const seleccionarOperacion = (operacion) => {
      // Asegura que hallamos seleccionado previamente un número antes de seleccionar un operando
      // Si la ventana está vacía no se realiza ninguna operación
      if (valorPantalla === '') return;

      // Para que cuando le demos al igual podamos seguir realizando operaciones
      if(esResultadoFinal){
        setValorOperando(valorPantalla);
        setTipoOperacion(operacion);
        setValorPantalla('');
        setEsResultadoFinal(false)
      }

      
      // Indica si es la pimera operación 
      else if (valorOperando === null) {

        // Almacena el valor actual de la pantalla como primer operando
        setValorOperando(valorPantalla);

        // Guarda el operador seleccionado (+,-,...)
        setTipoOperacion(operacion);

        // Limpia la pantalla, para que podamos ingresar el siguiente número 
        setValorPantalla('');

        // Si estoy haciendo una operación(8+2) y pulso otro operando (*) me sale la suma anterior
        // y cambia el operando al nuevo que hemos presionado
      } else {
        ejecutarOperacion();
        setTipoOperacion(operacion);
      }
    };


    // Ejecutar operación
    const ejecutarOperacion = () => {
      // Aseguramos que ya se haya ingresado un número inicial y un segundo número que la ventana no este vacía
      // Es decir, hay una operación
      if (valorOperando === null || valorPantalla === '') return;

      
      // Usamos la librería evaluate y guardamos el resulatado en la variable resultado
      // Ej: "12 + 8", esta librería nos calcula la operación como string
      try {
        const resultado = evaluate(valorOperando + tipoOperacion + valorPantalla);
        setValorPantalla(resultado);
        setValorOperando(resultado);
        setTipoOperacion(null);
        setEsResultadoFinal(true);
      } catch (error) {
        setValorPantalla('Error');
      }
    };

    // Vacía la pantalla y anula la operación
    const reiniciarPantalla = () => {
      setValorPantalla('');
      setValorOperando(null);
      setTipoOperacion(null);
      setEsResultadoFinal(false);
    };

    const ponerPunto = (numero) => {
      // Si se ingresa un número después del resultado de una operación
      if (esResultadoFinal) {
          // Si el número es un punto decimal, agregarlo al resultado anterior
          if (numero === '.') {
              setValorPantalla((prev) => prev + numero);
          } else {
              setValorPantalla(numero); 
          }
          setEsResultadoFinal(false);
      } else {
          // Si el número es un punto decimal, verificar que no haya más de uno en el número actual
          if (numero === '.' && valorPantalla.includes('.')) return;
          
          setValorPantalla((valorPrevio) => valorPrevio + numero);
      }
  };
  





 // Alternar signo 
 const alternarSigno = () => {
   setValorPantalla((prev) => (prev[0] === '-' ? prev.substring(1) : '-' + prev)); 
  };


    // Le pasamos al componente Calculadora todas las funciones como props
    return (
      <div className="App">
        <Calculadora
          valorPantalla={valorPantalla}
          ingresarNumero={ingresarNumero}
          seleccionarOperacion={seleccionarOperacion}
          ejecutarOperacion={ejecutarOperacion}
          reiniciarPantalla={reiniciarPantalla}
          ponerPunto ={ponerPunto}
          alternarSigno = {alternarSigno}
        />
      </div>
    );
  }

  export default App;
