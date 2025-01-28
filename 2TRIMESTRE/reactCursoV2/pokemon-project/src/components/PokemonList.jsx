import { useEffect } from "react"
import PokemonCard from "./PokemonCard"
import { useState } from "react" 
import "./PokemonList.css"   

function PokemonList(props) {
      // Variable reactiva que cambie cuando los fetch estén listos, la usaremos en el getPokemon
      const[pokemons, setPokemons] = useState([]);

      // Para que al ejecutar nos de 10 pokemons
      useEffect  (() => {
            getPokemon(10);
      }, []);




      /* 1º Hacemos una petición fetch para obtener los datos de un Pokémon específico desde la URL de la API. 
      Para eso ponemos el ${index}
      Luego pasamos los datos a json para poder leerlos. */

      const fetchPokemon = async (index) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
            const data = await response.json()
            return data
      }




      /* 2º Intentaremos obtener varios Pokémon (según la cantidad especificada) y actualizar el estado pokemons con los datos.
      Le pasamos quantity para establecer la cantidad de pokemons que queremos rescatar de la API
      Creamos un array vacio para guardar los pokemons
      Recorremos los números del 1 al valor de quantity.
      En cada iteración:
      Llama a fetchPokemon(i) para obtener los datos de un Pokémon específico.
      Añade los datos obtenidos al arreglo pokemonArray.
      Finalmente guardamos los pokemons rescatados en nuestra variable reactiva
      */
      const getPokemon = async (quantity) => {
      const pokemonArray = [];

      for(let i = 1; i <= quantity; i++) {
            const pokemon = await fetchPokemon(i)
            pokemonArray.push(pokemon)
      }
      setPokemons(pokemonArray);
}

      /* 3º Convertimos los datos de los Pokémon en una lista de componentes PokemonCard.
      PokemonCards con el uso de .map, recorreremos el array y para cada pokémon:
      Crea un componente PokemonCard.
      Pasa el Pokémon actual como una propiedad (pokemon={pokemon}).
      El atributo key={pokemon.id} garantiza que React identifique de manera única 
      cada tarjeta (esto es importante para evitar problemas al renderizar listas dinámicas).
      */
      const pokemonCards = pokemons.map((pokemon) => {
            return (
            <PokemonCard 
                  key={pokemon.id} 
                  pokemon={pokemon} 
                  selectedPokemon={props.selectedPokemon}>
            </PokemonCard>
      )})


      /* 4º Finalmente renderizamos la lista, insertamos las cartas generadas */   
      return (
      <ul className="pokemon-list">
            {pokemonCards}
      </ul>
      )
      }




export default PokemonList