import React, { Component } from "react";
import AgendaDataService from "../services/agenda.service";
import { Link } from "react-router-dom";
import { Form, Button, ListGroup, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Inicio.css";

export default class Inicio extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchPersona = this.onChangeSearchPersona.bind(this);
    this.retrievePersonas = this.retrievePersonas.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePersona = this.setActivePersona.bind(this);
    this.removeAllPersonas = this.removeAllPersonas.bind(this);
    this.searchPersona = this.searchPersona.bind(this);

    this.state = {
      personas: [],
      currentPersona: null,
      currentIndex: -1,
      searchPersona: "",
    };
  }

  componentDidMount() {
    this.retrievePersonas();
  }

  onChangeSearchPersona(e) {
    const searchPersona = e.target.value;
    this.setState({ searchPersona: searchPersona });
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
    AgendaDataService.removeAllPersonas()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removePersona() {
    const { currentPersona } = this.state;
    AgendaDataService.removePersona(currentPersona.id)
      .then((response) => {
        this.setState({
          currentPersona: null,
          currentIndex: -1,
        });
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchPersona() {
    AgendaDataService.findByNombre(this.state.searchPersona)
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
    const { searchPersona, personas, currentIndex, currentPersona } = this.state;

    return (
      <Container className="mt-5">
        <Row className="mb-3">
          <Col md={12}>
            <Form.Control
              type="text"
              placeholder="Buscar por nombre"
              value={searchPersona}
              onChange={this.onChangeSearchPersona}
            />
          </Col>
          <Col md={12} className="mt-2">
            <Button variant="primary" size="lg" block onClick={this.searchPersona}>
              Buscar
            </Button>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={6}>
            <h4>Lista de personas</h4>
            <ListGroup>
              {personas &&
                personas.map((persona, index) => (
                  <ListGroup.Item
                    key={index}
                    action
                    active={index === currentIndex}
                    onClick={() => this.setActivePersona(persona, index)}
                  >
                    {persona.nombre} {persona.apellido}
                  </ListGroup.Item>
                ))}
            </ListGroup>

            <Button variant="danger" className="mt-3 w-100" onClick={this.removeAllPersonas}>
              Eliminar Todos
            </Button>
          </Col>

          {/* Aquí es donde hacemos que los detalles sean más grandes y alineados */}
          <Col md={6} className="details-col">
            {currentPersona ? (
              <div className="lista">
                <h4>Detalles de la Persona</h4>
                <div className="detail-item">
                  <strong>Nombre:</strong> {currentPersona.nombre}
                </div>
                <div className="detail-item">
                  <strong>Apellidos:</strong> {currentPersona.apellido}
                </div>
                <div className="detail-item">
                  <strong>Dirección:</strong> {currentPersona.direccion}
                </div>
                <div className="detail-item">
                  <strong>Código Postal:</strong> {currentPersona.codigoPostal}
                </div>
                <div className="detail-item">
                  <strong>Ciudad:</strong> {currentPersona.ciudad}
                </div>
                <div className="detail-item">
                  <strong>Fecha de Nacimiento:</strong> {currentPersona.fechaNacimiento}
                </div>

                <Link to={"/personas/" + currentPersona.id} className="btn btn-warning mt-3">
                  Editar
                </Link>
                <Button
                  variant="danger"
                  className="mt-3 ml-2"
                  onClick={() => this.removePersona()}
                  disabled={!currentPersona}
                >
                  Eliminar
                </Button>
              </div>
            ) : (
              <div>
                <br />
                <p>Por favor, haga clic en una persona...</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
