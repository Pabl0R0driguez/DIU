import { useState } from 'react';
import './App.css';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';

function App() {
  // Usamos useState para manejar el Pokemon seleccionado
  const [selectedPokemon, setSelectedPokemon] = useState();

  return (
    <>
      {selectedPokemon && (
        <div>
          <h2>Pokemon seleccionado</h2>
          {/* Le pasamos el componente PokemonDetails con el prop pokemon */}
          <PokemonDetails pokemon={selectedPokemon} />
        </div>
      )}

      <h2>Lista de Pokemons</h2>
      {/* Pasamos la función setSelectedPokemon para seleccionar un Pokemon */}
      <PokemonList selectPokemon={setSelectedPokemon} />
    </>
  );
}

export default App;
