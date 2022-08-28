import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "./index.scss";
import { genre, type } from "../../../constants";
import { updateList } from "../../../context/listContext/apiCalls";
import { ListContext } from "../../../context/listContext/ListContext";
import axiosInstance from "../../../config";

export default function EditList() {
  const { listId } = useParams();
  const [list, setList] = useState({});
  const history = useHistory();

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await axiosInstance.get("/lists/find/" + listId, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getList();
  }, [listId]);

  const { dispatch } = useContext(ListContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateList(list, dispatch);
    history.goBack();
  };
  return (
    <div className="edit">
      <div className="edit__title">
        <h1>Update playlist</h1>
      </div>
      <div className="edit__container">
        <form>
          <div className="edit__container-form">
            <label>Title</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={list.title}
            />
            <label>Type</label>
            <select name="type" onChange={handleChange} value={list.type}>
              {type.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.title}
                </option>
              ))}
            </select>
            <label>Genre</label>
            <select name="genre" onChange={handleChange} value={list.genre}>
              {genre.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          <div className="edit__container_update">
            <button
              onClick={handleSubmit}
              className="edit__container_update-btn"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
