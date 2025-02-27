import React, { useEffect, useState } from 'react';
import AgendaDataService from '../services/agenda.service';
import TutorialDataService from '../services/tutorial.service';
import { useHistory, useLocation } from 'react-router-dom';
import { Modal, ListGroup, Form, Button, Container, Col, Row, Card } from 'react-bootstrap';
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
    tutoriales: [] // Guardaremos los títulos de los tutoriales
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
        // Al obtener la persona, cargamos los nombres de los tutoriales
        setSelectedTutorials(response.data.tutoriales || []);
      })
      .catch(error => console.error("Error al obtener la persona:", error));
  }, [id]);

  const editPersona = (e) => {
    e.preventDefault();
    // Guardamos solo los títulos de los tutoriales seleccionados
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
    const tutorial = availableTutorials.find(tut => tut.id === tutorialId);

    if (tutorial) {
      if (selectedTutorials.includes(tutorial.title)) {
        setSelectedTutorials(selectedTutorials.filter(title => title !== tutorial.title)); // Filtramos por título
      } else {
        setSelectedTutorials([...selectedTutorials, tutorial.title]); // Añadimos el título
      }
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
            Actualizar
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
                 style={{
                   border: "1px solid #ddd",
                   borderRadius: "10px",
                   padding: "10px",
                   marginBottom: "10px",
                   display: "flex",
                   alignItems: "center",
                   cursor: "pointer",
                   transition: "0.3s",
                   backgroundColor: selectedTutorials.some(tut => tut.id === tutorial.id) ? "#f0f8ff" : "#fff"
                 }}
               >
                 <img
                   src={tutorial.url || "https://via.placeholder.com/80"} // Imagen por defecto si no hay URL
                   alt={tutorial.title}
                   style={{ width: "80px", height: "80px", borderRadius: "8px", marginRight: "10px", objectFit: "cover" }}
                 />
                 <div>
                   <h5 style={{ margin: 0, fontSize: "16px" }}>{tutorial.title}</h5>
                   <p style={{ fontSize: "14px", color: "#666", margin: "5px 0 0" }}>
                     {tutorial.description || "Sin descripción"}
                   </p>
                 </div>
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

export default EditPersona;
