import { useContext, useEffect, useState } from "react";
import "./index.scss";
import { getMovies } from "../../../context/movieContext/apiCalls";
import { useHistory } from "react-router-dom";
import { ListContext } from "../../../context/listContext/ListContext";
import { createList } from "../../../context/listContext/apiCalls";
import { MovieContext } from "../../../context/movieContext/MovieContext";

export default function NewList() {
  const [list, setList] = useState(null);
  const history = useHistory()

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
    history.push("/lists")
  };

  return (
    <div className="newList">
      <h1 className="newList__title">New list</h1>
      <form className="newList__form">
        <div className="newList__form--item">
          <label>Title</label>
          <input
            type="text"
            placeholder="VD: Popular Movies"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="newList__form--item">
          <label>Genre</label>
          <select
            name="genre"
            id="genre"
            onChange={handleChange}
          >
            <option>Select one</option>
            <option value="action">Action</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="adventure">Adventure</option>
            <option value="romance">Romance</option>
            <option value="comedy">Comedy</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="thriller">Thriller</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
          </select>
        </div>
        <div className="newList__form--item">
          <label>Type</label>
          <select name="type" onChange={handleChange}>
            <option>Select one</option>
            <option value="movies">Movies</option>
            <option value="series">Series</option>
          </select>
        </div>
        <div className="newList__form--item">
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
        <button className="newList__form--btn" onClick={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  );
}
