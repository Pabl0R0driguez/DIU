import React, { useContext } from "react";
import { UserContext } from "../provider/UserProvider";
import { Redirect } from "react-router-dom"; // Para redirigir al login si no está autenticado
import { auth } from "../firebase";
import { Card, Button, Container, Row, Col } from 'react-bootstrap'; // Importa componentes de react-bootstrap
import '../styles/Perfil.css';  // Importa el archivo CSS

const Perfil = () => {
  const user = useContext(UserContext); // Obtiene el contexto del usuario

  // Si no hay usuario autenticado, redirigir a /login
  if (!user) {
    return <Redirect to="/login" />;
  }

  const { photoURL, displayName, email } = user;

  return (
    <Container className="d-flex flex-column justify-content-start align-items-center min-vh-100">
      <Row className="justify-content-center mt-3">
        <Col md={6} lg={8}>
          <Card className="shadow-lg rounded perfil-card">
            {/* Imagen de fondo del perfil */}
            <div 
              className="card-img-top perfil-img" 
              style={{ 
                backgroundImage: `url(${photoURL || 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg'})`, 
              }} 
            ></div>

            <Card.Body className="text-center p-4">
              {/* Imagen circular del usuario */}
              <div className="mb-4">
                <img
                  src={photoURL || 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg'}
                  alt={displayName}
                  className="rounded-circle border perfil-img-circle"
                />
              </div>

              {/* Nombre y correo */}
              <Card.Title className="text-uppercase font-weight-bold">{displayName}</Card.Title>
              <Card.Text className="text-muted">{email}</Card.Text>

              {/* Botón de Cerrar sesión */}
              <Button 
                variant="danger" 
                className="btn-block mt-4 py-2 text-uppercase font-weight-bold"
                onClick={() => {
                  auth.signOut().then(() => {
                    window.location.href = "/login"; // Redirigir al login después de cerrar sesión
                  }).catch((error) => {
                    console.error("Error al cerrar sesión", error);
                  });
                }}
              >
                Cerrar sesión
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Perfil;
