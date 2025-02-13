import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Dropdown1 } from "./components/Menu"; // Importa el componente Dropdown1
import agenda from "./assets/agenda.png";
import menu from "./assets/menu.png";
import Inicio from "./components/Inicio";
import Añadir from "./components/Añadir";
import Login from "./components/Login";
import inicio from "./assets/inicio.png";
import login from "./assets/login.png";
import añadir from "./assets/añadir.png";


import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // Importa las rutas de React Router

function App() {
  const items = [
    { name: "Inicio", path: "/profile", component: Inicio, img: inicio }, 
    { name: "Añadir", path: "/add", component: Añadir, img: añadir }, 
    { name: "Login", path: "/login", component: Login ,img: login},
  ];

  return (
    <Router>
      <section className="page dropdown-1-page">
        <nav className="dropdown-1-nav">
          <span className="material-symbols-outlined">
            <img src={agenda} alt="User Icon" style={{ width: "24px", height: "24px" }} />
          </span>
          <h1>Agenda</h1>
          <Dropdown1 items={items} />
        </nav>

        <Switch>
          {items.map((route) => (
            <Route
              key={route.name}
              exact
              path={route.path}
              component={route.component}
            />
          ))}
        </Switch>
      </section>
    </Router>
  );
}

export default App;