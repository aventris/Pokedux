import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons } from "./reducers/pokemonSlice";

import PokemonCard from "./components/PokemonCard";
import PokemonList from "./components/PokemonList";
import Searcher from "./components/Searcher";
import PokemonDetails from "./components/PokemonDetails";
import Modal from "./components/Modal";

import { Loading3QuartersOutlined } from "@ant-design/icons";
import logo from "./assets/icons/logo.svg";
import "./styles/App.css";
import "./styles/Loader.css";

function App() {
  const allPokemons = useSelector((state) => state.pokemon.pokemons);
  const search = useSelector((state) => state.pokemon.searchText);
  const loading = useSelector((state) => state.ui.loading);
  const pokemonDetails = useSelector((state) => state.ui.details);
  const favoriteFilter = useSelector((state) => state.pokemon.favoriteFilter);

  const getVisiblePokemons = (pokemons, search) => {
    let newPokemonList = [];
    if (favoriteFilter)
      newPokemonList = pokemons.filter((pokemon) => pokemon.favorite);
    else newPokemonList = pokemons;
    if (search) {
      const filteredPokemons = newPokemonList.filter((pokemon) =>
        pokemon.name.includes(search)
      );
      return filteredPokemons;
    } else return newPokemonList;
  };

  const dispatch = useDispatch();
  const pokemons = getVisiblePokemons(allPokemons, search);
  useEffect(() => {}, [search]);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      {loading ? (
        <div className="loader">
          <Loading3QuartersOutlined spin={true} />
        </div>
      ) : (
        <React.Fragment>
          <Searcher />
          <PokemonList>
            {pokemons.map((pokemon) => (
              <PokemonCard data={pokemon} key={pokemon.id} />
            ))}
          </PokemonList>
        </React.Fragment>
      )}

      {pokemonDetails.isOpen && (
        <Modal>
          <PokemonDetails pokemonId={pokemonDetails.id} />
        </Modal>
      )}
    </div>
  );
}

export default App;
