import React, { useEffect } from 'react'

function MovieList() {
// Renderizar listas en react
const peliculas = ["Resacón en las Vegas", "Spiderman" , "Juego de Tronos"]

// Devuelve un nuevo array del array de peliculas creado anteriormente
// Cada uno de sus elementos tendrá una clave única con su índice y nombre
const HTMLPeliculas = peliculas.map((pelicula, indice) => {
      return <p key = {pelicula}>{indice + 1} - {pelicula}</p>
})


  return (
      
      <section>
            <h2>Peliculas</h2>
            {HTMLPeliculas}

      </section>
)
}

export default MovieList