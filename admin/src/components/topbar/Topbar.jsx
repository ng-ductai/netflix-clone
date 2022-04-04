import React from "react";
import "./index.scss";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbar__wrapper">
        <div className="topbar__wrapper_left">
          <Link to="/" className="link">
            <span className="topbar__wrapper_left-logo">ADMIN DASHBOARD</span>
          </Link>
        </div>
        <div className="topbar__wrapper_right">
          <div className="topbar__wrapper_right-icon">
            <NotificationsNone />
            <span className="iconBadge">3</span>
          </div>
          <div className="topbar__wrapper_right-icon">
            <Language />
            <span className="iconBadge">6</span>
          </div>
          <div className="topbar__wrapper_right-icon">
            <Settings />
          </div>
          <img
            src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/270108946_637680664042262_7525768078757024026_n.jpg?stp=c180.0.1080.1080a_dst-jpg_s851x315&_nc_cat=109&ccb=1-5&_nc_sid=da31f3&_nc_ohc=Nojs0p8-GQ0AX-a0iVU&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT-KCbkQbEUYe9Zp1N4i9EHGuYM786bookUgRFsCCe2t4g&oe=624DD85B"
            alt=""
            className="topbar__wrapper_right-avt"
          />
        </div>
      </div>
    </div>
  );
}
