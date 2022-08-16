import { Loading3QuartersOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonDetails } from "../reducers/pokemonSlice";
import "../styles/PokemonDetails.css";
import { CloseOutlined } from "@ant-design/icons";
import {
  setDetails,
  setSpriteGender,
  setSpriteType,
} from "../reducers/uiSlice";
import { useRef } from "react";

const PokemonDetails = ({ pokemonId }) => {
  const elementRef = useRef(null);
  const loading = useSelector((state) => state.ui.loadingDetails);
  const pokemon = useSelector((state) => state.pokemon.detailedPokemon);
  const gender = useSelector((state) => state.ui.spriteGender);
  const type = useSelector((state) => state.ui.spriteType);
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
    dispatch(setSpriteGender("male"));
    dispatch(setSpriteType("normal"));
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleGender = (newGender) => {
    dispatch(setSpriteGender(newGender));
    dispatch(setSpriteType("normal"));
  };

  const handleType = (newType) => {
    dispatch(setSpriteType(newType));
  };

  const isVisible = (spriteGender, spriteType) => {
    if (gender === spriteGender && type === spriteType) return "";
    return " hidden";
  };
  return (
    <div className="pokemonDetails" ref={elementRef}>
      {loading ? (
        <div className="loader">
          <Loading3QuartersOutlined spin={true} />
        </div>
      ) : (
        <div>
          <h1 className="title">{pokemon.name}</h1>
          <CloseOutlined className="closeIcon" onClick={toggleDetails} />

          <div className="spriteWrapper">
            <div className="sprites">
              <div className={"front" + isVisible("male", "normal")}>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <img src={pokemon.sprites.back_default} alt={pokemon.name} />
              </div>

              {pokemon.sprites.front_shiny && (
                <div className={"front" + isVisible("male", "shiny")}>
                  <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />
                  <img src={pokemon.sprites.back_shiny} alt={pokemon.name} />
                </div>
              )}

              {pokemon.sprites.front_female && (
                <div className={"front" + isVisible("female", "normal")}>
                  <img src={pokemon.sprites.front_female} alt={pokemon.name} />
                  <img src={pokemon.sprites.back_female} alt={pokemon.name} />
                </div>
              )}

              {pokemon.sprites.front_shiny_female && (
                <div className={"front" + isVisible("female", "shiny")}>
                  <img
                    src={pokemon.sprites.front_shiny_female}
                    alt={pokemon.name}
                  />
                  <img
                    src={pokemon.sprites.back_shiny_female}
                    alt={pokemon.name}
                  />
                </div>
              )}
            </div>
            <div className="spriteFilter">
              <div className="gender">
                <button
                  className={gender === "male" ? " active" : "puto"}
                  onClick={() => handleGender("male")}
                >
                  Male
                </button>
                {pokemon.sprites.front_female && (
                  <button
                    className={gender === "female" ? " active" : ""}
                    onClick={() => handleGender("female")}
                  >
                    Female
                  </button>
                )}
              </div>

              <div className="type">
                <button
                  className={type === "normal" ? " active" : ""}
                  onClick={() => handleType("normal")}
                >
                  Normal
                </button>
                <button
                  className={type === "shiny" ? " active" : ""}
                  onClick={() => handleType("shiny")}
                >
                  Shiny
                </button>
              </div>
            </div>
            <div className="stats">
              <h3>Stats</h3>
              <div className="statsWrapper">
                <ul>
                  {pokemon.stats.map((stat, index) => (
                    <li key={index}>
                      <span>{stat.stat.name + ": "}</span>
                      <span>{stat.base_stat}</span>
                    </li>
                  ))}
                </ul>
                <ul>
                  <li>
                    <span>id:</span> <span>{pokemon.id}</span>
                  </li>
                  <li>
                    <span>height:</span> <span>{pokemon.height / 10} m</span>
                  </li>
                  <li>
                    <span>weight:</span> <span>{pokemon.weight / 10} kg</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="abilities">
              <h3>Abilities</h3>
              <ul>
                {pokemon.abilities.map((ability) => (
                  <li key={ability.ability.name}>
                    {ability.ability.name +
                      ` ${ability.is_hidden ? "[hidden]" : ""}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
