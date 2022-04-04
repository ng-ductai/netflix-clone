import { Publish } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import "./index.scss";

export default function EditUser() {
  const location = useLocation();
  const user = location.user;

  return (
    <div className="user">
      <h1 className="user__title">Update user</h1>

      <div className="user__container">
        <div className="user__container_update">
          <div className="user__container_update-show">
            <div className="top">
              <img
                src={user.profilePic}
                alt=""
                className="top__img"
              />
              <div className="top__title">
                <span className="top__title-name">{user.username}</span>
              </div>
            </div>
            <div className="bottom">
              <span className="bottom__title">Account Details</span>

              <table className="bottom__table">
                <tbody>
                  <tr className="bottom__table_info">
                    <td className="bottom__table_info-label">Username:</td>
                    <td className="bottom__table_info-title">{user.username}</td>
                  </tr>
                  <tr className="bottom__table_info">
                    <td className="bottom__table_info-label">Email:</td>
                    <td className="bottom__table_info-title">{user.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <form className="user__container_update-form">
            <div className="form">
              <div className="form__item">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={user.username}
                  className="form__item_input"
                />
              </div>
              <div className="form__item">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={user.email}
                  className="form__item_input"
                />
              </div>
              <div className="form__upload">
                <img
                  className="form__upload_img"
                  src={user.profilePic}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="form__upload_icon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <div className="form__button">
                <button className="form__button-btn">Update</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
