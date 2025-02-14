import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../assets/agenda.png"; // Asegúrate de que la ruta sea correcta
import { Form, Button, Alert } from 'react-bootstrap'; // Importa los componentes de Bootstrap

// Usar import para la imagen
import agendaImg from "../assets/agenda.png";

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
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Form onSubmit={handleLogin} style={{ width: '300px', background: '#ffffff', padding: '20px', borderRadius: '12px', boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }}>
        <h2 className="text-center mb-4">Inicio de sesión</h2>
        
        {/* Imagen centrada encima del campo de email */}
        <div className="text-center mb-3">
          <img src={agendaImg} alt="Agenda" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
        </div>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Iniciar sesión
        </Button>
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

         <button
                className="w-full py-3 bg-red-600 mt-4 text-white"
                onClick={() => {
                  auth.signOut().then(() => {
                    window.location.href = "/login"; // Redirigir al login después de cerrar sesión
                  }).catch((error) => {
                    console.error("Error al cerrar sesión", error);
                  });
                }}
              >
                Sign out
              </button>
      </Form>
    </div>
  );
};

export default Login;
