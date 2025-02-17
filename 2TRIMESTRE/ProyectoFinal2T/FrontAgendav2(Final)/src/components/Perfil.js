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
      <Row className="justify-content-center mt-3"> {/* Mover todo más arriba */}
        <Col md={6} lg={8}>
          <Card className="shadow-lg rounded" style={{ width: '100%', height: 'auto' }}>
            {/* Imagen de fondo del perfil */}
            <div 
              className="card-img-top perfil-img" 
              style={{ 
                backgroundImage: `url(${photoURL || 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg'})`, 
                height: '300px', // Aumenté la altura de la imagen de fondo
                backgroundSize: 'cover', 
                borderTopLeftRadius: '0.5rem', 
                borderTopRightRadius: '0.5rem' 
              }} 
            ></div>

            <Card.Body className="text-center p-4"> {/* Aumenté el padding */}
              {/* Imagen circular del usuario */}
              <div className="mb-4">
                <img
                  src={photoURL || 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg'}
                  alt={displayName}
                  className="rounded-circle border perfil-img-circle"
                  style={{ width: '150px', height: '150px' }} // Aumenté el tamaño de la imagen
                />
              </div>

              {/* Nombre y correo */}
              <Card.Title className="text-uppercase font-weight-bold">{displayName}</Card.Title>
              <Card.Text className="text-muted">{email}</Card.Text>

              {/* Información adicional */}
              <div className="info-section mt-4">
                <h5 className="text-uppercase">Información Adicional</h5>
                <p className="text-muted">Aquí puedes agregar información adicional sobre el usuario, como su puesto, experiencia, etc.</p>
              </div>

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

       {/*  <footer className="w-100 text-center py-3">
        <Container className="login-footer-spacing">
          <Row>
            <Col>
              <p>&copy; 2025 Tu Empresa. Todos los derechos reservados.</p>
              <p>
                <a href="/privacy-policy" className="text-decoration-none">Política de Privacidad</a> | 
                <a href="/terms-of-service" className="text-decoration-none"> Términos de Servicio</a>
              </p>
            </Col>
          </Row>
        </Container>
      </footer> */}
    </Container>

    
  );
};

export default Perfil;
