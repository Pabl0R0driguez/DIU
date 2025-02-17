import React, { useState } from 'react';
import TutorialDataService from '../services/tutorial.service';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap';
import '../styles/AñadirTut.css'; // Ajusta la ruta según tu estructura de carpetas

function AddTutorial() {
  const [tutorial, setTutorial] = useState({
    title: '',
    description: '',
    published: false,
  });

  const agregarTutorial = (e) => {
    e.preventDefault();

    const tutorialData = { ...tutorial };

    // Verificar que 'title' y 'description' tengan valores antes de enviar los datos
    if (!tutorialData.title || !tutorialData.description) {
      console.log("Error: Título y descripción son obligatorios.");
      return;
    }

    // Hacemos la llamada al servicio
    TutorialDataService.create(tutorialData)
      .then((response) => {
        console.log('Tutorial agregado:', response.data);
      })
      .catch((error) => {
        console.error('Error al agregar tutorial:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTutorial({
      ...tutorial,
      [name]: value,
    });
  };

  const handlePublishedChange = (e) => {
    setTutorial({
      ...tutorial,
      published: e.target.checked,
    });
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: 'calc(100vh - 56px)', // Ajustamos la altura para tener en cuenta la navbar de Bootstrap (56px es la altura típica)
        fontFamily: "'Poppins', sans-serif",
        marginTop: '2rem', // Añadimos margen superior para separarlo un poco de la navbar
      }}
    >
      <Card style={{ width: '100%', maxWidth: '600px', padding: '2rem', borderRadius: '20px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}>
        <h3 className="mb-4 text-center" style={{ fontWeight: 'bold', color: '#3b3b3b' }}>
          Añadir Tutorial
        </h3>
        <Form onSubmit={agregarTutorial}>
          <Form.Group controlId="titulo" className="mb-4">
            <Form.Label style={{ fontWeight: '600' }}>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduce título"
              name="title"
              value={tutorial.title}
              onChange={handleChange}
              style={{
                borderRadius: '10px',
                border: '1px solid #ced4da',
                padding: '10px',
              }}
              required
            />
          </Form.Group>

          <Form.Group controlId="descripcion" className="mb-4">
            <Form.Label style={{ fontWeight: '600' }}>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Introduce descripción"
              name="description"
              value={tutorial.description}
              onChange={handleChange}
              rows={4}
              style={{
                borderRadius: '10px',
                border: '1px solid #ced4da',
                padding: '10px',
              }}
              required
            />
          </Form.Group>

          <Form.Group controlId="publicado" className="mb-4 form-check">
            <Form.Check
              type="checkbox"
              label="Publicado"
              name="published"
              checked={tutorial.published}
              onChange={handlePublishedChange}
              style={{
                fontWeight: '600',
              }}
            />
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
              backgroundColor: '#007bff',
              borderColor: '#007bff',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
          >
            Añadir
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default AddTutorial;
