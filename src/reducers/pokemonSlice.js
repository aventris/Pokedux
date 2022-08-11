import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPokemonDetails, getPokemonList } from "../services/pokemonService";

const initialState = {
  pokemons: [],
};

const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async (_, ThunkAPI) => {
    const pokemons = await getPokemonList();
    const pokemonsWithDetails = await Promise.all(
      pokemons.map(async (pokemon) => await getPokemonDetails(pokemon.url))
    );
    ThunkAPI.dispatch(setPokemons(pokemonsWithDetails));
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemons: (state, action) => {
      console.log("dentro de set", state, action);
      state.pokemons = action.payload;
    },
  },
});

export const { setPokemons } = pokemonSlice.actions;
export { fetchPokemons };
export default pokemonSlice.reducer;
