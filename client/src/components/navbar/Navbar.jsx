import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <Link to="/" className="link">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
            />
          </Link>
          <Link to="/" className="link">
            <span>Home</span>
          </Link>
          <Link to="/series" className="link">
            <span className="navbarmainLinks">Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span className="navbarmainLinks">Movies</span>
          </Link>
          <span className="link">New and Popular</span>
          <span className="link">My List</span>
        </div>
        <div className="right">
          <Search className="icon link" />
          <Notifications className="icon link" />
          <img
            src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/270108946_637680664042262_7525768078757024026_n.jpg?stp=c180.0.1080.1080a_dst-jpg_s851x315&_nc_cat=109&ccb=1-5&_nc_sid=da31f3&_nc_ohc=Nojs0p8-GQ0AX-a0iVU&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT-KCbkQbEUYe9Zp1N4i9EHGuYM786bookUgRFsCCe2t4g&oe=624DD85B"
            alt=""
            className="link"
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options ">
              <span className=" link">Settings</span>
              <Link to="/register" className="link">
                <span onClick={() => dispatch(logout())}>
                  Logout
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
