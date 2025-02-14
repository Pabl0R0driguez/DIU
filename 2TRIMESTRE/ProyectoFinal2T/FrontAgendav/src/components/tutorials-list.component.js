import React, { Component } from "react";
import AgendaDataService from "../services/agenda.service";
import { Link } from "react-router-dom";

export default class PersonasList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrievePersonas = this.retrievePersonas.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePersona = this.setActivePersona.bind(this);
    this.removeAllPersonas = this.removeAllPersonas.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.state = {
      personas: [],
      currentPersona: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.retrievePersonas();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;
    this.setState({
      searchTitle: searchTitle,
    });
  }

  retrievePersonas() {
    AgendaDataService.getAllPersonas()
      .then((response) => {
        this.setState({
          personas: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePersonas();
    this.setState({
      currentPersona: null,
      currentIndex: -1,
    });
  }

  setActivePersona(persona, index) {
    this.setState({
      currentPersona: persona,
      currentIndex: index,
    });
  }

  removeAllPersonas() {
    AgendaDataService.deleteAllPersonas()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchTitle() {
    AgendaDataService.findByTitle(this.state.searchTitle)
      .then((response) => {
        this.setState({
          personas: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, personas, currentPersona, currentIndex } = this.state;

    return (
      <div className="page-container">
      
      

        <div className="content-container">
          {/* Search Section */}
          <div className="search-section">
            <div className="search-container">
              <input
                type="text"
                className="form-control search-input"
                placeholder="Buscar por nombre"
                value={searchTitle}
                onChange={this.onChangeSearchTitle}
              />
              <button
                className="btn btn-primary search-btn"
                onClick={this.searchTitle}
              >
                Buscar
              </button>
            </div>
          </div>

          <div className="row">
            {/* List of Personas */}
            <div className="col-md-6 persona-list">
              <h4>Lista de Personas</h4>
              <ul className="list-group">
                {personas &&
                  personas.map((persona, index) => (
                    <li
                      key={index}
                      className={
                        "list-group-item persona-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActivePersona(persona, index)}
                    >
                      {persona.nombre} {persona.apellido}
                    </li>
                  ))}
              </ul>

              <button
                className="m-3 btn btn-danger btn-sm"
                onClick={this.removeAllPersonas}
              >
                Eliminar Todos
              </button>
            </div>

            {/* Persona Details */}
            <div className="col-md-6 persona-details">
              {currentPersona ? (
                <div>
                  <h4>Detalles de la Persona</h4>
                  <div>
                    <label>
                      <strong>Nombre:</strong>
                    </label>{" "}
                    {currentPersona.nombre}
                  </div>
                  <div>
                    <label>
                      <strong>Apellidos:</strong>
                    </label>{" "}
                    {currentPersona.apellido}
                  </div>
                  <div>
                    <label>
                      <strong>Dirección:</strong>
                    </label>{" "}
                    {currentPersona.direccion}
                  </div>
                  <div>
                    <label>
                      <strong>Código Postal:</strong>
                    </label>{" "}
                    {currentPersona.codigoPostal}
                  </div>
                  <div>
                    <label>
                      <strong>Ciudad:</strong>
                    </label>{" "}
                    {currentPersona.ciudad}
                  </div>
                  <div>
                    <label>
                      <strong>Fecha de Nacimiento:</strong>
                    </label>{" "}
                    {currentPersona.fechaNacimiento}
                  </div>

                  <Link
                    to={"/personas/" + currentPersona.id}
                    className="badge badge-warning"
                  >
                    Editar
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Por favor, haga clic en una persona...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
