import React, { Component } from "react";
import AgendaDataService from "../services/agenda.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Inicio.css";
import { Card, Button, Container, Row, Col, Form, Collapse } from "react-bootstrap";
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
        console.log(response.data)
        console.log("Dddddddddddddd")
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
    if (!persona || !persona.id) {
      console.error("Persona o persona.id no válidos", persona);
      return;
    }
  
    console.log("Eliminando persona con ID:", persona.id);  // Verifica que se pasa un ID válido
  
    AgendaDataService.deletePersona(persona.id)
      .then((response) => {
        console.log("Persona eliminada correctamente", response);
        this.refreshList(); // Refresca la lista para mostrar los cambios
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
                this.togglePersonaDetails(index);  // Toggle de los detalles
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
              <div className="button-container">
                {/* Botón de editar */}
                <Link
                  to={`/editar/${persona.id}`}  // Asegúrate de que la ruta esté bien formada
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
                    src={editar}  // Imagen de editar
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
                    e.stopPropagation(); // Evita que el evento se propague a la tarjeta
                    this.removePersona(persona);  // Elimina la persona
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
                    src={borrar}  // Imagen de eliminar
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
                  to={`/añadirtutoriales/`}
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
                    src={informacion}  // Imagen de tutoriales
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
  
     {/*  <footer className="w-100 text-center py-3">
        <Container className="spacing"> 
          <Row>
            <Col>
              <p>&copy; 2025 Tu Empresa. Todos los derechos reservados.</p>
              <p>
                <a href="/privacy-policy" className="text-decoration-none">Política de Privacidad</a> | 
                <a href="/terms-of-service" className="text-decoration-none"> Términos de Servicio</a>
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
 */}
        </Row>
      </Container>
    );
  }
}
