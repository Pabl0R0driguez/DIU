import React, { Component } from "react";
import AgendaDataService from "../services/agenda.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Inicio.css";
import { Card, Button, Container, Row, Col, Form, Collapse, ProgressBar } from "react-bootstrap";
import informacion from "../assets/informacion.png";
import editar from "../assets/editar.png";
import borrar from "../assets/borrar.png";

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
    this.updatePersonaInList = this.updatePersonaInList.bind(this);

    this.state = {
      personas: [],
      currentPersona: null,
      currentIndex: -1,
      searchPersona: "",
      expandedIndex: null,
      selectedIndex: null,
      progress: 0
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
        console.log(response.data);
        this.setState({
          personas: response.data,
        }, () => { this.updateProgress(); });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateProgress() {
    const maxPersonas = 50; 
    const currentProgress = (this.state.personas.length / maxPersonas) * 100;
    this.setState({
      progress: Math.min(currentProgress, 100), // Para asegurarse de no superar el 100%
    });
  }

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
    if (!persona || !persona.id) {
      console.error("Persona o persona.id no válidos", persona);
      return;
    }

    console.log("Eliminando persona con ID:", persona.id);

    AgendaDataService.deletePersona(persona.id)
      .then((response) => {
        console.log("Persona eliminada correctamente", response);
        this.refreshList();
      })
      .catch((e) => {
        console.error("Error al eliminar la persona:", e);
      });
  }

  searchPersona() {
    const { searchPersona } = this.state;
    console.log("Buscando por nombre:", searchPersona);

    if (!searchPersona.trim()) {
      this.retrievePersonas();
      return;
    }

    AgendaDataService.findByNombre(searchPersona)
      .then((response) => {
        this.setState({ personas: response.data });
      })
      .catch((e) => {
        console.error("Error en la búsqueda:", e);
      });
  }

  render() {
    const { searchPersona, personas, selectedIndex, progress, expandedIndex } = this.state;

    return (
      <Container className="mt-5">

        <Row className="mb-4">
          <Col md={12}>
            <h4 className="text-center">Progreso de Tutoriales</h4>
            <ProgressBar animated now={progress} label={`${Math.round(progress)}%`} />
          </Col>
        </Row>

        <Row className="mb-3 align-items-center buscador-container">
          <Col md={12}>
            <div className="d-flex">
              <Form.Control
                type="text"
                placeholder="Search by title"
                value={searchPersona}
                onChange={this.onChangeSearchPersona}
                className="form-control-lg"
              />
              <Button
                variant="primary"
                size="sm"
                className="buscador-btn"
                onClick={() => this.searchPersona()}
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
                  onClick={() => this.setState({ selectedIndex: selectedIndex === index ? -1 : index })}
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
                        {expandedIndex === index ? "Ocultar Detalles" : "Ver Detalles"}
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
                        <div className="detail-item">
                          <strong>Tutoriales:</strong>{" "}
                          {persona.tutoriales && persona.tutoriales.length > 0
                            ? persona.tutoriales.join(", ")
                            : "Ninguno"}
                        </div>
                        <div className="button-container">
                          {/* Botón de editar */}
                          <Link
                            to={`/editar/${persona.id}`}
                            className="btn btn-sm square-btn mt-2"
                            style={{
                              backgroundColor: '#ffc107',
                              border: 'none',
                              width: '50px',
                              height: '50px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            <img
                              src={editar}
                              alt="Editar"
                              className="icon-btn"
                              style={{
                                width: '80%',
                                height: '80%',
                                objectFit: 'contain'
                              }}
                            />
                          </Link>

                          {/* Botón de eliminar */}
                          <Button
                            variant="danger"
                            className="btn-sm square-btn mt-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              this.removePersona(persona);
                            }}
                            style={{
                              backgroundColor: '#d32f2f',
                              border: 'none',
                              width: '50px',
                              height: '50px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            <img
                              src={borrar}
                              alt="Eliminar"
                              className="icon-btn"
                              style={{
                                width: '80%',
                                height: '80%',
                                objectFit: 'contain'
                              }}
                            />
                          </Button>

                          {/* Botón de tutoriales */}
                          <Link
                            to={{
                              pathname: `/tutoriales/`,
                              state: { tutoriales: persona.tutoriales || []} // Si no hay tutoriales lista vacía (mirar)
                            }}
                            className="btn btn-sm square-btn mt-2"
                            style={{
                              backgroundColor: '#4caf50',
                              border: 'none',
                              width: '50px',
                              height: '50px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            <img
                              src={informacion}
                              alt="Tutoriales"
                              className="icon-btn"
                              style={{
                                width: '80%',
                                height: '80%',
                                objectFit: 'contain'
                              }}
                            />
                          </Link>
                        </div>
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
