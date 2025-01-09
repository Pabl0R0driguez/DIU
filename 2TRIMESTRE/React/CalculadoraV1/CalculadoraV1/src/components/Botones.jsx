// src/components/Botones.js
import React from 'react';
import './Botones.css';

const Botones = ({ onButtonClick }) => {
  const buttons = [
    'C', '+/-', '%', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '='
  ];

  return (
    <div className="botones">
      {buttons.map((btn) => (
        <button
          key={btn}
          onClick={() => onButtonClick(btn)}
          className={btn === '0' ? 'button double' : 'button'}
        >
          {btn}
        </button>
      ))}
    </div>
  );
};

export default Botones;
