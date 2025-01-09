import React, { Component } from 'react';
import './Botones.css'; // Importamos el archivo CSS

class Botones extends Component {
  render() {
    return (
      <div className="container">
        {/* Display de la calculadora */}
        <div className="display">
          <span className="value">0</span>
        </div>

        {/* Fila de botones */}
        <div className="row">
          <button className="button">C</button>
          <button className="button">+/-</button>
          <button className="button">%</button>
          <button className="buttonAccent">/</button>
        </div>
        
        <div className="row">
          <button className="button">7</button>
          <button className="button">8</button>
          <button className="button">9</button>
          <button className="buttonAccent">X</button>
        </div>

        <div className="row">
          <button className="button">4</button>
          <button className="button">5</button>
          <button className="button">6</button>
          <button className="buttonAccent">-</button>
        </div>

        <div className="row">
          <button className="button">1</button>
          <button className="button">2</button>
          <button className="button">3</button>
          <button className="buttonAccent">+</button>
        </div>

        <div className="row">
          <button className="button double">0</button>
          <button className="button">.</button>
          <button className="buttonAccent">=</button>
        </div>
      </div>
    );
  }
}

export default Botones;
