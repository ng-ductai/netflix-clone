import { useContext, useEffect, useState } from "react";
import "./index.scss";
import { getMovies } from "../../../context/movieContext/apiCalls";
import { useHistory } from "react-router-dom";
import { ListContext } from "../../../context/listContext/ListContext";
import { createList } from "../../../context/listContext/apiCalls";
import { MovieContext } from "../../../context/movieContext/MovieContext";
import { genre, type } from "../../../constants";

export default function NewList() {
  const [list, setList] = useState(null);
  const history = useHistory();

  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createList(list, dispatch);
    history.push("/lists");
  };

  return (
    <div className="addList">
      <h1 className="addList__title">Add a playlist</h1>
      <form className="addList__form">
        <div className="addList__form--main">
          <div className="left">
            <div className="addList__form--item">
              <label>Title</label>
              <input
                type="text"
                placeholder="VD: Popular Movies"
                name="title"
                onChange={handleChange}
              />
            </div>
            <div className="addList__form--item">
              <label>Genre</label>
              <select name="genre" id="genre" onChange={handleChange}>
                <option>Select one</option>
                {genre.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="addList__form--item">
              <label>Type</label>
              <select name="type" onChange={handleChange}>
                <option>Select one</option>
                {type.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="right">
            <div className="addList__form--item">
              <label>Content</label>
              <select
                multiple
                name="content"
                onChange={handleSelect}
                style={{ height: "200px" }}
              >
                {movies.map((movie) => (
                  <option key={movie._id} value={movie._id}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="btn">
          <button className="addList__form--btn" onClick={handleSubmit}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
