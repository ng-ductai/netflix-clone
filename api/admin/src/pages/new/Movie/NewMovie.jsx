import { useContext, useState } from "react";
import "./index.scss";
import storage from "../../../firebase";
import { MovieContext } from "../../../context/movieContext/MovieContext";
import { createMovie } from "../../../context/movieContext/apiCalls";
import { useHistory } from "react-router-dom";

export default function NewMovie() {
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const history = useHistory()

  const { dispatch } = useContext(MovieContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
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
            setMovie((prev) => {
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
    upload([
      { file: img, label: "img" },
      { file: imgSm, label: "imgSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie, dispatch);
    history.push("/movies")

  };

  return (
    <div className="movie">
      <h1 className="movie__title">New movie</h1>
      <form className="movie__title_form">
        <div className="movie__title_form-item">
          <label>Image</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div className="movie__title_form-item">
          <label>Thumbnail image</label>
          <input
            type="file"
            id="imgSm"
            name="imgSm"
            onChange={(e) => setImgSm(e.target.files[0])}
          />
        </div>
        <div className="movie__title_form-item">
          <label>Title</label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="movie__title_form-item">
          <label>Description</label>
          <input
            type="text"
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="movie__title_form-item">
          <label>Year</label>
          <input
            type="text"
            name="year"
            onChange={handleChange}
          />
        </div>
        <div className="movie__title_form-item">
          <label>Genre</label>
          <input
            type="text"
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="movie__title_form-item">
          <label>Limit</label>
          <input
            type="text"
            name="limit"
            onChange={handleChange}
          />
        </div>
        <div className="movie__title_form-item">
          <label>Is Series?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="movie__title_form-item">
          <label>Trailer</label>
          <input
            type="file"
            name="trailer"
            onChange={(e) => setTrailer(e.target.files[0])}
          />
        </div>
        <div className="movie__title_form-item">
          <label>Video</label>
          <input
            type="file"
            name="video"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
      </form>

      <div className="movie__title_btn">
        {uploaded === 4 ? (
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
