import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import "./index.scss";
import storage from "../../../firebase";
import { UserContext } from "../../../context/userContext/UserContext";
import { createUser } from "../../../context/userContext/apiCalls";

export default function NewUser() {
  const [user, setUser] = useState(null);
  const [img, setImg] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const history = useHistory();

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
    createUser(user, dispatch);
    history.push("/users");
  };

  return (
    <div className="addUser">
      <h1 className="addUser__title">Add a user</h1>

      <form className="addUser__form">
        <div className="addUser__form_item">
          <label>Username</label>
          <input
            type="text"
            placeholder="VD: noname"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="addUser__form_item">
          <label>Email</label>
          <input
            type="email"
            placeholder="VD: a@gmail.com"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="addUser__form_item">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="VD: 123456"
            onChange={handleChange}
          />
        </div>
        <div className="addUser__form_item">
          <label> Admin </label>
          <select
            className="addUser__form_item-select"
            name="isAdmin"
            onChange={handleChange}
          >
            <option>Select one</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="addUser__form_item">
          <label>Avatar</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
      </form>

      <div className="addUser__btn">
        {uploaded === 1 ? (
          <button className="btn" onClick={handleSubmit}>
            Create
          </button>
        ) : (
          <button className="btn" onClick={handleUpload}>
            Upload
          </button>
        )}
      </div>
    </div>
  );
}
