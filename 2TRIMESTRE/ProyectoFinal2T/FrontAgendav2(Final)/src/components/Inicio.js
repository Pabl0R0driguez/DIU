import React, { useContext, useState, useEffect } from "react";
import AgendaDataService from "../services/agenda.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Inicio.css";
import { Modal, Button, Container, Row, Col, Form, Table } from "react-bootstrap";
import informacion from "../assets/informacion.png";
import editar from "../assets/editar.png";
import borrar from "../assets/borrar.png";
import { UserContext } from "../provider/UserProvider";
import buscar1 from "../assets/buscar1.png";
import "../styles/Inicio.css";

const Inicio = () => {
  const [personas, setPersonas] = useState([]);
  const [searchPersona, setSearchPersona] = useState("");
  const [selectedPersona, setSelectedPersona] = useState(null);
  const userContext = useContext(UserContext);

  useEffect(() => {
    retrievePersonas();
  }, []);

  const onChangeSearchPersona = (e) => {
    setSearchPersona(e.target.value);
  };

  const retrievePersonas = () => {
    AgendaDataService.getAllPersonas()
      .then((response) => setPersonas(response.data))
      .catch((e) => console.log(e));
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

  const removePersona = (persona) => {
    AgendaDataService.deletePersona(persona.id)
      .then(() => retrievePersonas())
      .catch((e) => console.error("Error al eliminar la persona:", e));
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

  return (
    <div className="fondo-container">
      <Container id="contenido" className="mt-5">
        <Row className="mb-3 align-items-center buscador-container">
          <Col md={12}>
            <div className="d-flex">
              <Form.Control
                type="text"
                placeholder="Buscar por nombre"
                value={searchPersona}
                onChange={onChangeSearchPersona}
                className="modern-input"
              />
              <Button variant="link" onClick={searchPersonaFunction} className="search-btn">
                <img src={buscar1} alt="Buscar" className="search-icon" />
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="mt-2 tabla-container">
          <Table striped bordered hover responsive className="modern-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
              </tr>
            </thead>
            <tbody>
              {personas.map((persona) => (
                <tr
                  key={persona.id}
                  onClick={() => handlePersonaClick(persona)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{persona.nombre}</td>
                  <td>{persona.apellido}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>

        <Modal show={selectedPersona !== null} onHide={closeModal} className="custom-modal">
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
            {userContext && selectedPersona && selectedPersona.id && (
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
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default Inicio;
