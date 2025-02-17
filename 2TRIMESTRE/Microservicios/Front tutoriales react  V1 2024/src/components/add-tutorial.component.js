import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap'; // Importar componentes de Bootstrap
import TutorialDataService from '../services/tutorial.service';
import '../styles/add-edit.css'; // Importar estilos personalizados

function AddTutorial() {
  const [tutorial, setTutorial] = useState({
    title: '',
    description: '',
    published: false
  });

  const agregarTutorial = (e) => {
    e.preventDefault(); // Evitar recargar la página
    TutorialDataService.create(tutorial)
      .then(response => {
        // Si el tutorial se guarda correctamente
        console.log('Tutorial agregado:', response.data);
      })
      .catch(e => {
        console.error('Error al agregar tutorial:', e);
      });
  };

  const setTitle = (e) => {
    setTutorial({ ...tutorial, title: e.target.value }); // Usar spread operator para actualizar el estado
  };

  const setDescription = (e) => {
    setTutorial({ ...tutorial, description: e.target.value });
  };

  const setPublished = (e) => {
    setTutorial({ ...tutorial, published: e.target.checked });
  };

  return (
    <Container fluid className="full-width-container mt-4">
      <Row>
        <Col md={12} className="mb-4">
          <h1 className="mb-4 text-center">Añadir Tutorial</h1>

          <Form onSubmit={agregarTutorial} className="w-100">
            <Row>
              <Col md={8} className="mx-auto">
                {/* Título */}
                <Form.Group controlId="formTitle">
                  <Form.Label>Título</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Título"
                    value={tutorial.title}
                    onChange={setTitle}
                    className="form-control-lg"
                  />
                </Form.Group>

                {/* Descripción */}
                <Form.Group controlId="formDescription" className="mt-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Descripción"
                    value={tutorial.description}
                    onChange={setDescription}
                    className="form-control-lg"
                  />
                </Form.Group>

                {/* Publicado */}
                <Form.Group controlId="formPublished" className="mt-3">
                  <Form.Check
                    type="checkbox"
                    label="Publicado"
                    checked={tutorial.published}
                    onChange={setPublished}
                    className="form-check-lg"
                  />
                </Form.Group>

                {/* Botón de añadir */}
                <Button className="mt-4 w-100" variant="primary" type="submit" size="lg">
                  Añadir Tutorial
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddTutorial;
