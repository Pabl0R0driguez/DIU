import React, { useState } from 'react';

const Formulario = ({artista,cancion,inputChange,buscar}) => {


    const onSubmit= (e) => {//cuando se pulse el boton se llama a la funcion buscar
        e.preventDefault();
        buscar()
    };
    
    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>Nombre de Artista:</label>
                <input type="text" id="artista" name="artista"
                onChange={(e) => inputChange("artista", e.target.value)}/>
            </div>
            <div>
                <label>Nombre de Canción:</label>
                <input type="text" id="cancion" name="cancion"
                onChange={(e) => inputChange("cancion", e.target.value)} />
            </div>
            <button type="submit">Buscar</button>
        </form>
    );
};    

export default Formulario;