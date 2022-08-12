import { StarOutlined, StarFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setFavorite } from "../reducers/pokemonSlice";
import { setDetails } from "../reducers/uiSlice";
import "../styles/PokemonCard.css";

import PokemonTypes from "./PokemonTypes";

const PokemonCard = ({ data }) => {
  const dispatch = useDispatch();
  const handleFavorite = () => {
    dispatch(setFavorite(data.id));
  };

  const toggleDetails = (event) => {
    event.stopPropagation();
    dispatch(setDetails({ isOpen: true, id: data.id }));
  };
  return (
    <div className="pokemonCard" onClick={toggleDetails}>
      <div className="title">
        <p>{data.name}</p>
        {!data.favorite ? (
          <StarOutlined className="starIcon" onClick={handleFavorite} />
        ) : (
          <StarFilled className="starIcon-filled" onClick={handleFavorite} />
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
