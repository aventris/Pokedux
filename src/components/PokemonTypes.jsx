import "../styles/PokemonTypes.css";

const mapTypes = {
  normal: "",
  fighting: "",
  flying: "",
  poison: "",
  ground: "",
  rock: "",
  bug: "",
  ghost: "",
  steel: "",
  fire: "",
  water: "",
  grass: "",
  electric: "",
  psychic: "",
  ice: "",
  dragon: "",
  dark: "",
  fairy: "",
  unknown: "",
  shadow: "",
};

const PokemonTypes = ({ types }) => {
  const typesArray = types.map((type) => type.type.name);
  return (
    <div className="types">
      {typesArray.map((type, index) => (
        <li className={type} key={index}>
          {type}
        </li>
      ))}
    </div>
  );
};

export default PokemonTypes;
