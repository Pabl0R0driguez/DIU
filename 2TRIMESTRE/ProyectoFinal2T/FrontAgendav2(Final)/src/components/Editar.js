import React, { useEffect, useState } from 'react';
import AgendaDataService from '../services/agenda.service';
import TutorialDataService from '../services/tutorial.service';
import { useHistory, useLocation } from 'react-router-dom';
import { Modal, ListGroup, Form, Button, Container,Col, Row, Card } from 'react-bootstrap';
import '../styles/Añadir.css';

function EditPersona() {
  const id = window.location.pathname.split('/')[2];
  const history = useHistory();
  const location = useLocation();
  const updatePersonaInList = location.state?.updatePersonaInList;

  const [persona, setPersona] = useState({
    id: id,
    nombre: '',
    apellido: '',
    direccion: '',
    codigoPostal: '',
    ciudad: '',
    fechaNacimiento: '',
    tutoriales: []
  });

  const [availableTutorials, setAvailableTutorials] = useState([]);
  const [selectedTutorials, setSelectedTutorials] = useState([]);
  const [showTutorialModal, setShowTutorialModal] = useState(false);

  useEffect(() => {
    TutorialDataService.getAllTutorials()
      .then(response => setAvailableTutorials(response.data))
      .catch(error => console.error('Error al cargar tutoriales:', error));

    AgendaDataService.getPersona(id)
      .then(response => {
        setPersona(response.data);
        setSelectedTutorials(response.data.tutoriales || []);
      })
      .catch(error => console.error("Error al obtener la persona:", error));
  }, [id]);

  const editPersona = (e) => {
    e.preventDefault();
    const personaData = { ...persona, tutoriales: selectedTutorials };
    AgendaDataService.updatePersona(id, personaData)
      .then(() => {
        if (updatePersonaInList) updatePersonaInList(personaData);
        history.push("/");
      })
      .catch(error => console.error("Error al actualizar la persona:", error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersona({
      ...persona,
      [name]: value,
    });
  };

  const toggleTutorialSelection = (tutorialId) => {
    if (selectedTutorials.includes(tutorialId)) {
      setSelectedTutorials(selectedTutorials.filter(id => id !== tutorialId));
    } else {
      setSelectedTutorials([...selectedTutorials, tutorialId]);
    }
  };

  const openTutorialModal = () => setShowTutorialModal(true);
  const closeTutorialModal = () => setShowTutorialModal(false);

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 56px)', fontFamily: "'Poppins', sans-serif", marginTop: '2rem' }}>
      <Card style={{ width: '100%', maxWidth: '600px', padding: '2rem', borderRadius: '20px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}>
        <h3 className="mb-4 text-center" style={{ fontWeight: 'bold', color: '#125b96' }}>Editar Persona</h3>
        <Form onSubmit={editPersona}>
          <Row className="mb-4">
            <Form.Group as={Col} controlId="nombre">
              <Form.Label style={{ fontWeight: '600' }}>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduce nombre"
                name="nombre"
                value={persona.nombre}
                onChange={handleChange}
                className="form-control-custom"
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
                className="form-control-custom"
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
              className="form-control-custom"
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
                className="form-control-custom"
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
                className="form-control-custom"
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
              className="form-control-custom"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: '600' }}>Tutoriales asignados</Form.Label>
            <div>
              {selectedTutorials.length > 0
                ? `Seleccionados: ${selectedTutorials.join(", ")}`
                : "Ningún tutorial seleccionado"}
            </div>
            <Button variant="secondary" className="mt-2" onClick={openTutorialModal}>
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
            Actualizar
          </Button>
        </Form>
      </Card>

      <Modal show={showTutorialModal} onHide={closeTutorialModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Tutoriales</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {availableTutorials.map((tutorial) => (
              <ListGroup.Item key={tutorial.id}>
                <Form.Check
                  type="checkbox"
                  id={`tutorial-${tutorial.id}`}
                  label={tutorial.title}
                  checked={selectedTutorials.includes(tutorial.id)}
                  onChange={() => toggleTutorialSelection(tutorial.id)}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
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


export default EditPersona;
