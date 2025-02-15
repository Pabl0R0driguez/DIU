import React, { Component } from "react";
import AgendaDataService from "../services/agenda.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Inicio.css";
import { Card, Button, Container, Row, Col, Form, Collapse } from "react-bootstrap";

export default class Inicio extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchPersona = this.onChangeSearchPersona.bind(this);
    this.retrievePersonas = this.retrievePersonas.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePersona = this.setActivePersona.bind(this);
    this.removePersona = this.removePersona.bind(this);
    this.searchPersona = this.searchPersona.bind(this);
    this.togglePersonaDetails = this.togglePersonaDetails.bind(this);
    this.updatePersonaInList = this.updatePersonaInList.bind(this);  // Nueva función

    this.state = {
      personas: [],
      currentPersona: null,
      currentIndex: -1,
      searchPersona: "",
      expandedIndex: null,
      selectedIndex: null,
    };
  }

  componentDidMount() {
    this.retrievePersonas();
  }

  onChangeSearchPersona(e) {
    const searchPersona = e.target.value;
    this.setState({ searchPersona });
  }

  togglePersonaDetails(index) {
    this.setState({
      expandedIndex: this.state.expandedIndex === index ? null : index,
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

  // Nueva función para actualizar una persona en el estado sin hacer una recarga total
  updatePersonaInList(updatedPersona) {
    this.setState(prevState => ({
      personas: prevState.personas.map(persona =>
        persona.id === updatedPersona.id ? updatedPersona : persona
      )
    }));
  }

  selectPersona(index) {
    this.setState({
      selectedIndex: index,
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

  removePersona(persona) {
    if (!persona) return;
    AgendaDataService.deletePersona(persona.id)
      .then((response) => {
        this.refreshList();
      })
      .catch((e) => {
        console.error("Error al eliminar la persona:", e);
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
    const { searchPersona, personas, selectedIndex, currentPersona, expandedIndex } = this.state;

    return (
      <Container className="mt-5">
        <Row className="mb-3 align-items-center buscador-container">
          <Col md={12}>
            <div className="d-flex">
              <Form.Control
                type="text"
                placeholder="Buscar por nombre"
                value={searchPersona}
                onChange={this.onChangeSearchPersona}
                className="buscador-input"
              />
              <Button
                variant="primary"
                size="sm"
                className="buscador-btn"
                onClick={this.searchPersona}
              >
                Buscar
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="mt-2 cartas-container">
          {personas &&
            personas.map((persona, index) => (
              <Col md={5} lg={3} className="mb-3" key={persona.id}>
                <Card
                  className={`h-100 p-3 ${selectedIndex === index ? "border-primary" : ""}`}
                  onClick={() => this.selectPersona(index)}
                  style={{
                    cursor: "pointer",
                    fontFamily: "'Poppins', sans-serif",
                    minHeight: "250px",
                    textAlign: "center",
                  }}
                >
                  <Card.Body
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{ height: "100%" }}
                  >
                    <Card.Title
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "600",
                        textAlign: "center",
                        marginBottom: "1rem",
                      }}
                    >
                      {persona.nombre} {persona.apellido}
                    </Card.Title>

                    {selectedIndex === index && (
                      <Button
                        variant="info"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          this.togglePersonaDetails(index);
                        }}
                      >
                        Ver Detalles
                      </Button>
                    )}

                    <Collapse in={expandedIndex === index}>
                      <div className="mt-3">
                        <div className="detail-item">
                          <strong>Dirección:</strong> {persona.direccion}
                        </div>
                        <div className="detail-item">
                          <strong>Código Postal:</strong> {persona.codigoPostal}
                        </div>
                        <div className="detail-item">
                          <strong>Ciudad:</strong> {persona.ciudad}
                        </div>
                        <div className="detail-item">
                          <strong>Fecha de Nacimiento:</strong> {persona.fechaNacimiento}
                        </div>
                        <Link to={`/editar/${persona.id}`} className="btn btn-warning mt-2">
                          Editar
                        </Link>
                        
                          <Button
                          variant="danger"
                          className="mt-2 ml-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            this.removePersona(persona);
                          }}
                        >
                          Eliminar
                        </Button>

                          <Link  to={`/añadirtutoriales/`}> 
                        <Button
                          variant="danger"
                          className="mt-2 ml-2"
                        >
                          Tutoriales
                        </Button>
                        </Link>
                        
                      </div>
                    </Collapse>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    );
  }
}
