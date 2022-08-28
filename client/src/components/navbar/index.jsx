import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useContext, useState } from "react";
import "./index.scss";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";
import { mainNav } from "../../constants";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const { pathname } = useLocation();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="container__left">
          <Link to="/" className="link">
            <img
              src="https://res.cloudinary.com/ductai2982/image/upload/v1661285637/netflix/Netflix_2015_logo.svg_spqlr9.png"
              alt="avt"
            />
          </Link>
          {mainNav.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`link ${index === activeNav ? "active" : ""} `}
            >
              <span className={item.className}>{item.title}</span>
            </Link>
          ))}
        </div>

        <div className="container__right">
          <Search className="icon link" />
          <Notifications className="icon link" />
          <img
            src="https://res.cloudinary.com/ductai2982/image/upload/v1661289138/netflix/t%E1%BA%A3i_xu%E1%BB%91ng_imiib2.jpg"
            alt="avt"
            className="link"
          />
          <div className="profile">
            <ArrowDropDown className="icon1" />
            <div className="options">
              <span className="link">Settings</span>
              <Link to="/register" className="link">
                <span onClick={() => dispatch(logout())}>Logout</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
