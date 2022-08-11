import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "./assets/icons/logo.svg";
import PokemonCard from "./components/PokemonCard";
import PokemonList from "./components/PokemonList";
import Searcher from "./components/Searcher";
import { fetchPokemons } from "./reducers/pokemonSlice";
import "./styles/App.css";

function App() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemon.pokemons);

  useEffect(() => {
    dispatch(fetchPokemons("test"));
  }, [dispatch]);

  return (
    <div className="App">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <Searcher />
      <PokemonList>
        {pokemons.map((pokemon) => (
          <PokemonCard data={pokemon} key={pokemon.id} />
        ))}
      </PokemonList>
    </div>
  );
}

export default App;
