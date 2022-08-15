import "../styles/PokemonTypes.css";

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
