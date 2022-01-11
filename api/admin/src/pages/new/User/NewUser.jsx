import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import "./index.scss";
import { UserContext } from "../../../context/userContext/UserContext";
import { createUser } from "../../../context/userContext/apiCalls";

export default function NewUser() {
  const [user, setUser] = useState(null);
  const history = useHistory();

  const { dispatch } = useContext(UserContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(user, dispatch);
    history.push("/users");
  };

  return (
    <div className="newUser">
      <h1 className="newUser__title">New user</h1>
      <form className="newUser__form">
        <div className="newUser__form_item">
          <label>Username</label>
          <input
            type="text"
            placeholder="VD: Nguyen Van A"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="newUser__form_item">
          <label>Email</label>
          <input
            type="email"
            placeholder="VD: a@gmail.com"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="newUser__form_item">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="VD: 123456"
            onChange={handleChange}
          />
        </div>
        <div className="newUser__form_item">
          <label> Admin </label>
          <select
            className="newUser__form_item-select"
            name='isAdmin'
            onChange={handleChange}
          >
            <option>Select one</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </form>
      <div className="newUser__btn">
        <button className="btn" onClick={handleSubmit}>
          {" "}
          Create
        </button>
      </div>
    </div>
  );
}
