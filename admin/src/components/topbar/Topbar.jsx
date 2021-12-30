import React from "react";
import "./index.scss";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbar__wrapper">
        <div className="topbar__wrapper_left">
          <span className="topbar__wrapper_left-logo">ADMIN</span>
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
          <img src="https://scontent.fdad1-1.fna.fbcdn.net/v/t1.6435-9/55576145_125537851923215_6401309246113185792_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=174925&_nc_ohc=4aVTbOHq5gAAX8ZE5MF&_nc_ht=scontent.fdad1-1.fna&oh=00_AT9eOUlYFFz-Ov24fvKK0mYl_mDG7UZnvMyy8yUrCAxIkw&oe=61EF675A" alt="" className="topbar__wrapper_right-avt" />
        </div>
      </div>
    </div>
  );
}
