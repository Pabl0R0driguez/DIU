import React, { useEffect, useState } from 'react';
import AgendaDataService from '../services/agenda.service';
import TutorialDataService from '../services/tutorial.service';
import { useHistory, useLocation } from 'react-router-dom';
import { Modal, ListGroup, Form, Button, Container } from 'react-bootstrap';

function EditPersona() {
  const id = window.location.pathname.split('/')[2]; // Obtenemos el id de la persona desde la URL
  const history = useHistory(); // Lo usamos para redirigir después de actualizar
  const location = useLocation(); // Accedemos a los datos enviados desde otro componente.
  const updatePersonaInList = location.state?.updatePersonaInList; // recibe una función para actualizar la lista de personas en el componente anterior.


  // Inicializar el estado de la persona
  const [persona, setPersona] = useState({
    id: id,
    nombre: '',
    apellido: '',
    direccion: '',
    codigoPostal: '',
    ciudad: '',
    fechaNacimiento: '',

    tutoriales: [] // Campo para tutoriales asignados
  });

  // Lista de tutoriales disponibles obtenidos desde el servidor.
  const [availableTutorials, setAvailableTutorials] = useState([]); 

  // Lista de tutoriales asignados a la persona
  const [selectedTutorials, setSelectedTutorials] = useState([]);

  // Controla la visibilidad de los tutoriales
  const [showTutorialModal, setShowTutorialModal] = useState(false);

  useEffect(() => {
    // Cargar tutoriales disponibles
    TutorialDataService.getAllTutorials()
      .then(response => {
        setAvailableTutorials(response.data);
      })
      .catch(error => {
        console.error('Error al cargar tutoriales:', error);
      });

    // Obtener la persona por ID
    AgendaDataService.getPersona(id)
      .then(response => {
        console.log(response.data); // Verifica la estructura
        setPersona(response.data);
        setSelectedTutorials(response.data.tutoriales || []); // Asegúrate de que sea un array
      })
      .catch(error => {
        console.error("Error al obtener la persona:", error);
      });
  }, [id]);

  const editPersona = (e) => {
    e.preventDefault();
    const personaData = { ...persona, tutoriales: selectedTutorials }; // Combina tutoriales seleccionados

    // Actualizar la persona en el servidor
    AgendaDataService.updatePersona(id, personaData)
      .then(() => {
        console.log("Persona actualizada en el servidor.");
        if (updatePersonaInList) {
          updatePersonaInList(personaData); // Actualiza la lista
        }
        history.push("/"); // Redirige después de la actualización
      })
      .catch((error) => {
        console.error("Error al actualizar la persona:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersona({
      ...persona, [name]: value, // Actualiza el campo correspondiente en el estado
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
    <Container className="edit-persona-container" style={{ minHeight: '100vh', fontFamily: "'Poppins', sans-serif", padding: '2rem' }}>
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', borderRadius: '10px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}>
        <h3 className="mb-4 text-center" style={{ fontWeight: 'bold', color: '#3b3b3b' }}>Editar Persona</h3>
        <form onSubmit={editPersona}>
          {/* Campos del formulario */}
          <Form.Group className="mb-4">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={persona.nombre}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="apellido"
              value={persona.apellido}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              value={persona.direccion}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Código Postal</Form.Label>
            <Form.Control
              type="text"
              name="codigoPostal"
              value={persona.codigoPostal}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              type="text"
              name="ciudad"
              value={persona.ciudad}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
              type="date"
              name="fechaNacimiento"
              value={persona.fechaNacimiento}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Campo para tutoriales asignados */}
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
          <Button type="submit" className="btn btn-primary w-100" style={{ borderRadius: '10px', padding: '12px' }}>
            Actualizar
          </Button>
        </form>
      </div>

      {/* Modal para seleccionar tutoriales */}
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
