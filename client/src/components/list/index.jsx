import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import { useRef, useState } from "react";
import ListItem from "./listItem";
import { Fade } from "react-reveal";
import "./index.scss";

export default function List({ list }) {
  const [isMoved, setIsMoved] = useState(false);
  const [clickNumber, setClickNumber] = useState(0);
  const [clickLimit] = useState(window.innerWidth / 250);
  const listRef = useRef();

  const handleClick = (click) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (click === "left" && clickNumber > 0) {
      setClickNumber(clickNumber - 1);
      listRef.current.style.transform = `translateX(${260 + distance}px)`;
    }
    if (click === "right" && clickNumber < list.content.length - clickLimit) {
      setClickNumber(clickNumber + 1);
      listRef.current.style.transform = `translateX(${-260 + distance}px)`;
    }
  };
  return (
    <Fade duration={1300} bottom>
      <div className="list">
        <span className="list__title">{list.title}</span>
        <div className="list__wrapper">
          <ArrowBackIosOutlined
            className="sliderArrow left"
            onClick={() => handleClick("left")}
            style={{ display: (!isMoved || clickNumber === 0) && "none" }}
          />
          <div className="container" ref={listRef}>
            {list.content.map((item, index) => (
              <ListItem key={index} item={item} />
            ))}
          </div>
          <ArrowForwardIosOutlined
            className="sliderArrow right"
            onClick={() => handleClick("right")}
            style={{ display: list.content.length < 6 && "none" }}
          />
        </div>
      </div>
    </Fade>
  );
}
