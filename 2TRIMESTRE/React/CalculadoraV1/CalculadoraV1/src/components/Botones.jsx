import React from 'react';
import './Botones.css';

// Le pasamos la prop onButtonClick desde App
const Botones = ({ onButtonClick }) => {
  // Definimos los botones de la calculadora
  const buttons = [
    'C', '+/-', '%', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '='
  ];


  return (
    <div className="botones">
      {/* Usamos la función map para recorrer el array buttons y 
      crear un nuevo componente <button> para cada elemento del array,
      le asignamos la variable btn a cada iteración */}
      {buttons.map((btn) => (

        <button
          key={btn} /* Asigna un key único a cada botón */
          onClick={() => onButtonClick(btn)} /* Asocia un evento de clic a cada botón. */
          className={btn === '0' ? 'button double' : 'button'}> {/* Ponemos button double para que el botón ocupe más espacio */}
          {btn}
        </button>
      ))}
    </div>
  );
};

export default Botones;
