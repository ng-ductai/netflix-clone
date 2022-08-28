import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import storage from "../../../firebase";
import "./index.scss";
import { UserContext } from "../../../context/userContext/UserContext";
import { updateUser } from "../../../context/userContext/apiCalls";
import axiosInstance from "../../../config";

export default function EditUser() {
  const { userId } = useParams();
  const [account, setAccount] = useState({});
  const [user, setUser] = useState({});
  const [img, setImg] = useState(account.profilePic);
  const [uploaded, setUploaded] = useState(0);

  const history = useHistory();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosInstance.get("/users/find/" + userId, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setUser(res.data);
        setAccount(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [userId]);
  console.log("f", user);

  const { dispatch } = useContext(UserContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setUser((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([{ file: img, label: "img" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(user, dispatch);
    history.goBack();
  };

  return (
    <div className="user">
      <h1 className="user__title">Update a user</h1>

      <div className="user__update">
        <div className="user__update-show">
          <div className="top">
            <img src={account.profilePic} alt="avt" className="top__img" />
            <div className="top__title">
              <span className="top__title-name">{account.username}</span>
            </div>
          </div>
          <div className="bottom">
            <span className="bottom__title">Account Details</span>

            <div className="bottom__table">
              <div className="bottom__table_info">
                <p className="bottom__table_info-label">Username:</p>
                <p className="bottom__table_info-title">{account.username}</p>
              </div>
              <div className="bottom__table_info">
                <p className="bottom__table_info-label">Email:</p>
                <p className="bottom__table_info-title">{account.email}</p>
              </div>
              <div className="bottom__table_info">
                <p className="bottom__table_info-label">Role:</p>
                {account.isAdmin ? (
                  <>
                    <p className="bottom__table_info-title">Admin</p>
                  </>
                ) : (
                  <>
                    <p className="bottom__table_info-title">User</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <form className="user__update-form">
          <div className="form">
            <div className="form__item">
              <label>Username</label>
              <input
                type="text"
                value={user.username}
                className="form__item_input"
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className="form__item">
              <label>Role</label>
              <select
                className="form__item_input"
                name="isAdmin"
                onChange={handleChange}
                value={user.isAdmin}
              >
                <option>Select one</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="form__upload">
              <label>Avatar</label>
              <input
                type="file"
                id="file"
                name="img"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
            <div className="form__button">
              {uploaded === 1 ? (
                <button className="form__button-btn" onClick={handleSubmit}>
                  Update
                </button>
              ) : (
                <button className="form__button-btn" onClick={handleUpload}>
                  Upload
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
