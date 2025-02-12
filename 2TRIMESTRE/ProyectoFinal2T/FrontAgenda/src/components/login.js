import React, { useState } from 'react';
import { auth } from '../firebase'; // Importa auth desde firebase.js
import { signInWithEmailAndPassword } from 'firebase/auth'; // Usar el método de Firebase
import "./styles/login.css"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password); 
    } catch (error) {
      setError('Error de inicio de sesión');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>
          Inicio de sesión
        </h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button type="submit">Iniciar sesión</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
