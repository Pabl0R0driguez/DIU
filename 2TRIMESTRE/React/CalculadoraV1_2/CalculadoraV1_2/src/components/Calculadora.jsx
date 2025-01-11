import React from 'react';
import './Calculadora.css';

function Calculadora({
// Props recibidas de App
  valorPantalla,
  ingresarNumero,
  seleccionarOperacion,
  ejecutarOperacion,
  reiniciarPantalla,
  alternarSigno,
  ponerPunto
}) {
  return (
      // Este div muestra el valor actual de la pantalla recibido a través de la prop valorPantalla
    <div className="calculator">
      <input
        type="text"
        value={valorPantalla}
        className="display"
        disabled
      />

      {/* Botones de la calculadora, cada botón está relacionado con una acción específica */}
      {/* Llama a una función pasada como prop, ej: onClick={reiniciarPantalla}  */}
      <div className="buttonRow">
        <button className="button buttonClear" onClick={reiniciarPantalla}>AC</button>
        <button className="boton" onClick={() => alternarSigno('+/-')}>+/-</button>
        <button className="boton" onClick={() => seleccionarOperacion('%')}>%</button>
        <button className="operandos" onClick={() => seleccionarOperacion('/')}>/</button>
      </div>
      <div className="buttonRow">
        <button className="boton" onClick={() => ingresarNumero('7')}>7</button>
        <button className="boton" onClick={() => ingresarNumero('8')}>8</button>
        <button className="boton" onClick={() => ingresarNumero('9')}>9</button>
        <button className="operandos" onClick={() => seleccionarOperacion('*')}>*</button>
      </div>
      <div className="buttonRow">
        <button className="boton" onClick={() => ingresarNumero('4')}>4</button>
        <button className="boton" onClick={() => ingresarNumero('5')}>5</button>
        <button className="boton" onClick={() => ingresarNumero('6')}>6</button>
        <button className="operandos" onClick={() => seleccionarOperacion('-')}>-</button>
      </div>
      <div className="buttonRow">
        <button className="boton" onClick={() => ingresarNumero('1')}>1</button>
        <button className="boton" onClick={() => ingresarNumero('2')}>2</button>
        <button className="boton" onClick={() => ingresarNumero('3')}>3</button>
        <button className="operandos" onClick={() => seleccionarOperacion('+')}>+</button>
      </div>
      <div className="buttonRow">
        <button className="button_ancho" onClick={() => ingresarNumero('0')}>0</button>
        <button className="boton2" onClick={() => ponerPunto('.')}>.</button>
        <button className="operandos" onClick={ejecutarOperacion} >=</button>
      </div>
    </div>
  );
}

export default Calculadora;
