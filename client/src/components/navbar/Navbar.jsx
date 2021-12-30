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
            src="https://scontent.fdad3-3.fna.fbcdn.net/v/t1.6435-9/55576145_125537851923215_6401309246113185792_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=174925&_nc_ohc=0Zju1z19mMoAX-S_ZvO&_nc_ht=scontent.fdad3-3.fna&oh=00_AT_JO5MVrm1ZFkfq36ZjhMmmPbGgmpPJqgZ6KYB7HjYmPg&oe=61F35BDA"
            alt=""
            className="link"
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options ">
              <span className=" link">Settings</span>
              <span className=" link" onClick={() => dispatch(logout())}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
