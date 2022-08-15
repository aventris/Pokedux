import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getPokemonFromLocalStorage,
  setPokemonIntoLocalStorage,
} from "../services/localStorageService";
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
  favoriteFilter: false,
};

const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async (_, ThunkAPI) => {
    ThunkAPI.dispatch(setLoading(true));
    // Check if localStorage has data
    const localStorage = getPokemonFromLocalStorage();
    if (localStorage) {
      ThunkAPI.dispatch(setPokemons(localStorage));
    } else {
      //If there's no data from local storage, get it from server
      const pokemons = await getPokemonList();
      const pokemonsWithDetails = await Promise.all(
        pokemons.map(
          async (pokemon) => await getShortPokemonDetails(pokemon.url)
        )
      );
      //Save retrieved data to local storage
      setPokemonIntoLocalStorage(pokemonsWithDetails);
      ThunkAPI.dispatch(setPokemons(pokemonsWithDetails));
    }
    ThunkAPI.dispatch(setLoading(false));
  }
);

const fetchPokemonDetails = createAsyncThunk(
  "pokemon/fetchPokemonDetails",
  async (id, { dispatch }) => {
    dispatch(setLoadingDetails(true));
    const pokemonDetails = await getPokemonDetails(id);
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
      setPokemonIntoLocalStorage(state.pokemons);
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setFavoriteFilter: (state, action) => {
      state.favoriteFilter = action.payload;
    },
    setDetailedPokemon: (state, action) => {
      state.detailedPokemon = action.payload;
    },
  },
});

export const {
  setPokemons,
  setFavorite,
  setSearchText,
  setDetailedPokemon,
  setFavoriteFilter,
} = pokemonSlice.actions;
export { fetchPokemons, fetchPokemonDetails };
export default pokemonSlice.reducer;
