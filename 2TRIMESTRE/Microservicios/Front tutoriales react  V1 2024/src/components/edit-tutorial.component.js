import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap'; // Importar react-bootstrap
import TutorialDataService from '../services/tutorial.service';
import { useHistory } from 'react-router-dom'; // Usamos useHistory para redirigir
import '../styles/add-edit.css'; // Importar estilos personalizados

function EditTutorial() {
    const id = window.location.pathname.split('/')[2];
    const history = useHistory();

    const [tutorial, setTutorial] = useState({
        id: id,
        title: '',
        description: '',
        published: false,
    });

    // Cargar el tutorial cuando se monta el componente
    useEffect(() => {
        TutorialDataService.get(id)
            .then(response => {
                setTutorial(response.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    // Manejar la edición del tutorial
    const editTutorial = (e) => {
        e.preventDefault();
        TutorialDataService.update(id, tutorial)
            .then(() => {
                history.push('/tutorials'); // Redirigir a la lista de tutoriales
            })
            .catch(err => console.log(err));
    };

    // Handlers para actualizar el estado
    const setTitle = (e) => {
        setTutorial({ ...tutorial, title: e.target.value });
    };

    const setDescription = (e) => {
        setTutorial({ ...tutorial, description: e.target.value });
    };

    const setPublished = (e) => {
        setTutorial({ ...tutorial, published: e.target.checked });
    };

    return (
        <Container className="full-width-container mt-4">
            <Row>
                <Col md={12} className="mb-4">
                    <h1 className="mb-4 text-center">Editar Tutorial</h1>

                    <Form onSubmit={editTutorial} className="w-100">
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

                                {/* Botón de actualizar */}
                                <Button className="mt-4 w-100" variant="primary" type="submit" size="lg">
                                    Act Tutorial
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default EditTutorial;
