import { createSlice } from "@reduxjs/toolkit";

const initialPokemonState = {
  pokemons: [],
  favorites: [],
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialPokemonState,
  reducers: {
    setPokemons: (state, action) => {
      state.pokemons = action.payload;
    },
  },
});

export { pokemonSlice };
