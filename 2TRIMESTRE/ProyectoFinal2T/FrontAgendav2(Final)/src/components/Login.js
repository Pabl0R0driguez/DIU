import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Alert } from 'react-bootstrap'; 
import "../styles/Login.css"; // Importar el archivo CSS

// Usar import para la imagen
import menu from "../assets/menu.png";

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
    <div className="login-container">
      <Form onSubmit={handleLogin} className="login-form">
        <h2 className="text-center mb-4">Bienvenido</h2>
        
        {/* Imagen centrada encima del campo de email */}
        <div className="text-center mb-3">
          <img src={menu}  alt="User Icon"
                style={{
                  width: "82px",
                  height: "82px",
                  borderRadius: "50%", // Hacemos la imagen circular
                  border: "1px solid #ccc", // Borde para mejorar el contraste
                }} />
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
    </div>
  );
};

export default Login;
