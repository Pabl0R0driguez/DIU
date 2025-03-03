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
import { motion } from "framer-motion"; // Importamos framer-motion

const Inicio = () => {
  const [personas, setPersonas] = useState([]);
  const [searchPersona, setSearchPersona] = useState("");
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [modalState, setModalState] = useState("informacion"); // Estado para controlar qué modal mostrar
  const [tutorials, setTutorials] = useState([]); // Para almacenar los tutoriales asociados
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
    setModalState("informacion"); // Mostrar el modal de información por defecto al seleccionar una persona
  };

  const closeModal = () => {
    setSelectedPersona(null); // Limpiar persona seleccionada
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

  const showTutorials = (persona) => {
    setTutorials(persona.tutoriales || []); // Cargamos los tutoriales de la persona
    setModalState("tutoriales"); // Cambiar el estado para mostrar el modal de tutoriales
  };

  const volverTutorialModal = () => {
    setModalState("informacion"); // Al cerrar el modal de tutoriales, volvemos al de información
  };

  const cerrarTutorialModal = () => {
    setModalState(""); // Al cerrar el modal de tutoriales, volvemos al de información
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

           {/* 🔹 TÍTULO "CONTACTOS" RESPONSIVO */}
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} className="text-center">
          <h2 className="contactos-title">Contactos</h2>
        </Col>
      </Row>

        <Row className="mt-2 tabla-container">
          <Table striped bordered hover responsive className="modern-table">
            <thead>
              <tr>
                <th className="N">Nombre</th>
                <th className="A">Apellido</th>
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

        {/* Modal de Información de la Persona */}
        {modalState === "informacion" && selectedPersona && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="custom-modal-container"
          >
            <Modal show={true} onHide={closeModal} className="custom-modal">
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
                  
                  </>
                )}
                  <Button
                      variant="link"
                      onClick={() => showTutorials(selectedPersona)}
                      style={btnStyle("#4caf50")}
                    >
                      <img src={informacion} alt="Información" className="icon-btn" style={iconStyle} />
                    </Button>
              </Modal.Footer>
            </Modal>
          </motion.div>
        )}

        {/* Modal de Tutoriales */}
        {modalState === "tutoriales" && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="tutorial-modal-container"
          >
            <Modal show={true} onHide={cerrarTutorialModal}>
              <Modal.Header closeButton>
                <Modal.Title>Tutoriales</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {tutorials.length > 0 ? (
                  <ul>
                    {tutorials.map((tutorial, index) => (
                      <li key={index}>{tutorial}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay tutoriales disponibles.</p>
                )}
              </Modal.Body>
              <Modal.Footer>
             

                  <Button variant="primary" onClick={volverTutorialModal} className="btn-volver-cerrar">
                    Volver
                  </Button>

                  <Button variant="danger" onClick={cerrarTutorialModal} className="btn-volver-cerrar">
                    Cerrar
                  </Button>

                  

              </Modal.Footer>
            </Modal>
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default Inicio;
