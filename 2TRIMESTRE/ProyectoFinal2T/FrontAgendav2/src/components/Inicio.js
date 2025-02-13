import React, { Component } from "react";
import AgendaDataService from "../services/agenda.service";
import { Link } from "react-router-dom";
import { render } from "@testing-library/react";

export default class Inicio extends Component {

      // Constructor del componente
      constructor(props) {
            super(props);
            this.onChangeSearchPersona = this.onChangeSearchPersona.bind(this);
            this.retrievePersonas = this.retrievePersonas.bind(this);
            this.refreshList = this.refreshList.bind(this);
            this.setActivePersona = this.setActivePersona.bind(this);
            this.removeAllPersonas = this.removeAllPersonas.bind(this);
            this.searchPersona = this.searchPersona.bind(this);

            // Estado inicial del componente
            this.state = {
                  personas: [],
                  currentPersona: null,
                  currentIndex: -1,
                  searchPersona: "",
            };
      }

      // Se ejecuta al abrir la ventana
      componentDidMount() {
            this.retrievePersonas();
      }

      // Buscar por título
      onChangeSearchPersona(e) {
            const searchPersona = e.target.value;
            this.setState({ searchPersona: searchPersona });
      }

      // Obtener personas
      retrievePersonas() {
            AgendaDataService.getAllPersonas().then((response) => {
                  this.setState({
                        personas: response.data,
                  });
            }).catch((e) => {
                  console.log(e);
            });
      }

      // Actualizar lista
      refreshList() {
            this.retrievePersonas();
            this.setState({
                  currentPersona: null,
                  currentIndex: -1,
            });
      }

      // Establecer persona activa
      setActivePersona(persona, index) {
            this.setState({
                  currentPersona: persona,
                  currentIndex: index,
            });
      }

      // Borrar todas las personas
      removeAllPersonas() {
            AgendaDataService.removeAllPersonas().then((response) => {
                  console.log(response.data)
                  this.refreshList();
            }).catch((e) => {
                  console.log(e)
            });
      }

      // Borrar persona
      removePersona() {
            const { currentPersona } = this.state;
            AgendaDataService.removePersona(currentPersona.id).then((response) => {
                  this.setState({
                        currentPersona: null,
                        currentIndex: -1,
                  });
                  this.refreshList()
            })
                  .catch((e) => {
                        console.log(e)
                  })

      }

      // Buscar nombre
      searchPersona() {
            AgendaDataService.findByNombre(this.state.searchPersona)
                  .then((response) => {
                        this.setState({
                              personas: response.data
                        });
                  }).catch((e) => {
                        console.log(e)
                  })
      }

      render() {
            const { searchPersona, personas, currentIndex, currentPersona } = this.state;

            return (
                  <div className="container mt-5">
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Buscar por nombre"
                        value={searchPersona}
                        onChange={this.onChangeSearchPersona}
                      />
                    </div>
                    <div className="col-md-12 mt-2">
                      <button
                        className="btn btn-primary btn-lg w-100"
                        onClick={this.searchPersona}
                      >
                        Buscar
                      </button>
                    </div>
                  </div>
                
                  {/* Añadir más espacio entre los elementos */}
                  <div className="row mt-4">
                    <div className="col-md-6">
                      <h4>Lista de personas</h4>
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
                        className="btn btn-danger mt-3 w-100"
                        onClick={this.removeAllPersonas}
                      >
                        Eliminar Todos
                      </button>
                    </div>
                
                    <div className="col-md-6">
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
                
                          <Link to={"/personas/" + currentPersona.id} className="btn btn-warning mt-3">
                            Editar
                          </Link>
                          <button
                            className="btn btn-danger mt-3 ml-2"
                            onClick={this.removePersona}
                            disabled={!currentPersona}
                          >
                            Eliminar
                          </button>
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
                
                  
            );
      }
}