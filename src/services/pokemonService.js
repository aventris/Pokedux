import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=151";

const getPokemonList = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data.results;
  } catch (err) {
    throw err;
  }
};

const getPokemonDetails = async (url) => {
  try {
    const res = await axios.get(url);
    const pokemonDetailsRaw = res.data;
    const pokemonDetailsClean = (({ name, id, sprites, types }) => ({
      name,
      id,
      sprites,
      types,
      favorite: false,
    }))(pokemonDetailsRaw);
    return pokemonDetailsClean;
  } catch (err) {
    throw err;
  }
};

export { getPokemonList, getPokemonDetails };
