import "./index.scss";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function Featured() {
  return (
    <div className="featured">
      <div className="featured__item">
        <span className="featured__item_title">New films</span>
        <div className="featured__item_container">
          <span className="quantity">45</span>
          <span className="rate">
            -20 <ArrowDownward  className="rate-icon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featured__item">
        <span className="featured__item_title">Views</span>
        <div className="featured__item_container">
          <span className="quantity">250000</span>
          <span className="rate">
            -800 <ArrowDownward className="rate-icon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featured__item">
        <span className="featured__item_title">Users</span>
        <div className="featured__item_container">
          <span className="quantity">7</span>
          <span className="rate">
            +2 <ArrowUpward className="rate-icon"/>
          </span>
        </div>
        <span className="featured__item_compare">Compared to last month</span>
      </div>
    </div>
  );
}
