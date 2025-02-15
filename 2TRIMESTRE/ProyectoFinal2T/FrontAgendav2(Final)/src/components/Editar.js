import React, { useEffect, useState } from 'react';
import AgendaDataService from '../services/agenda.service';
import { useHistory , useLocation} from 'react-router-dom';

function EditPersona(props) {
  const id = window.location.pathname.split('/')[2];
  const history = useHistory();
  console.log("ID de la persona:", id); // Verifica que el ID se extrae correctamente
  const location = useLocation();
  const updatePersonaInList = location.state?.updatePersonaInList;
  // useState para crear una variable reactiva que se actualiza en tiempo real
  const [persona, setPersona] = useState({
    id: id,
    nombre: '',
    apellido: '',
    direccion: '',
    codigoPostal: '',
    ciudad: '',
    fechaNacimiento: '',
  });

  useEffect(() => {
  AgendaDataService.getPersona(id)
    .then(response => {
      setPersona(response.data);
    })
    .catch(error => {
      console.error("Error al obtener la persona:", error);
    });
}, [id]);

  const editPersona = (e) => {
      e.preventDefault();
      AgendaDataService.updatePersona(id, persona)
        .then(() => {
          console.log("Persona actualizada en el servidor.");
          if (updatePersonaInList) {
            updatePersonaInList(persona); // Llama directamente a la función
          }
          history.push("/"); // Redirige después de la actualización
        })
        .catch((error) => {
          console.error("Error al actualizar la persona:", error);
        });
    };

  // Funciones para actualizar cada campo de la persona
  const setNombre = (e) => {
    setPersona({ ...persona, nombre: e.target.value });
  };

  const setApellidos = (e) => {
    setPersona({ ...persona, apellido: e.target.value });
  };

  const setDireccion = (e) => {
    setPersona({ ...persona, direccion: e.target.value });
  };

  const setCodigoPostal = (e) => {
    setPersona({ ...persona, codigoPostal: e.target.value });
  };

  const setCiudad = (e) => {
    setPersona({ ...persona, ciudad: e.target.value });
  };

  const setFechaNacimiento = (e) => {
    setPersona({ ...persona, fechaNacimiento: e.target.value });
  };

  return (
    <div className="edit-persona-container" style={{ minHeight: '100vh', fontFamily: "'Poppins', sans-serif", padding: '2rem' }}>
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', borderRadius: '10px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}>
        <h3 className="mb-4 text-center" style={{ fontWeight: 'bold', color: '#3b3b3b' }}>Editar Persona</h3>
        <form onSubmit={editPersona}>
          <div className="form-group mb-4">
            <label htmlFor="nombre" style={{ fontWeight: '600' }}>Nombre</label>
            <input
              id="nombre"
              className="form-control"
              type="text"
              placeholder="Introduce nombre"
              name="nombre"
              value={persona.nombre}
              onChange={setNombre}
              style={{
                borderRadius: '10px',
                border: '1px solid #ced4da',
                padding: '10px',
              }}
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="apellido" style={{ fontWeight: '600' }}>Apellido</label>
            <input
              id="apellido"
              className="form-control"
              type="text"
              placeholder="Introduce apellido"
              name="apellido"
              value={persona.apellido}
              onChange={setApellidos}
              style={{
                borderRadius: '10px',
                border: '1px solid #ced4da',
                padding: '10px',
              }}
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="direccion" style={{ fontWeight: '600' }}>Dirección</label>
            <input
              id="direccion"
              className="form-control"
              type="text"
              placeholder="Introduce dirección"
              name="direccion"
              value={persona.direccion}
              onChange={setDireccion}
              style={{
                borderRadius: '10px',
                border: '1px solid #ced4da',
                padding: '10px',
              }}
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="codigoPostal" style={{ fontWeight: '600' }}>Código Postal</label>
            <input
              id="codigoPostal"
              className="form-control"
              type="text"
              placeholder="Introduce código postal"
              name="codigoPostal"
              value={persona.codigoPostal}
              onChange={setCodigoPostal}
              style={{
                borderRadius: '10px',
                border: '1px solid #ced4da',
                padding: '10px',
              }}
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="ciudad" style={{ fontWeight: '600' }}>Ciudad</label>
            <input
              id="ciudad"
              className="form-control"
              type="text"
              placeholder="Introduce ciudad"
              name="ciudad"
              value={persona.ciudad}
              onChange={setCiudad}
              style={{
                borderRadius: '10px',
                border: '1px solid #ced4da',
                padding: '10px',
              }}
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="fechaNacimiento" style={{ fontWeight: '600' }}>Fecha de Nacimiento</label>
            <input
              id="fechaNacimiento"
              className="form-control"
              type="date"
              name="fechaNacimiento"
              value={persona.fechaNacimiento}
              onChange={setFechaNacimiento}
              style={{
                borderRadius: '10px',
                border: '1px solid #ced4da',
                padding: '10px',
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{
              borderRadius: '10px',
              fontWeight: '600',
              padding: '12px',
              fontSize: '1rem',
              backgroundColor: '#007bff',
              borderColor: '#007bff',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
          >
            Actualizar
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPersona;
