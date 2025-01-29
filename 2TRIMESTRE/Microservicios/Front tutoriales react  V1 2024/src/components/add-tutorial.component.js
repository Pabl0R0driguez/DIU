import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import "./add.css"

export default class TutorialAdd extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
     
      searchTitle: "", 
      searchDescription: "",
      searchPublished: "" 
    };

    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.onChangeSearchDescription = this.onChangeSearchDescription.bind(this);
    this.onChangeCheckBox = this.onChangeCheckBox.bind(this);

    this.agregarTutorial = this.agregarTutorial.bind(this);
  }

  onChangeSearchTitle(event) {
    this.setState({
      searchTitle: event.target.value,
    });
  }

  onChangeSearchDescription(event) {
    this.setState({
       searchDescription: event.target.value });
  }

  onChangeCheckBox(option) {
    this.setState({
       searchPublished: option });
  }

  agregarTutorial(event) {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    const { searchTitle, searchDescription, searchPublished } = this.state;

    // Llamo al método de la API para agregar un tutorial
    TutorialDataService.create({
      title: searchTitle, 
      description: searchDescription,
      published: searchPublished === "publicado" // Verifica si es "publicado"
    })
      .then(() => {
        this.setState({
          searchTitle: "",
          searchDescription: "",
          searchPublished: "" 
        });
        
        this.props.onTutorialAdded();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.agregarTutorial}>
          <div>
            <h1>Añadir tutoriales</h1>
          </div>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Título del tutorial"
              value={this.state.searchTitle}
              onChange={this.onChangeSearchTitle}
              required
            />
          </div>  

          <div className="input-group-append">
            <input
              type="text"
              className="form-control"            
              placeholder="Descripción del tutorial"
              value={this.state.searchDescription}
              onChange={this.onChangeSearchDescription}
              required
            />
          </div>

          <div>
            <label>
              <input
                className="form-check-input"
                type="radio"
                name="published"
                value="publicado"
                checked={this.state.searchPublished === "publicado"}
                onChange={() => this.onChangeCheckBox("publicado")}
              />
              Publicado
            </label>

            <label>
              <input
                className="form-check-input"
                type="radio"
                name="published"
                value="no-publicado"
                checked={this.state.searchPublished === "no-publicado"}
                onChange={() => this.onChangeCheckBox("no-publicado")}
              />
              No publicado
            </label>
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
