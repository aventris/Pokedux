import { setSearchText } from "../reducers/pokemonSlice";
import { SearchOutlined } from "@ant-design/icons";
import "../styles/Searcher.css";
import { useDispatch } from "react-redux";

const Searcher = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputData = e.currentTarget.querySelector("input").value;
    e.currentTarget.querySelector("input").value = "";
    dispatch(setSearchText(inputData));
  };

  return (
    <form onSubmit={handleSubmit} className="searcher">
      <input></input>
      <button>
        <SearchOutlined className="sarcher-icon" />
      </button>
    </form>
  );
};

export default Searcher;
