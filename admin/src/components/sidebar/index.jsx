import "./index.scss";
import {
  Home,
  Timeline,
  PermIdentity,
  PlayCircleOutline,
  List,
  MailOutline,
  DynamicFeed,
  WorkOutline,
  Report,
  ArrowRightAlt,
} from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { logout } from "../../context/authContext/AuthActions";
import { AuthContext } from "../../context/authContext/AuthContext";

const mainNav = [
  {
    display: "Home",
    path: "/",
    icon: <Home className="list-item-icon" />,
  },
  {
    display: "Playlists",
    path: "/lists",
    icon: <List className="list-item-icon" />,
  },
  {
    display: "Movies",
    path: "/movies",
    icon: <PlayCircleOutline className="list-item-icon" />,
  },
  {
    display: "Users",
    path: "/users",
    icon: <PermIdentity className="list-item-icon" />,
  },
];

export default function Sidebar() {
  const { dispatch } = useContext(AuthContext);
  const { pathname } = useLocation();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);

  return (
    <div className="sidebar">
      <div className="sidebar__menu">
        <ul className="sidebar__menu-list">
          {mainNav.map((item, index) => (
            <div key={index} className={`${index === activeNav ? "active" : ""}`}>
              <Link  to={item.path} className="link">
                <li className="list-item">
                  {item.icon}
                  {item.display}
                </li>
              </Link>
            </div>
          ))}
        </ul>
      </div>
      <div className="sidebar__menu">
        <h3 className="sidebar__menu-title">Notifications</h3>
        <ul className="sidebar__menu-list">
          <li className="list-item">
            <MailOutline className="list-item-icon" />
            E-mail
          </li>
          <li className="list-item">
            <DynamicFeed className="list-item-icon" />
            Feedback
          </li>
        </ul>
      </div>
      <div className="sidebar__menu">
        <h3 className="sidebar__menu-title">Staff</h3>
        <ul className="sidebar__menu-list">
          <li className="list-item">
            <WorkOutline className="list-item-icon" />
            Manage
          </li>
          <li className="list-item">
            <Timeline className="list-item-icon" />
            Analytics
          </li>
          <li className="list-item">
            <Report className="list-item-icon" />
            Reports
          </li>
          <Link to="/login" className="link">
            <li className="list-item" onClick={() => dispatch(logout())}>
              <ArrowRightAlt className="list-item-icon" />
              Log Out
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
