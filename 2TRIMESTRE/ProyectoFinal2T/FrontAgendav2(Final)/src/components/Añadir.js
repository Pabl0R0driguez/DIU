import React, { useState } from 'react';
import AgendaDataService from '../services/agenda.service';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap';
import "../styles/Añadir.css";

function Añadir() {
  const [persona, setPersona] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    codigoPostal: '',
    ciudad: '',
    fechaNacimiento: '',
  });

  const agregarPersona = (e) => {
    e.preventDefault();
  
    const personaData = { ...persona };
  
    // Verificar que 'fechaNacimiento' tenga un valor antes de enviar los datos
    if (!personaData.fechaNacimiento) {
      console.log("Error: La fecha de nacimiento es obligatoria.");
      return;
    }
  
    // Hacemos la llamada al servicio
    AgendaDataService.createPersona(personaData)
      .then((response) => {
        console.log('Persona agregada:', response.data);
      })
      .catch((error) => {
        console.error('Error al agregar persona:', error);
      });
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersona({
      ...persona,
      [name]: value,
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
                style={{
                  borderRadius: '10px',
                  border: '1px solid #ced4da',
                  padding: '10px',
                }}
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
                style={{
                  borderRadius: '10px',
                  border: '1px solid #ced4da',
                  padding: '10px',
                }}
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
              style={{
                borderRadius: '10px',
                border: '1px solid #ced4da',
                padding: '10px',
              }}
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
                style={{
                  borderRadius: '10px',
                  border: '1px solid #ced4da',
                  padding: '10px',
                }}
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
                style={{
                  borderRadius: '10px',
                  border: '1px solid #ced4da',
                  padding: '10px',
                }}
              />
            </Form.Group>
          </Row>

          <Form.Group controlId="fechaNacimiento" className="mb-4">
          <Form.Label style={{ fontWeight: '600' }}>Fecha de Nacimiento</Form.Label>
          <Form.Control
            type="date"
            name="fechaNacimiento" // Aquí es donde capturas el valor
            value={persona.fechaNacimiento} // El valor se asigna a persona.fechaNacimiento
            onChange={handleChange} // Se actualiza el estado cuando el usuario cambia la fecha
            style={{
              borderRadius: '10px',
              border: '1px solid #ced4da',
              padding: '10px',
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

export default Añadir;
