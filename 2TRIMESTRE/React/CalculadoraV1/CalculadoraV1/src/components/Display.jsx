// Este componente se encargará de mostrar el resultado de la operación.
import React from 'react';
import './Display.css';

// Usamos la prop value que le pasamos en el App 
export const Display = ({ value }) => (
  <div className="display">
    {value} {/* Valor que se mostrará en la pantalla de la calculadora */}
  </div>
);

export default Display;
