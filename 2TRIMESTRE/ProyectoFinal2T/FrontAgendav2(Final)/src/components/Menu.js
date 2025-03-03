import React, { useContext, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { UserContext } from "../provider/UserProvider";
import { Link } from 'react-router-dom';
import icono from "../assets/usuario.png";
import "../styles/Menu.css"; // Asegúrate de importar el archivo CSS

export function Menu() {
  const userContext = useContext(UserContext);
  const [currentPersona, setCurrentPersona] = useState(null);

  const nombre = userContext?.displayName || "Invitado"; 
  const foto = userContext?.photoURL || icono;

  return (
    <Navbar bg="transparent" expand="lg" className="navbar-custom">
      <Container fluid>
        <Navbar.Brand href="#home" className="navbar-brand">
          <Link to="/perfil">
            <button className="user-button">
              {/* Nombre del usuario */}
              <h3 className="user-name">
                {nombre}
              </h3>
              {/* Imagen del usuario */}
              <img
                src={foto}
                alt="User Icon"
                className="user-icon"
              />
            </button>
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggle" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/" className="nav-item-custom">Inicio</Nav.Link>
            {userContext && (
              <Nav.Link href="/añadir" className="nav-item-custom">Añadir</Nav.Link>
            )}
            <Nav.Link href="/tutoriales" className="nav-item-custom">Tutoriales</Nav.Link>
            {!userContext ? (
              <Nav.Link href="/login" className="nav-item-custom">Login</Nav.Link>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
