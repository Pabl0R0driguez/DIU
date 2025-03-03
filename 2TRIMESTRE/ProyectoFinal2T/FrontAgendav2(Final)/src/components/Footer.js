// src/components/Footer.js
import React from 'react';
import { Container } from 'react-bootstrap';
import '../styles/Footer.css'; // Asegúrate de crear este archivo CSS para personalizar el estilo

const Footer = () => {
  return (
    <footer className="footer-custom">
      <Container className="text-center">
        <p style={{ margin: '0' }}>© {new Date().getFullYear()} Agenda . Todos los derechos reservados.</p>
        <p>
          <p className="footer-link">Términos y condiciones | Política de privacidad</p>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
