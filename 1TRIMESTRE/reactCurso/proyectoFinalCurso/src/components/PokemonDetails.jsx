import "./PokemonDetails.css"; // Asegúrate de que este archivo CSS existe.

function PokemonDetails(props) {
  // Recibimos un props llamado pokemon
  const { pokemon } = props;

  // Verificamos si pokemon tiene un valor
  if (!pokemon) {
    return <p className="loading">Loading...</p>; // Mensaje mientras se carga
  }

  return (
    <section className="selected-pokemon">
      <div className="pokemon-container">
        <h2 className="text">{pokemon.name}</h2>
        <img 
          src={pokemon.sprites.front_default}
          alt={`${pokemon.name} sprite`}
          className="pokemon-img"
        />
        <h3 className="text">HP: {pokemon.stats[0].base_stat}</h3>
      </div>
    </section>
  );
}

export default PokemonDetails;
