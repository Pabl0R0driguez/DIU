import "./PokemonList.css"
import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard"; // Importa el componente correctamente.

function PokemonList(props) {

      // Estado inicial
      // Usaremos setPokemons para actualizar el estado
      const [pokemons, setPokemons] = useState([])

      // Para obtener 10 pokemons 
      useEffect (() => {
            getPokemon(10);
      }, [])

      // Llamar a pokemon
      // Con fetchPokemon, tomamos un ínidice y hace una solicitud a la API para obtener los datos de
      // los Pokemons
      const fetchPokemon = async (index) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
            const data = await response.json();
            return data;
      }

      // Con el useEffect llenaremos este array vacío
      // Llamamos a fetchPokemon en un bucle para obtener una cantidad específica
      const getPokemon = async (quantity) => {
            const pokemonArray = [];

            for(let i = 1; i <= quantity; i++){
                  const pokemon = await fetchPokemon(i);
                  pokemonArray.push(pokemon);
            }

            // Seteamos el array con pokemonArray, con 10 pokemons
            setPokemons(pokemonArray)
      }


      // Por cada pokemon devolvermos una pokemon card
      // Transformamos cada objeto Pokemón en un componente PokemonCard
      // Se le pasa el objeto pokemon como props y se usa pokemon.id como calve única para cada tarjeta
      // selectPokemon = {props.selectPokemon} recibimos en PokemonList los props que llegan del selectPokemon de App
      const pokemonsCards = pokemons.map((pokemon) =>{
            return <PokemonCard 
            key = {pokemon.id} 
            pokemon = {pokemon} 
            selectPokemon = {props.selectPokemon}>
                  
            </PokemonCard>
      })


  return (
      <ul className="pokemon-list">
            {/* Mostramos lista en nuestra web con map */}
            {pokemonsCards}


      </ul>
)
}

export default PokemonList