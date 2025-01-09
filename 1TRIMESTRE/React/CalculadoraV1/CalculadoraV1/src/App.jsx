import React, { Component } from 'react';
import './App.css';  // Importamos el archivo CSS
import Botones from './components/Botones';  // Importamos el componente Botones

class App extends Component {
  render() {
    return (
      <div className="appContainer">
        <h1 className="title">Calculadora</h1>
        <Botones />  {/* Aquí agregamos el componente Botones que contiene la interfaz */}
      </div>
    );
  }
}

export default App;
