import "./index.scss";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Widget() {
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get("/users?new=true", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzdkNGQ0MmFjNmJkMjNjNGM0MzFkMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MDUzMTU0NiwiZXhwIjoxNjQwOTYzNTQ2fQ.W4fUxNAK517rjqGpzJcCzw1UzUBdGbPcbctZfunLeKM",
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
      <span className="widget__title">New Members</span>
      <ul className="widget__list">
        {newUsers.map((user, index) => (
          <li key={index} className="widget__list_item">
            <img
              src={user.profilePic}
              alt=""
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
