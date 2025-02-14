import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Dropdown1 } from "./components/Menu";
import agenda from "./assets/agenda.png";
import Inicio from "./components/Inicio";
import Añadir from "./components/Añadir";
import Login from "./components/Login";
import Perfil from "./components/Perfil";
import inicio from "./assets/inicio.png";
import login from "./assets/login.png";
import añadir from "./assets/añadir.png";
import UserProvider from "./provider/UserProvider"; // Correcta importación de UserProvider
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // Para React Router v5

function App() {
  const items = [
    { name: "Inicio", path: "/inicio", component: Inicio, img: inicio },
    { name: "Añadir", path: "/add", component: Añadir, img: añadir },
    { name: "Login", path: "/login", component: Login, img: login },
  ];

  return (
    <UserProvider> {/* UserProvider envuelve toda la aplicación */}
      <Router>
        <section className="page dropdown-1-page">
          <nav className="dropdown-1-nav">
            <span className="material-symbols-outlined">
              <img
                src={agenda}
                alt="User Icon"
                style={{ width: "24px", height: "24px" }}
              />
            </span>
            <h1>Agenda</h1>
            <Dropdown1 items={items} />
          </nav>

          <Switch>
            {items.map((route) => (
              <Route
                key={route.name}
                path={route.path}
                component={route.component} // Usamos 'component' en lugar de 'element' para React Router v5
              />
            ))}
            <Route path="/perfil" component={Perfil} /> {/* Ruta del perfil */}
          </Switch>
        </section>
      </Router>
    </UserProvider>
  );
}

export default App;
