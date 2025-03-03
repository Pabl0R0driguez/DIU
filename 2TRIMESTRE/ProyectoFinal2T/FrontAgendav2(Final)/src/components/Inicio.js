import React, { useContext, useState, useEffect } from "react";
import AgendaDataService from "../services/agenda.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Inicio.css";
import { Modal, Button, Container, Row, Col, Form, Table, ProgressBar } from "react-bootstrap"; // Importamos ProgressBar
import informacion from "../assets/informacion.png";
import editar from "../assets/editar.png";
import borrar from "../assets/borrar.png";
import { UserContext } from "../provider/UserProvider";
import buscar1 from "../assets/buscar1.png";
import { motion } from "framer-motion";

const Inicio = () => {
  const [personas, setPersonas] = useState([]); // Personas filtradas que se están mostrando
  const [allPersonas, setAllPersonas] = useState([]); // Todas las personas de la base de datos
  const [searchPersona, setSearchPersona] = useState(""); // Valor de la búsqueda
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [modalState, setModalState] = useState("informacion");
  const [tutorials, setTutorials] = useState([]);
  const userContext = useContext(UserContext);

  // Total de personas para la barra de progreso (fijo en 50)
  const totalPersonas = 50; 

  useEffect(() => {
    retrievePersonas();
  }, []);

  const onChangeSearchPersona = (e) => {
    setSearchPersona(e.target.value);
  };

  const retrievePersonas = () => {
    AgendaDataService.getAllPersonas()
      .then((response) => {
        setAllPersonas(response.data); // Guardamos todas las personas obtenidas
        setPersonas(response.data); // Inicializamos la lista de personas
      })
      .catch((e) => console.log(e));
  };

  const searchPersonaFunction = () => {
    if (!searchPersona.trim()) {
      setPersonas(allPersonas); // Si no hay filtro, restauramos la lista completa
      return;
    }

    AgendaDataService.findByNombre(searchPersona)
      .then((response) => setPersonas(response.data)) // Actualizamos la lista filtrada
      .catch((e) => console.error("Error en la búsqueda:", e));
  };

  const handlePersonaClick = (persona) => {
    setSelectedPersona(persona);
    setModalState("informacion");
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

  const showTutorials = (persona) => {
    setTutorials(persona.tutoriales || []);
    setModalState("tutoriales");
  };

  const volverTutorialModal = () => {
    setModalState("informacion");
  };

  const cerrarTutorialModal = () => {
    setModalState("");
  };

  const progreso = (allPersonas.length / totalPersonas) * 100;

  return (
    <div className="fondo-container">
      <Container id="contenido" className="mt-5">
       
        {/* Buscar personas */}
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

         {/* Barra de progreso */}
         <Row className="mb-3 progress-container">
          <Col md={8}>
            <ProgressBar now={progreso} label={`${Math.round(progreso)}%`} />
          </Col>
        </Row>


        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6} className="text-center">
            <h2 className="contactos-title">Contactos</h2>
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
