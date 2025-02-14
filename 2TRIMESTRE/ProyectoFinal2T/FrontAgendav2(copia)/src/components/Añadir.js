import React, { useState } from 'react';
import AgendaDataService from '../services/agenda.service';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import "../styles/Añadir.css"

function Añadir() {
  const [persona, setPersona] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    codigoPostal: '',
    ciudad: '',
    fechaNaciemiento: '',
  });

  const agregarPersona = (e) => {
    e.preventDefault();
    AgendaDataService.createPersona(persona);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersona({
      ...persona,
      [name]: value,
    });
  };

  return (
    <Container className="mt-5">
      <h3 className="mb-4 text-center white-text">Añadir Persona</h3>
      <Form onSubmit={agregarPersona}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduce nombre"
              name="nombre"
              value={persona.nombre}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="apellido">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduce apellido"
              name="apellido"
              value={persona.apellido}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Form.Group controlId="direccion" className="mb-3">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            placeholder="Introduce dirección"
            name="direccion"
            value={persona.direccion}
            onChange={handleChange}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="codigoPostal">
            <Form.Label>Código Postal</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduce código postal"
              name="codigoPostal"
              value={persona.codigoPostal}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="ciudad">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduce ciudad"
              name="ciudad"
              value={persona.ciudad}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Form.Group controlId="fechaNaciemiento" className="mb-3">
          <Form.Label>Fecha de Nacimiento</Form.Label>
          <Form.Control
            type="date"
            name="fechaNaciemiento"
            value={persona.fechaNaciemiento}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Añadir
        </Button>
      </Form>
    </Container>
  );
}

export default Añadir;
