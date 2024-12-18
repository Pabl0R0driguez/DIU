// import ("./IncContador.css")

// function IncContador({ num, incrementar, decrementar, limpiar }) {
//     return (
//       <div>
//         <div>
//           <h1 className="numero">{num}</h1> {/* Muestra el valor de num */}
//         </div>
//         <div className="botones">
//           <button onClick={incrementar}>Incrementar</button> 
//           <button onClick={decrementar}>Decrementar</button>
//           <button onClick={limpiar}>Limpiar</button> 
//         </div>
//       </div>
//     );
//   }
  
//   export default IncContador;
  

import React, { Component } from 'react';
import '../styles/counterApp.css';

class IncContador extends Component {
  render() {
    const { num, incrementar, decrementar, limpiar } = this.props; // Recibimos las props

    return (
      <div className="container-counter">
        <div className="counter">
          <h1>{num}</h1> {/* Muestra el valor de num */}
        </div>
        <div className="buttons">
          <button className="incButton" onClick={incrementar}>Incrementar</button>
          <button onClick={decrementar}>Decrementar</button>
          <button onClick={limpiar}>Limpiar</button>
        </div>
      </div>
    );
  }
}

export default IncContador;
