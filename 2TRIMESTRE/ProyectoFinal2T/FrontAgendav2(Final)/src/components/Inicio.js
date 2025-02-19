import React, { useContext,useState, useEffect } from "react";
import AgendaDataService from "../services/agenda.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Inicio.css";
import { Card, Button, Container, Row, Col, Form, Collapse, ProgressBar } from "react-bootstrap";
import informacion from "../assets/informacion.png";
import editar from "../assets/editar.png";
import borrar from "../assets/borrar.png";
import { UserContext } from "../provider/UserProvider";


const Inicio = () => {
  const [personas, setPersonas] = useState([]);
  const [searchPersona, setSearchPersona] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const userContext = useContext(UserContext);



  useEffect(() => {
    retrievePersonas();
  }, []);

  const onChangeSearchPersona = (e) => {
    setSearchPersona(e.target.value);
  };

  const togglePersonaDetails = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const retrievePersonas = () => {
    AgendaDataService.getAllPersonas()
      .then((response) => {
        setPersonas(response.data);
        updateProgress(response.data.length);
      })
      .catch((e) => console.log(e));
  };

  const updateProgress = (total) => {
    const maxPersonas = 50;
    setProgress(Math.min((total / maxPersonas) * 100, 100));
  };

  const removePersona = (persona) => {
    if (!persona || !persona.id) {
      console.error("Persona o persona.id no válidos", persona);
      return;
    }

    AgendaDataService.deletePersona(persona.id)
      .then(() => retrievePersonas())
      .catch((e) => console.error("Error al eliminar la persona:", e));
  };

  const searchPersonaFunction = () => {
    if (!searchPersona.trim()) {
      retrievePersonas();
      return;
    }

    AgendaDataService.findByNombre(searchPersona)
      .then((response) => setPersonas(response.data))
      .catch((e) => console.error("Error en la búsqueda:", e));
  };

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
              placeholder="Buscar por nombre"
              value={searchPersona}
              onChange={onChangeSearchPersona}
              className="form-control-lg"
            />
            <Button variant="primary" size="sm" className="buscador-btn" onClick={searchPersonaFunction}>
              Buscar
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mt-2 cartas-container">
        {personas.map((persona, index) => (
          <Col md={5} lg={3} className="mb-3" key={persona.id}>
            <Card
              className={`h-100 p-3 ${selectedIndex === index ? "border-primary" : ""}`}
              onClick={() => setSelectedIndex(selectedIndex === index ? null : index)}
              style={{ cursor: "pointer", fontFamily: "'Poppins', sans-serif", minHeight: "250px", textAlign: "center" }}
            >
              <Card.Body className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100%" }}>
                <Card.Title style={{ fontSize: "1.5rem", fontWeight: "600", textAlign: "center", marginBottom: "1rem" }}>
                  {persona.nombre} {persona.apellido}
                </Card.Title>

                {selectedIndex === index && (
                  <Button variant="info" size="sm" onClick={(e) => { e.stopPropagation(); togglePersonaDetails(index); }}>
                    {expandedIndex === index ? "Ocultar Detalles" : "Ver Detalles"}
                  </Button>
                )}

                <Collapse in={expandedIndex === index}>
                  <div className="mt-3">
                    <div className="detail-item"><strong>Dirección:</strong> {persona.direccion}</div>
                    <div className="detail-item"><strong>Código Postal:</strong> {persona.codigoPostal}</div>
                    <div className="detail-item"><strong>Ciudad:</strong> {persona.ciudad}</div>
                    <div className="detail-item"><strong>Fecha de Nacimiento:</strong> {persona.fechaNacimiento}</div>
                    <div className="detail-item">
                      <strong>Tutoriales:</strong> {persona.tutoriales?.length > 0 ? persona.tutoriales.join(", ") : "Ninguno"}
                    </div>
                    <div className="button-container">
                    {!userContext ? ( ""): 
                      <Link to={`/editar/${persona.id}`} className="btn btn-sm square-btn mt-2" style={btnStyle("#ffc107")}>
                        <img src={editar} alt="Editar" className="icon-btn" style={iconStyle} />
                      </Link>}
                      {!userContext ? ( ""): 
                      <Button variant="danger" className="btn-sm square-btn mt-2" onClick={(e) => { e.stopPropagation(); removePersona(persona); }} style={btnStyle("#d32f2f")}>
                        <img src={borrar} alt="Eliminar" className="icon-btn" style={iconStyle} />
                      </Button>}

                      <Link to={{ pathname: `/tutoriales/`, state: { tutoriales: persona.tutoriales || [] } }} className="btn btn-sm square-btn mt-2" style={btnStyle("#4caf50")}>
                        <img src={informacion} alt="Tutoriales" className="icon-btn" style={iconStyle} />
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
};

const btnStyle = (bgColor) => ({
  backgroundColor: bgColor,
  border: "none",
  width: "50px",
  height: "50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const iconStyle = {
  width: "80%",
  height: "80%",
  objectFit: "contain",
};

export default Inicio;
