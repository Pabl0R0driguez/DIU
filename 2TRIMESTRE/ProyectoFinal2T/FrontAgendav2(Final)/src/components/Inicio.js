import React, { useContext, useState, useEffect } from "react";
import AgendaDataService from "../services/agenda.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Inicio.css";
import { Modal, Button, Container, Row, Col, Form, Table, ProgressBar } from "react-bootstrap";
import informacion from "../assets/informacion.png";
import editar from "../assets/editar.png";
import borrar from "../assets/borrar.png";
import { UserContext } from "../provider/UserProvider";
import Fondo from "../assets/videofondo.mp4"

const Inicio = () => {
  const [personas, setPersonas] = useState([]);
  const [searchPersona, setSearchPersona] = useState("");
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [progress, setProgress] = useState(0);
  const userContext = useContext(UserContext);

  useEffect(() => {
    retrievePersonas();
  }, []);

  const onChangeSearchPersona = (e) => {
    setSearchPersona(e.target.value);
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

  const handlePersonaClick = (persona) => {
    setSelectedPersona(persona);
  };

  const closeModal = () => {
    setSelectedPersona(null);
  };

  return (
    <Container className="mt-5">
      <video id="background-video" autoPlay muted loop>
        <source src= {Fondo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

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

      <Row className="mt-2 tabla-container">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
           
            </tr>
          </thead>
          <tbody>
            {personas.map((persona) => (
              <tr key={persona.id} onClick={() => handlePersonaClick(persona)} style={{ cursor: "pointer" }}>
                <td>{persona.nombre}</td>
                <td>{persona.apellido}</td>
             
               
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>

      {/* Modal para mostrar los detalles de la persona */}
      <Modal show={selectedPersona !== null} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de {selectedPersona?.nombre} {selectedPersona?.apellido}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="detail-item"><strong>Dirección:</strong> {selectedPersona?.direccion}</div>
          <div className="detail-item"><strong>Código Postal:</strong> {selectedPersona?.codigoPostal}</div>
          <div className="detail-item"><strong>Ciudad:</strong> {selectedPersona?.ciudad}</div>
          <div className="detail-item"><strong>Fecha de Nacimiento:</strong> {selectedPersona?.fechaNacimiento}</div>
          <div className="detail-item">
            <strong>Tutoriales:</strong> {selectedPersona?.tutoriales?.length > 0 ? selectedPersona?.tutoriales.join(", ") : "Ninguno"}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {!userContext ? null : (
            <>
              {selectedPersona && selectedPersona.id && (
                <>
                  <Link to={`/editar/${selectedPersona.id}`} className="btn btn-sm square-btn" style={btnStyle("#ffc107")}>
                    <img src={editar} alt="Editar" className="icon-btn" style={iconStyle} />
                  </Link>
                  <Button variant="danger" className="btn-sm square-btn" onClick={() => { removePersona(selectedPersona); closeModal(); }} style={btnStyle("#d32f2f")}>
                    <img src={borrar} alt="Eliminar" className="icon-btn" style={iconStyle} />
                  </Button>
                  <Link to={{ pathname: `/tutoriales/`, state: { tutoriales: selectedPersona.tutoriales || [] } }} className="btn btn-sm square-btn" style={btnStyle("#4caf50")}>
                    <img src={informacion} alt="Tutoriales" className="icon-btn" style={iconStyle} />
                  </Link>
                </>
              )}
            </>
          )}
        </Modal.Footer>
      </Modal>
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
