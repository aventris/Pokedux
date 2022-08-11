import { StarOutlined, StarFilled } from "@ant-design/icons";
import "../styles/PokemonCard.css";
import PokemonTypes from "./PokemonTypes";

const PokemonCard = ({ data }) => {
  const random = () => {
    return Math.random() > 0.5 ? true : false;
  };
  return (
    <div className="pokemonCard">
      <div className="title">
        <p>{data.name}</p>
        {random() ? (
          <StarOutlined className="starIcon" />
        ) : (
          <StarFilled className="starIcon-filled" />
        )}
      </div>
      <div className="sprite">
        <img src={data.sprites.front_default} alt={data.name} />
      </div>
      <div className="info">
        <PokemonTypes types={data.types} />
      </div>
    </div>
  );
};

export default PokemonCard;
