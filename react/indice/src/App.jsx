// src/App.js
import React from 'react';
import "./App.css";
const App = () => {
  const projects = [
    {
      title: 'Contador',
      description: 'Tarea 1',
      link: 'https://appreact-ea7e4.web.app/',
    },
  ];

  return (
    <div>
      <h1>Panel de Proyectos</h1>
      <div className="container">
        {projects.map((project, index) => (
          <div key={index} className="card">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              Ver Proyecto
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;