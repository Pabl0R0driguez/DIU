import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Menu } from "./components/Menu"; // Importamos el componente del menú
import Inicio from "./components/Inicio"; // Importamos el componente Inicio
import Añadir from "./components/Añadir"; // Importamos el componente Añadir
import Perfil from "./components/Perfil";
import Login from "./components/Login"; // Importamos el componente Login
import UserProvider from "./provider/UserProvider"; // Correcta importación de UserProvider
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // Importa Switch y Route de react-router-dom v5

function App() {
  return (
    <Router> {/* Envuelve toda la aplicación con Router */}
      <UserProvider> {/* UserProvider envuelve toda la aplicación */}
        <Menu />
        <div className="container mt-3">
        <Switch>
          <Route exact path="/inicio" component={Inicio} />
          <Route exact path="/añadir" component={Añadir} />
          <Route exact path="/login" component={Login} />
        </Switch>
        <Route path="/perfil" component={Perfil} /> {/* Ruta del perfil */}

        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
