// import './App.css';
// import IncContador from './components/IncContador';
// import { useState } from 'react';

// function App() {
//   const [num, setNum] = useState(0);

//   const incrementar = () => setNum(num + 1);
//   const decrementar = () => setNum(num - 1);
//   const limpiar = () => setNum(0);

//   return (
//     <>
//       <h1>Contador pulsaciones</h1>
//       <IncContador
//         num={num} // Pasa el estado num como prop
//         incrementar={incrementar} // Pasa la función incrementar como prop
//         decrementar={decrementar} // Pasa la función decrementar como prop
//         limpiar={limpiar} // Pasa la función limpiar como prop
//       />
//     </>
//   );
// }

// export default App;


// App.js
import React, { Component } from 'react';
import './App.css';
import IncContador from './components/IncContador';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
    };
  }

  incrementar = () => {
    this.setState({ num: this.state.num + 1 });
  };

  decrementar = () => {
    this.setState({ num: this.state.num - 1 });
  };

  limpiar = () => {
    this.setState({ num: 0 });
  };

  render() {
    return (
      <>
        <h1>Contador pulsaciones</h1>
        <IncContador
          num={this.state.num} // Pasamos el estado num como prop
          incrementar={this.incrementar} // Pasamos la función incrementar como prop
          decrementar={this.decrementar} // Pasamos la función decrementar como prop
          limpiar={this.limpiar} // Pasamos la función limpiar como prop
        />
      </>
    );
  }
}

export default App;
