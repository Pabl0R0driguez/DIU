import React, { useState } from 'react'
import AgendaDataService from '../services/agenda.service'
import '../styles/tutorials.styles.css'; // Importar estilos personalizados


function AddTutorial() {

  // useState, para crear una varibale reactiva que se actualiza en tiempo real
  const[persona, setPersona] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    codigoPostal: '',
    ciudad: '',
    fechaNaciemiento: ''
  });

  // Métodos para manejar los cambios en los inputs
  const agregarPersona = () => {
    AgendaDataService.createPersona(persona)
  
  }

  // Actualizar el titulo
  const setNombre = (e) => {
   persona.nombre = e.target.value;
  }
  // Actualizar la apellido
  const setApellidos = (e) =>{
    persona.apellido = e.target.value;
  }

  // Actualizar la descripción
  const setDireccion = (e) =>{
    persona.direccion = e.target.value;
  }

  // Actualizar la descripción
  const setCodigoPostal = (e) =>{
    persona.codigoPostal = e.target.value;
  }

  // Actualizar la descripción
  const setCiudad = (e) =>{
    persona.ciudad = e.target.value;
  }

  // Actualizar la descripción
  const setFechaNacimiento = (e) =>{
    persona.fechaNaciemiento = e.target.value;
  }



  return (
    <form
    onSubmit={agregarPersona}>
      <h1>Añadir Tutorial</h1>
      <input
       id='nombre'
      placeholder='Introduce nombre'
      className='añadir-nombre'
      type='text'
      onChange={setNombre}>
      </input>
      <br></br>

      <br></br>

      <input
       id='apellidos'
      placeholder='Apellido'
      className='añadir-apellido'
      type='text'
      onChange={setApellidos}
      ></input>
      <br></br>


      <input
       id='direccion'
      placeholder='Dirección'
      className='añadir-dirección'
      type='text'
      onChange={setDireccion}
      ></input>
      <br></br>

      <input
       id='codigoPostal'
      placeholder='Código Postal'
      className='añadir-codigoPostal'
      type='text'
      onChange={setCodigoPostal}
      ></input>
      <br></br>

      <input
       id='ciudad'
      placeholder='Ciudad'
      className='añadir-ciudad'
      type='text'
      onChange={setCiudad}
      ></input>
      <br></br>

      <input
       id='fechaNacimiento'
      placeholder='Fecha Nacimiento'
      className='añadir-feechaNacimiento'
      type='date'
      onChange={setFechaNacimiento}
      ></input>
      <br></br>


      {/* <br></br>
      Publicado:
      <input
      type='checkbox'
      onChange={setPublished}>
      </input>

      <br></br> */}

      <button
       className='boton-añadir'
       type='submit'>
        Añadir
      </button>

    </form>
  )
}

export default AddTutorial