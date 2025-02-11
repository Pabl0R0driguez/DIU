import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import AgendaDataService from "../services/agenda.service";

import { Link } from "react-router-dom";
import '../styles/tutorials.styles.css'; // Importar estilos personalizados

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrievePersonas = this.retrievePersonas.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    //Hacemos el bind de los métodos porque al usar estos métodos en gestores de eventos los componentes basados
    //en clases pierden el ámbito.
    this.state = {
      tutorials: [], //lista de tutoriales
      currentTutorial: null, //tutorial seleccionado de la lista
      currentIndex: -1,
      searchTitle: ""
    };
  }

  //Cuando se carga el componente, se realiza la petición de tutoriales a la API
  //El método retrieveTutorials provoca la actualización del estado, y por tanto la re-renderización del componente
  componentDidMount() {
    this.retrievePersonas();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  


  retrievePersonas() {
    AgendaDataService.getAllPersonas()
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePersonas();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  removeAllTutorials() {
    TutorialDataService.deleteAllTutorial()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    TutorialDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, tutorials, currentTutorial, currentIndex } = this.state;
    //ponemos los distintos elementos del estado en variables para simplificar su acceso dentro del método
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Tutorials List</h4>

          <ul className="list-group">
            {/*El operedor && lógico. Los dos elementos tienen que ser true, en este caso no vacio, para que se ejecute la sentencia */}
            {/*si tutorials está vacio , no se ejecuta el map*/}

            {tutorials &&
              tutorials.map((tutorial, index) => (
                <li
              /* Cambiamos la clase del elemento de la lista seleccionado. Ponemos fondo azul*/
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTutorials}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {/*Renderizado condicional. Si current tutorial el null se dibuja lo de abajo. Si no,*/}
          {/*se dibuja "Please click on a Tutorial..." ver más abajo.*/}
          {currentTutorial ? (
            <div>
              <h4>Personas</h4>
              <div>
                <label>
                  <strong>Nombre:</strong>
                </label>{" "}
                {currentTutorial.nombre}
              </div>
              <div>
                <label>
                  <strong>Apellidos:</strong>
                </label>{" "}
                {currentTutorial.apellido}
              </div>
              <div>
                <label>
                  <strong>Dirección:</strong>
                </label>{" "}
                {currentTutorial.direccion}
              </div>
              <div>
                <label>
                  <strong>Código Postal:</strong>
                </label>{" "}
                {currentTutorial.codigoPostal}
              </div>

              <div>
                <label>
                  <strong>Ciudad:</strong>
                </label>{" "}
                {currentTutorial.ciudad}
              </div>

              <div>
                <label>
                  <strong>Fecha de Nacimiento:</strong>
                </label>{" "}
                {currentTutorial.fechaNacimiento}
              </div>

              <Link
                //Como hemos incluido en el switch esta ruta, /tutorials/+id se renderizará el componente
                // tutorials cuando se pulse el enlace.
                to={"/tutorials/" + currentTutorial.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
