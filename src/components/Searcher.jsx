import { setSearchText, setFavoriteFilter } from "../reducers/pokemonSlice";
import { SearchOutlined, HeartFilled } from "@ant-design/icons";
import "../styles/Searcher.css";
import { useDispatch, useSelector } from "react-redux";

const Searcher = () => {
  const favoriteFilter = useSelector((state) => state.pokemon.favoriteFilter);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputData = e.currentTarget.querySelector("input").value;
    e.currentTarget.querySelector("input").value = "";
    dispatch(setSearchText(inputData));
  };

  const handleFavoriteFilter = (data) => {
    dispatch(setFavoriteFilter(data));
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="searcher">
        <input></input>
        <button>
          <SearchOutlined className="sarcher-icon" />
        </button>
      </form>
      <div className="filter">
        <button
          className={favoriteFilter ? "" : "active"}
          onClick={() => handleFavoriteFilter(false)}
        >
          All
        </button>
        <button
          onClick={() => handleFavoriteFilter(true)}
          className={favoriteFilter ? "active" : ""}
        >
          <HeartFilled />
          Favorites
        </button>
      </div>
    </>
  );
};

export default Searcher;
