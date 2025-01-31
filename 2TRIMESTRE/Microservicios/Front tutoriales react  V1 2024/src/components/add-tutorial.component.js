import React, { useState } from 'react'
import TutorialDataService from '../services/tutorial.service'

function AddTutorial() {

  // useState, para crear una varibale reactiva que se actualiza en tiempo real
  const[tutorial, setTutorial] = useState({
    title: '',
    description: '',
    published: false
  });

  // Métodos para manejar los cambios en los inputs
  const agregarTutorial = () => {
    TutorialDataService.create(tutorial)
  
  }

  // Actualizar el titulo
  const setTitle = (e) => {
   tutorial.title = e.target.value;
  }
  // Actualizar la descripción
  const setDescription = (e) =>{
    tutorial.description = e.target.value;
  }
  // Actualizar el estado de publicado
  // Usamos checked para verificar si el checkbox está marcado
  const setPublished = (e) => {
    tutorial.published = e.target.checked;
  }



  return (
    <form
    onSubmit={agregarTutorial}>
      <h1>Añadir Tutorial</h1>
      <input
       id='titulo'
      placeholder='Título'
      className='añadir-titulo'
      type='text'
      onChange={setTitle}>
      </input>
      <br></br>

      <br></br>

      <input
       id='descripcion'
      placeholder='Descripción'
      className='añadir-descripcion'
      type='text'
      onChange={setDescription}
      ></input>
      <br></br>

      <br></br>
      Publicado:
      <input
      type='checkbox'
      onChange={setPublished}>
      </input>

      <br></br>

      <button
       className='boton-añadir'
       type='submit'>
        Añadir
      </button>

    </form>
  )
}

export default AddTutorial