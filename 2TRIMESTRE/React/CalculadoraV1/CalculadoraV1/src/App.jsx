import React, { useState } from 'react';
import Display from './components/Display';
import Botones from './components/Botones';
import { evaluateExpression } from './utils/evaluator';
import './App.css';

const App = () => {
  const [expresion, setExpression] = useState('');

  const handleButtonClick = (btn) => {
    if (btn === 'C') {
      setExpression('');
    } else if (btn === '=') {
      const result = evaluateExpression(expresion);
      setExpression(result.toString());
    } else if (btn === '+/-') {
      setExpression((prev) => (prev.charAt(0) === '-' ? prev.slice(1) : `-${prev}`));
    } else {
      setExpression((prev) => prev + btn);
    }
  };

  return (
    <div className="app">
      <h1>Calculadora</h1>
      <Display value={expresion || '0'} />
      <Botones onButtonClick={handleButtonClick} />
    </div>
  );
};

export default App;
