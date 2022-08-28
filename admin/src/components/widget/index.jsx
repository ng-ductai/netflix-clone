import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axiosInstance from "../../config";

import "./index.scss";

export default function Widget() {
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axiosInstance.get("/users?new=true", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setNewUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNewUsers();
  }, []);

  return (
    <div className="widget">
      <span className="widget__title">New members</span>
      <ul className="widget__list">
        {newUsers.map((user, index) => (
          <li key={index} className="widget__list_item">
            <img
              src={user.profilePic}
              alt="avt"
              className="widget__list_item-img"
            />
            <div className="widget__list_item-user">
              <span className="username">{user.username}</span>
            </div>
            <div className="widget__list_item-user">
              <span className="username">{user.email}</span>
            </div>
            <button className="widget__list_item-btn">
              <Visibility className="icon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
