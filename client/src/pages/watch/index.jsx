import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowBackOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./index.scss";
import axiosInstance from "../../config";

export default function Watch() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

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

  return (
    <div className="watch">
      <Link to="/">
        <div className="watch__back">
          <ArrowBackOutlined className="icon" />
          Back
        </div>
      </Link>
      <video className="watch__video" autoPlay controls src={movie.video} />
    </div>
  );
}
