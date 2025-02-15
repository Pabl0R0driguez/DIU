import React, { useState } from 'react';
import TutorialDataService from '../services/tutorial.service';
import { Link } from 'react-router-dom';
import AñadirTut from "../styles/AñadirTut.css"
function AddTutorial() {
  const [tutorial, setTutorial] = useState({
    title: '',
    description: '',
    published: false,
  });

  const agregarTutorial = (e) => {
    e.preventDefault(); // Evitar el refresco de la página
    TutorialDataService.create(tutorial);
  };

  const setTitle = (e) => {
    setTutorial({ ...tutorial, title: e.target.value });
  };

  const setDescription = (e) => {
    setTutorial({ ...tutorial, description: e.target.value });
  };

  const setPublished = (e) => {
    setTutorial({ ...tutorial, published: e.target.checked });
  };

  return (
    <div className="add-tutorial-container">
      {/* Simulando Navbar */}
      <nav className="navbar">
        <h2>Mi Agenda de Tutoriales</h2>
        <Link to="/tutoriales" className="nav-link">
          Lista de Tutoriales
        </Link>
      </nav>

      <form className="form-container" onSubmit={agregarTutorial}>
        <h1>Añadir Tutorial</h1>
        <input
          id="titulo"
          placeholder="Título"
          className="form-input"
          type="text"
          onChange={setTitle}
        />
        <textarea
          id="descripcion"
          placeholder="Descripción"
          className="form-input"
          rows="4"
          onChange={setDescription}
        />
        <div className="checkbox-container">
          Publicado:
          <input type="checkbox" onChange={setPublished} />
        </div>
        <Link to="/tutoriales">
          <button className="submit-button" type="submit">
            Añadir
          </button>
        </Link>
      </form>
    </div>
  );
}

export default AddTutorial;
