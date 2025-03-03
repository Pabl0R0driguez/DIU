import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Alert, Container } from 'react-bootstrap'; 
import "../styles/Login.css"; // Importar el archivo CSS
import Footer from "./Footer";
import login from "../assets/login1.png";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory(); 

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Sesión iniciada");
      history.push("/"); 
    } catch (error) {
      console.log("Error");
      setError('Error de inicio de sesión');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Container className="flex-grow-1 d-flex justify-content-center align-items-center" style={{ maxHeight: "875px" }}> {/* Aumentar la altura máxima a 500px */}
        <Form onSubmit={handleLogin} className="login-form w-100" style={{ maxWidth: "300px" }}> {/* Mantener el ancho en 300px */}
          <h2 className="text-center mb-4">Bienvenido</h2>

          <div className="text-center mb-3">
            <img src={login} alt="User Icon"
               ></img>
          </div>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="login-button w-100">
            Iniciar sesión
          </Button>
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        </Form>
      </Container>

      <Footer></Footer>

    </div>
  );
};

export default Login;
