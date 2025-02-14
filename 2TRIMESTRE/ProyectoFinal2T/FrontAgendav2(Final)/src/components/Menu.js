import '../styles/Menu.css'; // Asegúrate de agregar el archivo CSS
import React, {useContext} from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { UserContext } from "../provider/UserProvider";
import { Link } from 'react-router-dom';
import icono from "../assets/usuario.png";


export function Menu() {
  const userContext = useContext(UserContext);
  const nombre = userContext?.displayName || "Invitado"; 
  const foto = userContext?.photoURL || icono;  


  return (
    <Navbar bg="transparent" expand="lg" className="navbar-custom">
      <Container fluid>
        <Navbar.Brand href="#home" className="navbar-brand">
        {/* Muestra el campo email si esta registrado */}
        <Link to="/perfil">
        <button>
        <h3 className="italic">{nombre}</h3>
        <img src={foto} alt="User Icon" style={{ width: "24px", height: "24px" }} />
        </button>
      </Link>

        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggle" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/" className="nav-item-custom">Inicio </Nav.Link>
            <Nav.Link href="/añadir" className="nav-item-custom">Añadir</Nav.Link>
            <Nav.Link href="/login" className="nav-item-custom">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
