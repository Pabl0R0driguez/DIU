function PokemonDetails(props) {

const {pokemon} = props;

if (!pokemon) return <p>No se seleccionó ningún Pokémon.</p>;


  return (
    <section className="selected-pokemon">
            <div>
                  <h2 className="text">{pokemon.name}</h2>
                  <img 
                  src={pokemon.sprites.front_default} 
                  alt="pokemon-img" 
                  className="pokemon-img">
                  </img>
                  <h3 className="text">HP: {pokemon.stats[0].base_stat}</h3>
            </div>
      </section>
  )
}

export default PokemonDetails