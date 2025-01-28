import { useState } from "react";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonCard"; // Corregimos importación
import "./App.css";

function App() {
  // Variable reactiva para guardar el Pokémon seleccionado
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <div className="app">
      {/* Si hay un Pokémon seleccionado, lo mostramos */}
      {selectedPokemon && (
        <div className="selected-pokemon-container">
          <h2 className="pokemon-selected-title">Pokémon Seleccionado</h2>
          <PokemonDetails className="hola" pokemon={selectedPokemon} />
        </div>
      )}

      {/* Lista de todos los Pokémon */}
      <h1 className="titulo">Lista de Pokémon</h1>
      <PokemonList selectedPokemon={setSelectedPokemon} />
    </div>
  );
}

export default App;
