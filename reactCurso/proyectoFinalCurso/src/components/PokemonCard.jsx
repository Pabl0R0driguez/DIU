import "./PokemonCard.css";

// Haremos que el pokemon nos llegue como props
function PokemonCard(props) {
  // Lo almacenamos en una variable
  const { pokemon, selectPokemon } = props;

  return (
    pokemon ? ( // Verifica si `pokemon` tiene un valor.
      // Cuando hacemos click en las tarjetas pokemon, llamamos al método selectPokemon y le pasamos el pokemon de esa tarjeta
      // Esto nos vienen de PokemonList
      <li className="pokemon-card" onClick={() => selectPokemon(pokemon)}>
        <h2 className="pokemon-name">{pokemon.name}</h2>
        <img 
          src={pokemon.sprites.front_default} 
          alt={`${pokemon.name} sprite`} 
          className="pokemon-img"
        />
        <h3 className="text">HP: {pokemon.stats[0].base_stat}</h3>
      </li>
    ) : (
      <p className="loading">Loading ...</p>
    )
  );
}

export default PokemonCard;
