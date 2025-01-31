import React, { useEffect, useState } from 'react'
import TutorialDataService from '../services/tutorial.service'
import { use } from 'react';

function EditTutorial() {

    const id = window.location.pathname.split('/')[2];

  // useState, para crear una varibale reactiva que se actualiza en tiempo real
  const[tutorial, setTutorial] = useState({
    id : id,
    title: '',
    description: '',
    published: false
  });


  // Usamos useEffect, esto significa que se ejecutará lo primero nada más cargue la página
  // .then(response => { setTutorial(response.data) }) significa que se actualizará el tutorial con la respuesta de la petición
  useEffect(() => {
    TutorialDataService.get(id)
    .then(response => {
        document.getElementById('id').value = response.data.id;
        tutorial.title = document.getElementById('titulo2').value = response.data.title;
        tutorial.description = document.getElementById('descripcion2').value = response.data.description;
        tutorial.published = document.getElementById('published').checked = response.data.published;
    })
  }, [])


  
  // Métodos para manejar los cambios en los inputs
  const editTutorial = (e) => {
    e.preventDefault();
    TutorialDataService.update(id, tutorial)
  
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
    onSubmit={editTutorial}>
      <h1>Añadir Tutorial</h1>
      <input
      id='titulo2'
      placeholder='Título'
      className='añadir-titulo'
      type='text'
      onChange={setTitle}>
      </input>
      <br></br>

      <br></br>

      <input
       id='descripcion2'
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