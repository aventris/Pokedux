import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPokemonDetails, getPokemonList } from "../services/pokemonService";
import { setLoading } from "./uiSlice";

const initialState = {
  pokemons: [],
  searchText: "",
};

const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async (_, ThunkAPI) => {
    ThunkAPI.dispatch(setLoading(true));
    const pokemons = await getPokemonList();
    const pokemonsWithDetails = await Promise.all(
      pokemons.map(async (pokemon) => await getPokemonDetails(pokemon.url))
    );
    ThunkAPI.dispatch(setPokemons(pokemonsWithDetails));
    ThunkAPI.dispatch(setLoading(false));
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemons: (state, action) => {
      state.pokemons = action.payload;
    },
    setFavorite: (state, action) => {
      const pokemonIndex = state.pokemons.findIndex(
        (pokemon) => pokemon.id === action.payload
      );
      state.pokemons[pokemonIndex].favorite =
        !state.pokemons[pokemonIndex].favorite;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const { setPokemons, setFavorite, setSearchText } = pokemonSlice.actions;
export { fetchPokemons };
export default pokemonSlice.reducer;
