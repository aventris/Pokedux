import { Loading3QuartersOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPokemonDetails,
  setDetailedPokemon,
} from "../reducers/pokemonSlice";
import "../styles/PokemonDetails.css";
import { CloseOutlined } from "@ant-design/icons";
import { setDetails } from "../reducers/uiSlice";
import { useRef } from "react";

const PokemonDetails = ({ pokemonId }) => {
  const elementRef = useRef(null);
  const loading = useSelector((state) => state.ui.loadingDetails);
  const pokemon = useSelector((state) => state.pokemon.detailedPokemon);
  const dispatch = useDispatch();

  const toggleDetails = () => {
    dispatch(setDetails(false));
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (!elementRef.current.contains(event.target) && elementRef.current) {
        toggleDetails();
      }
    };
    document.addEventListener("click", handleClick);

    dispatch(fetchPokemonDetails(pokemonId));

    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="pokemonDetails" ref={elementRef}>
      {loading ? (
        <div className="loader">
          <Loading3QuartersOutlined spin={true} />
        </div>
      ) : (
        <div>
          <h3>{pokemon.name}</h3>
          <CloseOutlined onClick={toggleDetails} />
          <div className="sprites">
            <div className="genderSelector"></div>
            <div>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <img src={pokemon.sprites.back_default} alt={pokemon.name} />
              <img src={pokemon.sprites.front_female} alt={pokemon.name} />
              <img src={pokemon.sprites.back_female} alt={pokemon.name} />
              <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />
              <img src={pokemon.sprites.back_shiny} alt={pokemon.name} />
              <img
                src={pokemon.sprites.front_shiny_female}
                alt={pokemon.name}
              />
              <img src={pokemon.sprites.back_shiny_female} alt={pokemon.name} />
            </div>
            <div className="stats">
              {pokemon.stats.map((stat, index) => (
                <React.Fragment key={index}>
                  <span>{stat.stat.name + ": "}</span>
                  <span>{stat.base_stat}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
