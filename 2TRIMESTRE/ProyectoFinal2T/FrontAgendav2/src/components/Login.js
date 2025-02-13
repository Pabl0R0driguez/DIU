import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useHistory } from "react-router-dom";
import { use } from 'react';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory(); 

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Sesión iniciado")
      history.push("/profile"); 
    } catch (error) {
      console.log("Error")
      setError('Error de inicio de sesión');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Inicio de sesión</h2>
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
