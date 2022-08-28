import Navbar from "../../components/navbar";
import Banner from "../../components/banner";
import "./index.scss";
import List from "../../components/list";
import { useEffect, useState } from "react";
import axios from "../../config";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Banner type={type} setGenre={setGenre} />
      {lists.map((list, index) => (
        <List list={list} key={index} />
      ))}
    </div>
  );
};

export default Home;
