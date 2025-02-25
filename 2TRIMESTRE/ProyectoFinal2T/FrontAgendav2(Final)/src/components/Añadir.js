import React, { useState, useEffect } from 'react';
import AgendaDataService from '../services/agenda.service';
import TutorialDataService from '../services/tutorial.service';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import { Form, Button, Row, Col, Container, Card, Modal } from 'react-bootstrap';
import "../styles/Añadir.css";

function Añadir() {
  // Estado para los datos de la persona
  const [persona, setPersona] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    codigoPostal: '',
    ciudad: '',
    fechaNacimiento: '',
    // Campo para guardar los tutoriales asignados
    tutoriales: []
  });

  // Estados para la selección de tutoriales
  const [availableTutorials, setAvailableTutorials] = useState([]);
  const [selectedTutorials, setSelectedTutorials] = useState([]);
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const history = useHistory();

  // Cargar los tutoriales disponibles cuando el componente se monte
  useEffect(() => {
    TutorialDataService.getAllTutorials()
      .then((response) => {
        setAvailableTutorials(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar tutoriales:', error);
      });
  }, []);

  // Función para agregar persona
  const agregarPersona = (e) => {
    e.preventDefault();

    // Combinar los datos de la persona con los tutoriales seleccionados
    const personaData = { ...persona, tutoriales: selectedTutorials.map(tut => tut.title) }; // Aquí guardamos solo los nombres

    if (!personaData.fechaNacimiento) {
      console.log("Error: La fecha de nacimiento es obligatoria.");
      return;
    }

    // Llamada al servicio para crear persona
    AgendaDataService.createPersona(personaData)
      .then((response) => {
        history.push("/");

        console.log('Persona agregada:', response.data);
      })
      .catch((error) => {
        console.error('Error al agregar persona:', error);
      });
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersona({
      ...persona,
      [name]: value,
    });
  };

  // Función para alternar la selección de tutoriales
  const toggleTutorialSelection = (tutorialId) => {
    const tutorial = availableTutorials.find(tut => tut.id === tutorialId);

    if (tutorial) {
      if (selectedTutorials.some(tut => tut.id === tutorialId)) {
        setSelectedTutorials(selectedTutorials.filter(tut => tut.id !== tutorialId));
      } else {
        setSelectedTutorials([...selectedTutorials, tutorial]);
      }
    }
  };

  const openTutorialModal = () => setShowTutorialModal(true);
  const closeTutorialModal = () => setShowTutorialModal(false);

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: 'calc(100vh - 56px)',
        fontFamily: "'Poppins', sans-serif",
        marginTop: '2rem',
      }}
    >
      <Card style={{ width: '100%', maxWidth: '600px', padding: '2rem', borderRadius: '20px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}>
        <h3 className="mb-4 text-center" style={{ fontWeight: 'bold', color: '#125b96' }}>
          Añadir Persona
        </h3>
        <Form onSubmit={agregarPersona}>
          <Row className="mb-4">
            <Form.Group as={Col} controlId="nombre">
              <Form.Label style={{ fontWeight: '600' }}>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduce nombre"
                name="nombre"
                value={persona.nombre}
                onChange={handleChange}
                className="form-control-custom"  // Cambié esta línea
              />
            </Form.Group>
            <Form.Group as={Col} controlId="apellido">
              <Form.Label style={{ fontWeight: '600' }}>Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduce apellido"
                name="apellido"
                value={persona.apellido}
                onChange={handleChange}
                className="form-control-custom"  // Cambié esta línea
              />
            </Form.Group>
          </Row>

          <Form.Group controlId="direccion" className="mb-4">
            <Form.Label style={{ fontWeight: '600' }}>Dirección</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduce dirección"
              name="direccion"
              value={persona.direccion}
              onChange={handleChange}
              className="form-control-custom"  // Cambié esta línea
            />
          </Form.Group>

          <Row className="mb-4">
            <Form.Group as={Col} controlId="codigoPostal">
              <Form.Label style={{ fontWeight: '600' }}>Código Postal</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduce código postal"
                name="codigoPostal"
                value={persona.codigoPostal}
                onChange={handleChange}
                className="form-control-custom"  // Cambié esta línea
              />
            </Form.Group>
            <Form.Group as={Col} controlId="ciudad">
              <Form.Label style={{ fontWeight: '600' }}>Ciudad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduce ciudad"
                name="ciudad"
                value={persona.ciudad}
                onChange={handleChange}
                className="form-control-custom"  // Cambié esta línea
              />
            </Form.Group>
          </Row>

          <Form.Group controlId="fechaNacimiento" className="mb-4">
            <Form.Label style={{ fontWeight: '600' }}>Fecha de Nacimiento</Form.Label>
            <Form.Control
              type="date"
              name="fechaNacimiento"
              value={persona.fechaNacimiento}
              onChange={handleChange}
              className="form-control-custom"  // Cambié esta línea
            />
          </Form.Group>

          {/* Campo para seleccionar tutoriales */}
          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: '600' }}>Tutoriales asignados</Form.Label>
            <div>
              {selectedTutorials.length > 0
                ? `Seleccionados: ${selectedTutorials.map(tut => tut.title).join(", ")}`
                : "Ningún tutorial seleccionado"}
            </div>
            <Button className="button-custom mt-2" onClick={openTutorialModal}>
              Seleccionar Tutoriales
            </Button>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            style={{
              borderRadius: '10px',
              fontWeight: '600',
              padding: '12px',
              fontSize: '1rem',
              backgroundColor: '#125b96',
              borderColor: '#125b96',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#007bff')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#125b96')}
          >
            Añadir
          </Button>
        </Form>
      </Card>

      {/* Modal para seleccionar tutoriales */}
      <Modal show={showTutorialModal} onHide={closeTutorialModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Tutoriales</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="tutorials-grid">
            {availableTutorials.map((tutorial) => (
              <div
                key={tutorial.id}
                className={`tutorial-card ${selectedTutorials.some(tut => tut.id === tutorial.id) ? "selected" : ""}`}
                onClick={() => toggleTutorialSelection(tutorial.id)}
              >
                <h5 className="tutorial-title">{tutorial.title}</h5>
                <p className="tutorial-description">{tutorial.description || "Sin descripción"}</p>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeTutorialModal}>
            Confirmar selección
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Añadir;
