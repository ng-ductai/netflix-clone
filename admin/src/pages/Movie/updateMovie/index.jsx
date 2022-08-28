import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import "./index.scss";
import { MovieContext } from "../../../context/movieContext/MovieContext";
import storage from "../../../firebase";
import { updateMovie } from "../../../context/movieContext/apiCalls";
import { genre } from "../../../constants";
import axiosInstance from "../../../config";

export default function EditMovie() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [img, setImg] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axiosInstance.get("/movies/find/" + movieId, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [movieId]);

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
    updateMovie(movie, dispatch);
    history.goBack();
  };

  return (
    <div className="editMovie">
      <h1 className="editMovie__title">Update a movie</h1>

      <form htmlFor="" className="editMovie__form">
        <div className="main__form">
          <div className="left">
            <div className="editMovie__form-info">
              <label>Title</label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                value={movie.title}
              />

              <div className="editMovie__form-info">
                <label>Description</label>
                <textarea
                  type="text"
                  name="desc"
                  onChange={handleChange}
                  value={movie.desc}
                />
              </div>

              <div className="editMovie__form-info">
                <label>Genre</label>
                <select
                  name="genre"
                  onChange={handleChange}
                  value={movie.genre}
                >
                  {genre.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="editMovie__form-info">
                <label>Year</label>
                <input
                  type="text"
                  name="year"
                  onChange={handleChange}
                  value={movie.year}
                />
              </div>

              <div className="editMovie__form-info">
                <label>Limit</label>
                <input
                  type="text"
                  name="limit"
                  onChange={handleChange}
                  value={movie.limit}
                />
              </div>
            </div>
          </div>

          <div className="right">
            <div className="editMovie__form-info">
              <label>Is Series?</label>
              <select name="isSeries" onChange={handleChange}>
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>

            <div className="editMovie__form-info">
              <label>Image</label>
              <input
                type="file"
                name="img"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>

            <div className="editMovie__form-info">
              <label>Image small</label>
              <input
                type="file"
                name="imgSm"
                onChange={(e) => setImgSm(e.target.files[0])}
              />
            </div>

            <div className="editMovie__form-info">
              <label>Trailer</label>
              <input
                type="file"
                name="trailer"
                onChange={(e) => setTrailer(e.target.files[0])}
              />
            </div>
            <div className="editMovie__form-info">
              <label>Video</label>
              <input
                type="file"
                name="video"
                onChange={(e) => setVideo(e.target.files[0])}
              />
            </div>
          </div>
        </div>

        <div className="editMovie__form-btn">
          {uploaded === 4 ? (
            <button className="btn" onClick={handleSubmit}>
              Update
            </button>
          ) : (
            <button className="btn" onClick={handleUpload}>
              Upload
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
