// Este componente se encargará de mostrar el resultado de la operación.

import React from 'react';
import './Display.css';

export const Display = ({ value }) => (
  <div className="display">
    {value}
  </div>
);

export default Display;
