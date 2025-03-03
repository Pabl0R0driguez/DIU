import React, { useState, useEffect } from 'react';
import AgendaDataService from '../services/agenda.service';
import TutorialDataService from '../services/tutorial.service';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import { Form, Button, Row, Col, Container, Card, Modal } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';

import "../styles/Añadir-Editar.css";

function Añadir() {
  const [persona, setPersona] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    codigoPostal: '',
    ciudad: '',
    fechaNacimiento: '',
    tutoriales: []
  }); // Objeto que almacena los datos de la persona

  const [availableTutorials, setAvailableTutorials] = useState([]); // Lista de tutoriales disponibles para la persona
  const [selectedTutorials, setSelectedTutorials] = useState([]);  // Tutoriales seleccionados
  const [showTutorialModal, setShowTutorialModal] = useState(false); // Controla la visibilidad del modal para seleccioanar tutoriales
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');


// Se ejecuta el montar el componente, mostramos lista de todos los tutoriales disponibles
// Los guardamos en availableTutorials
  useEffect(() => {
    TutorialDataService.getAllTutorials()
      .then((response) => {
        setAvailableTutorials(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar tutoriales:', error);
      });
  }, []);

  const agregarPersona = (e) => {
    e.preventDefault();
  
    // Verifica si algún campo requerido está vacío
    if (!persona.nombre || !persona.apellido || !persona.direccion || !persona.codigoPostal || !persona.ciudad || !persona.fechaNacimiento) {
      setErrorMessage("Error: Todos los campos son obligatorios.");
      return; // Detiene la ejecución si algún campo está vacío
    }
  
    const personaData = { ...persona, tutoriales: selectedTutorials.map(tut => tut.title) };
  
    // Si la fecha de nacimiento ya fue validada, podemos proceder
    AgendaDataService.createPersona(personaData)
      .then((response) => {
        history.push("/"); // Redirige a la página principal
        console.log('Persona agregada:', response.data);
      })
      .catch((error) => {
        console.error('Error al agregar persona:', error);
      });
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersona({ ...persona, [name]: value });
  };

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

    // Función para manejar el cambio en el campo de código postal
    const handleCodigoPostalChange = (e) => {
      // Permitimos solo números y que la longitud no sea mayor a 5
      const value = e.target.value;

      // Verificamos si la entrada solo contiene números y la longitud es menor o igual a 5
      if (/^\d*$/.test(value) && value.length <= 5) {
        setPersona({ ...persona, codigoPostal: value });
      }
    };


  const openTutorialModal = () => setShowTutorialModal(true);
  const closeTutorialModal = () => setShowTutorialModal(false);

  return (
    <Container className="contenedor-formulario">
      <Card className="formulario-card">
        <h3 className="titulo-formulario">Añadir Persona</h3>

    

        <Form onSubmit={agregarPersona}>
          <Row className="mb-4">
            <Form.Group as={Col} controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Introduce nombre" name="nombre" value={persona.nombre} onChange={handleChange} className="form-control-custom" />
            </Form.Group>
            <Form.Group as={Col} controlId="apellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" placeholder="Introduce apellido" name="apellido" value={persona.apellido} onChange={handleChange} className="form-control-custom" />
            </Form.Group>
          </Row>

          <Form.Group controlId="direccion" className="mb-4">
            <Form.Label>Dirección</Form.Label>
            <Form.Control type="text" placeholder="Introduce dirección" name="direccion" value={persona.direccion} onChange={handleChange} className="form-control-custom" />
          </Form.Group>

          <Row className="mb-4">
          <Form.Group as={Col} controlId="codigoPostal">
              <Form.Label>Código Postal</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduce código postal"
                name="codigoPostal"
                value={persona.codigoPostal}
                onChange={(e) => handleCodigoPostalChange(e)} // Llamada al nuevo manejador
                className="form-control-custom"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="ciudad">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control type="text" placeholder="Introduce ciudad" name="ciudad" value={persona.ciudad} onChange={handleChange} className="form-control-custom" />
            </Form.Group>
          </Row>

          <Form.Group controlId="fechaNacimiento" className="mb-4">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control type="date" name="fechaNacimiento" value={persona.fechaNacimiento} onChange={handleChange} className="form-control-custom" />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Tutoriales asignados</Form.Label>
            <div>{selectedTutorials.length > 0 ? `Seleccionados: ${selectedTutorials.map(tut => tut.title).join(", ")}` : "Ningún tutorial seleccionado"}</div>
            <Button className="button-custom mt-2" onClick={openTutorialModal}>Seleccionar Tutoriales</Button>
          </Form.Group>

          <Button type="submit" className="boton-enviar">Añadir</Button>
             {/* Mostrar el mensaje de error con Alert si hay un error */}
             {errorMessage && (
          <Alert variant="danger" className='mt-4'>
            <strong>{errorMessage}</strong>
          </Alert>
        )}
        </Form>
      </Card>

      

      <Modal show={showTutorialModal} onHide={closeTutorialModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Tutoriales</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="tutorials-grid">
            {availableTutorials.map((tutorial) => (
              <div key={tutorial.id} className={`tutorial-card ${selectedTutorials.some(tut => tut.id === tutorial.id) ? "selected" : ""}`} onClick={() => toggleTutorialSelection(tutorial.id)}>
                <img src={tutorial.url || "https://via.placeholder.com/80"} alt={tutorial.title} className="tutorial-img" />
                <div>
                  <h5 className="tutorial-title">{tutorial.title}</h5>
                  <p className="tutorial-description">{tutorial.description || "Sin descripción"}</p>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="confirm-button" onClick={closeTutorialModal}>Confirmar selección</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Añadir;
