const getPokemonFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("@pokedux/pokemonsInfo"));
};

const setPokemonIntoLocalStorage = (data) => {
  const jsonData = JSON.stringify(data);
  localStorage.setItem("@pokedux/pokemonsInfo", jsonData);
};

export { setPokemonIntoLocalStorage, getPokemonFromLocalStorage };
