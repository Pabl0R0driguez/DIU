import React, { useState } from 'react';
import AgendaDataService from '../services/agenda.service';
import 'bootstrap/dist/css/bootstrap.min.css';

function Añadir() {
  const [persona, setPersona] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    codigoPostal: '',
    ciudad: '',
    fechaNaciemiento: '',
  });

  const agregarPersona = (e) => {
    e.preventDefault();
    AgendaDataService.createPersona(persona);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersona({
      ...persona,
      [name]: value,
    });
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">Añadir Persona</h3>
      <form onSubmit={agregarPersona}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="nombre"></label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              className="form-control"
              placeholder="Introduce nombre"
              value={persona.nombre}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="apellidos"></label>
            <input
              id="apellidos"
              name="apellido"
              type="text"
              className="form-control"
              placeholder="Introduce apellido"
              value={persona.apellido}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="direccion"></label>
          <input
            id="direccion"
            name="direccion"
            type="text"
            className="form-control"
            placeholder="Introduce dirección"
            value={persona.direccion}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="codigoPostal"></label>
            <input
              id="codigoPostal"
              name="codigoPostal"
              type="text"
              className="form-control"
              placeholder="Introduce código postal"
              value={persona.codigoPostal}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="ciudad"></label>
            <input
              id="ciudad"
              name="ciudad"
              type="text"
              className="form-control"
              placeholder="Introduce ciudad"
              value={persona.ciudad}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="fechaNacimiento"></label>
          <input
            id="fechaNacimiento"
            name="fechaNaciemiento"
            type="date"
            className="form-control"
            value={persona.fechaNaciemiento}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Añadir
        </button>
      </form>
    </div>
  );
}

export default Añadir;
