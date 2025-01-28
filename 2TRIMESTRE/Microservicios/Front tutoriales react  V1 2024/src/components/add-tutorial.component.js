import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";

export default class TutorialAdd extends Component {
  // Defino las variables de estado del componente que voy a usar
  constructor(props) {
    super(props);
    this.state = {
      searchTitle: "", 
    };

    // Enlazo los métodos al contexto de la clase
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
  }

  // Creación de los métodos
  onChangeSearchTitle(event) {
    this.setState({
      searchTitle: event.target.value, // Actualiza el estado con el valor del input
    });
  }


  agregarTutorial() {
    const { searchTitle } = this.state; // Obtengo `searchTitle` del estado

    // Llamo al método de la API para agregar un tutorial
    TutorialDataService.create(searchTitle)
      .then((response) => {
        this.setState({
          searchTitle: response.data.title, // Actualizo el estado con el título del tutorial
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  // Estructura de la página
  render() {
    const { agregarTutorial } = this.state; // Obtengo `searchTitle` del estado

    return (
      <div>
      <form onSubmit={this.agregarTutorial}>

          <div>
            <h1>Añadir tutoriales</h1>
          </div>

          <div className="input-group mb-3">
            <input
              type="onSubmit"
              className="form-control"
              placeholder="Título del tutorial"
              value={this.state.searchTitle}
              onChange={this.onChangeSearchTitle}></input>
            </div>  
        
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="submit">
              Añadir
            </button> 
          </div>

        </form>
      </div>
    );
  }
}
