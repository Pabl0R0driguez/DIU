import '../styles/Menu.css'; // Asegúrate de agregar el archivo CSS
import React, {useContext} from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { UserContext } from "../provider/UserProvider";



export function Menu() {
  const userContext = useContext(UserContext);

  const email = userContext?.email || "Invitado"; // Si no hay usuario, muestra "Invitado"

  return (
    <Navbar bg="transparent" expand="lg" className="navbar-custom">
      <Container fluid>
        <Navbar.Brand href="#home" className="navbar-brand">
        <h3 className="italic">{email}</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggle" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/inicio" className="nav-item-custom">Inicio </Nav.Link>
            <Nav.Link href="/añadir" className="nav-item-custom">Añadir</Nav.Link>
            <Nav.Link href="/login" className="nav-item-custom">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
