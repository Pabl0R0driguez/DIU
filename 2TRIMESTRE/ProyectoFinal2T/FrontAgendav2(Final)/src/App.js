import React, { useState } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Menu } from "./components/Menu"; // Importamos el componente del menú
import Inicio from "./components/Inicio"; // Importamos el componente Inicio
import Añadir from "./components/Añadir"; // Importamos el componente Añadir
import Perfil from "./components/Perfil";
import Tutoriales from "./components/Tutoriales";

import Editar from "./components/Editar";
import Login from "./components/Login"; // Importamos el componente Login
import UserProvider from "./provider/UserProvider"; // Correcta importación de UserProvider
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // Importa Switch y Route de react-router-dom v5


function App() {
// Aquí asumo que tienes un estado para personas en App.js (o en un lugar global)
const [personas, setPersonas] = useState([]);


return (
  <Router> {/* Envuelve toda la aplicación con Router */}
    <UserProvider> {/* UserProvider envuelve toda la aplicación */}
      <Menu />
      <div className="container mt-3">
        <Switch>
          <Route 
            exact 
            path="/" 
            render={(props) => <Inicio {...props} personas={personas} />} 
          />
          <Route exact path="/añadir" component={Añadir} />
          <Route exact path="/login" component={Login} />
        </Switch>
        <Route 
          path="/perfil" 
          render={(props) => <Perfil {...props} />} 
        />
      <Route path="/editar/" component={Editar} /> 
      
      <Route path="/tutoriales/" component={Tutoriales} /> 



      </div>
    </UserProvider>
  </Router>
);
}

export default App;