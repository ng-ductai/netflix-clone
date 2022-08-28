import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import axios from "../../config";
import { useEffect, useState } from "react";
import "./index.scss";
import { genre } from "../../constants";

export default function Banner({ type, setGenre }) {
  const [content, setContent] = useState({});

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  return (
    <div className="banner">
      {type && (
        <div className="banner__category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genre</option>
            {genre.map((item, index) => (
              <option key={index} value={item.value}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
      )}
      <img src={content.img} alt="banner" />
      <div className="banner__info">
        <span className="banner__info-title">{content.title}</span>
        <span className="banner__info-desc">{content.desc}</span>
        <div className="banner__info-button">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
