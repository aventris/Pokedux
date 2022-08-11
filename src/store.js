import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./reducers/pokemonSlice";
import uiReducer from "./reducers/uiSlice";

const reducer = {
  pokemon: pokemonReducer,
  ui: uiReducer,
};

const store = configureStore({
  reducer,
});

export { store };
