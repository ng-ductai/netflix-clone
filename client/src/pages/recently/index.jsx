import { useEffect, useState } from "react";
import Item from "./item";
import "./index.scss";
import axiosInstance from "../../config";
import Banner from "../../components/banner";
import Navbar from "../../components/navbar";

export default function Recently() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axiosInstance.get("/movies/recently", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovies(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, []);

  return (
    <div className="home">
      <Navbar />
      <Banner />

      <div className="recently">
        <div className="recently__wrapper">
          <div className="main">
            {movies.map((item, index) => (
              <Item key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
