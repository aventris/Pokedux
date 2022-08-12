import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons } from "./reducers/pokemonSlice";

import PokemonCard from "./components/PokemonCard";
import PokemonList from "./components/PokemonList";
import Searcher from "./components/Searcher";

import { Loading3QuartersOutlined, LoadingOutlined } from "@ant-design/icons";
import logo from "./assets/icons/logo.svg";
import "./styles/App.css";
import "./styles/Loader.css";
import Modal from "./components/Modal";

function App() {
  const allPokemons = useSelector((state) => state.pokemon.pokemons);
  const search = useSelector((state) => state.pokemon.searchText);
  const loading = useSelector((state) => state.ui.loading);

  const getVisiblePokemons = (pokemons, search) => {
    if (search) {
      const filteredPokemons = pokemons.filter((pokemon) =>
        pokemon.name.includes(search)
      );
      console.log(filteredPokemons);
      return filteredPokemons;
    } else return pokemons;
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
          <Modal />
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
