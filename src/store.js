import { configureStore } from "@reduxjs/toolkit";
import { pokemonSlice } from "./reducers/pokemonSlice";
import { uiSlice } from "./reducers/uiSlice";

const reducer = {
  pokemon: pokemonSlice,
  ui: uiSlice,
};

const store = configureStore();
export { store };
