import { useLocation } from "react-router-dom";
import "./index.scss";

export default function EditList() {
  const location = useLocation();
  const list = location.list;
 
  return (
    <div className="edit">
      <div className="edit__title">
        <h1>Edit list</h1>
      </div>
      <div className="edit__container">
        <form>
          <div className="edit__container-form">
            <label>Title</label>
            <input type="text" value={list.title}/>
            <label>Type</label>
            <input type="text"  value={list.type}/>
            <label>Genre</label>
            <input type="text" value={list.genre}/>
          </div>
          <div className="edit__container_update">
            <button className="edit__container_update-btn">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
