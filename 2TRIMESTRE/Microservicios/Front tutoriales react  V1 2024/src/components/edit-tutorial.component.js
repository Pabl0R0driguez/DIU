import React, { useEffect, useState } from 'react';
import TutorialDataService from '../services/tutorial.service';

function EditTutorial() {
    const id = window.location.pathname.split('/')[2];

    // useState para crear una variable reactiva que se actualiza en tiempo real
    const [tutorial, setTutorial] = useState({
        id: id,
        title: '',
        description: '',
        published: false,
    });

    // Usamos useEffect para cargar el tutorial cuando se monta el componente
    useEffect(() => {
        TutorialDataService.get(id)
            .then(response => {
                // Actualiza el estado directamente
                setTutorial(response.data); 
            })
            .catch(e => {
                console.error(e); 
            });
    }, [id]);

    // Manejar la edición del tutorial
    const editTutorial = (e) => {
        e.preventDefault();
        // Actualiza el tutorial
        TutorialDataService.update(id, tutorial)
            .then(response => {
                console.log('Tutorial actualizado', response.data);
            })
            .catch(e => {
                console.error(e);
            });
    };

    // Actualizar el título
    const setTitle = (e) => {
        setTutorial({ ...tutorial, title: e.target.value }); // Usar setTutorial para actualizar
    };

    // Actualizar la descripción
    const setDescription = (e) => {
        setTutorial({ ...tutorial, description: e.target.value }); // Usar setTutorial para actualizar
    };

    // Actualizar el estado de publicado
    const setPublished = (e) => {
        setTutorial({ ...tutorial, published: e.target.checked }); // Usar setTutorial para actualizar
    };

    return (
        <form onSubmit={editTutorial}>
            <h1>Editar Tutorial</h1>
            <input
                id='titulo2'
                placeholder='Título'
                className='añadir-titulo'
                type='text'
                value={tutorial.title}
                onChange={setTitle}
            />
            <br></br>

            <br></br>

            <input
                id='descripcion2'
                placeholder='Descripción'
                className='añadir-descripcion'
                type='text'
                value={tutorial.description}
                onChange={setDescription}
            />
            <br></br>

            <br></br>
            Publicado:
            <input
                type='checkbox'
                checked={tutorial.published} // Usar checked para reflejar el estado
                onChange={setPublished}
            />
            <br></br>

            <button className='boton-añadir' type='submit'>
                Actualizar
            </button>
        </form>
    );
}

export default EditTutorial;
