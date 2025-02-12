import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Dropdown1 } from "./components/Menu"; // Import the Dropdown1 component
import menu from "./assets/menu.png";  // Actualiza la ruta
import Inicio from "./components/Inicio"
import Añadir from "./components/Añadir"
import Login from "./components/Login"


function App() {

 
  
  return (
    <section className="page dropdown-1-page">
    <nav className="dropdown-1-nav">
      <span className="material-symbols-outlined">menu</span>
      <h1>Dashboard</h1>
      <Dropdown1  />
    </nav>
  </section>
  );
}

export default App;
