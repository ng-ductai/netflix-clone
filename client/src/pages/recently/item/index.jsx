import "./index.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Item({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/watch/${item._id}`}>
      <div
        className="item"        
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={item.imgSm} alt="movie" className="img"/>
        {isHovered && (
          <>
            <video src={item.trailer} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="content">
                <span>{item.duration}</span>
                <span className="limit">+{item.limit}</span>
                <span>{item.year}</span>
              </div>
              <div className="desc">{item.desc}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
