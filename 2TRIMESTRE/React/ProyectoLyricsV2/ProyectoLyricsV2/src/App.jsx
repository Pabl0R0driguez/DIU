import React, { Component } from 'react';
import './App.css';
import Tabla from './components/Tabla.jsx';
import Formulario from './components/Formulario';

class App extends Component {
  constructor() {
    super();
    this.state = {
      artista: "", 
      cancion:"",
      letra: []
    };
  }

  // Actualiza el estado según el input
  handleChange = (input, value) => {
    this.setState({ [input]: value });
  };



  // Busca la letra de la canción
  buscar = () => {
    fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(this.state.artista)}/${encodeURIComponent(this.state.cancion)}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        // Añade la letra como una nueva fila
        this.setState((prevState) => ({
          letra: [...prevState.letra, { texto: data.lyrics || "Letra no encontrada" }]
        }));
      })
      .catch((error) => {
        console.error("Error al buscar la canción:", error);
      });
  };

   

  render() {
    return (
      <>
        <h1>Buscador de canciones</h1>
        <Formulario
          artista={this.state.artista}
          cancion={this.state.cancion}
          inputChange={this.handleChange}
          buscar={this.buscar}
        />
        <Tabla
          letra={this.state.letra}
        />
      </>
    );
  }
}

export default App;