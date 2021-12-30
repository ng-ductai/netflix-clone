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
import { Link } from "react-router-dom";
import { useContext } from "react";
import { logout } from "../../context/authContext/AuthActions";
import { AuthContext } from "../../context/authContext/AuthContext";

export default function Sidebar() {
  const { dispatch } = useContext(AuthContext);

  return (
    <div className="sidebar__">
      <div className="sidebar__wrapper">
        <div className="sidebar__wrapper_menu">
          <h3 className="sidebar__wrapper_menu-title">Dashboard</h3>
          <ul className="sidebar__wrapper_menu-list">
            <Link to="/" className="link">
              <li className="list-item">
                <Home className="list-item-icon" />
                Home
              </li>
            </Link>
            <Link to="/lists" className="link">
              <li className="list-item">
                <List className="list-item-icon" />
                Lists
              </li>
            </Link>
            <Link to="/movies" className="link">
              <li className="list-item">
                <PlayCircleOutline className="list-item-icon" />
                Movies
              </li>
            </Link>
            <Link to="/users" className="link">
              <li className="list-item">
                <PermIdentity className="list-item-icon" />
                Users
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebar__wrapper_menu">
          <h3 className="sidebar__wrapper_menu-title">Notifications</h3>
          <ul className="sidebar__wrapper_menu-list">
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
          <h3 className="sidebar__wrapper_menu-title">Staff</h3>
          <ul className="sidebar__wrapper_menu-list">
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
            <li className="list-item" onClick={() => dispatch(logout())}>
              <ArrowRightAlt className="list-item-icon" />
              Log Out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
