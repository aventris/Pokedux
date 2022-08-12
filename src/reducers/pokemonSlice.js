import create from "@ant-design/icons/lib/components/IconFont";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getPokemonDetails,
  getShortPokemonDetails,
  getPokemonList,
} from "../services/pokemonService";
import { setLoading, setLoadingDetails } from "./uiSlice";

const initialState = {
  pokemons: [],
  detailedPokemon: "",
  searchText: "",
};

const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async (_, ThunkAPI) => {
    ThunkAPI.dispatch(setLoading(true));
    const pokemons = await getPokemonList();
    const pokemonsWithDetails = await Promise.all(
      pokemons.map(async (pokemon) => await getShortPokemonDetails(pokemon.url))
    );
    ThunkAPI.dispatch(setPokemons(pokemonsWithDetails));
    ThunkAPI.dispatch(setLoading(false));
  }
);

const fetchPokemonDetails = createAsyncThunk(
  "pokemon/fetchPokemonDetails",
  async (id, { dispatch }) => {
    dispatch(setLoadingDetails(true));
    const pokemonDetails = await getPokemonDetails(id);
    console.log(pokemonDetails);
    dispatch(setDetailedPokemon(pokemonDetails));
    dispatch(setLoadingDetails(false));
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
    setDetailedPokemon: (state, action) => {
      state.detailedPokemon = action.payload;
    },
  },
});

export const { setPokemons, setFavorite, setSearchText, setDetailedPokemon } =
  pokemonSlice.actions;
export { fetchPokemons, fetchPokemonDetails };
export default pokemonSlice.reducer;
