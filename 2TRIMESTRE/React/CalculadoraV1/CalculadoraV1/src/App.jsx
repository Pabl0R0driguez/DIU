import React, { useState } from 'react';
import Display from './components/Display';
import Botones from './components/Botones';
import { evaluateExpression } from './utils/evaluator';
import './App.css';

const App = () => {
  const [expresion, setExpression] = useState('');

  const handleButtonClick = (btn) => {
    if (btn === 'C') return setExpression('');
    if (btn === '=') return setExpression(evaluateExpression(expresion).toString());
    
    // prev[0] === '-': Verifica si el primer carácter de la expresión es un signo negativo ('-').
    // prev.substring(1): Devuelve la cadena sin el primer carácter.
    // '-' + prev: Si la expresión no tiene un '-' al principio, se agrega un signo negativo al principio de la expresión.
    if (btn === '+/-') return setExpression((prev) => prev[0] === '-' ? prev.substring(1) : '-' + prev);

    // setExpression((prev) => ...): Actualiza el estado de la expresión con el nuevo valor, 
    // ya sea con el signo cambiado o añadido.
    setExpression((prev) => prev + btn);
  };
  

  return (
    <div className="app">
      <h1>Calculadora</h1>
    {/*Estamos pasando una propiedad (prop) llamada value al componente Display
    y ponemos || para que salga 0 como predefinido en nuestra calculadora.*/}      
    <Display value= {expresion || '0'} />

    {/* Le pasamos la prop handleButtonClick al componente Botones, se ejecutrá cada vez
    que hagamos click en alguno de los botones */}
    <Botones onButtonClick={handleButtonClick} />
    </div>
  );
};

export default App;
