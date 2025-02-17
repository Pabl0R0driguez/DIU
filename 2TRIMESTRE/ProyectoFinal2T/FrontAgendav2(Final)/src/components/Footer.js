// src/components/Footer.js
import React from 'react';
import { Container } from 'react-bootstrap';
import '../styles/Footer.css'; // Asegúrate de crear este archivo CSS para personalizar el estilo

const Footer = () => {
  return (
    <footer className="footer-custom">
      <Container className="text-center">
        <p style={{ margin: '0' }}>© {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.</p>
        <p>
          <a href="/terminos" className="footer-link">Términos y condiciones</a> | 
          <a href="/privacidad" className="footer-link"> Política de privacidad</a>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
