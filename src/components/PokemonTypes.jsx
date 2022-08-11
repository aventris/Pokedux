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
  console.log(typesArray);
  return (
    <div className="types">
      {typesArray.map((type) => (
        <>
          <li className={type}>{type}</li>
          {/* <button className={type}>{type}</button> */}
        </>
      ))}
    </div>
  );
};

export default PokemonTypes;
