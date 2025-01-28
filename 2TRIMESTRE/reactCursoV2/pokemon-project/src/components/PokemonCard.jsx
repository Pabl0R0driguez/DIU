import { useEffect, useState } from "react";
import "./PokemonCard.css";

function PokemonCard(props) {
      // prop que pasamos a PokemonList
      const{pokemon,selectedPokemon} = props;

      return pokemon ? (
            <li className="pokemon-card" onClick={()=> selectedPokemon(pokemon)}>
                  <h2 className="pokemon-name">{pokemon.name}</h2>
                  <img
                        src={pokemon.sprites.front_default}
                        alt="pokemon img"
                        className="pokemon-img"
                  ></img>
                  <h3 className="text">HP: {pokemon.stats[0].base_stat}</h3>
            </li>
      ) : (
            <p className="loading">Cargando...</p>
      );
}

export default PokemonCard;
