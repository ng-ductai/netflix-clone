import React from "react";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./index.scss";

export default function Header() {
  return (
    <div className="header">
      <div className="header__wrapper">
        <div className="header__wrapper_left">
          <Link to="/" className="link">
            <span className="header__wrapper_left-logo">ADMIN DASHBOARD</span>
          </Link>
        </div>
        <div className="header__wrapper_right">
          <div className="header__wrapper_right-icon">
            <NotificationsNone />
            <span className="iconBadge">3</span>
          </div>
          <div className="header__wrapper_right-icon">
            <Language />
            <span className="iconBadge">6</span>
          </div>
          <div className="header__wrapper_right-icon">
            <Settings />
          </div>
          <div className="header__wrapper_right-name">
            {JSON.parse(localStorage.getItem("user")).username}
          </div>
          <img
            src={JSON.parse(localStorage.getItem("user")).profilePic}
            alt="avt"
            className="header__wrapper_right-avt"
          />
        </div>
      </div>
    </div>
  );
}
