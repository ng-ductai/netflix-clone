import { useContext, useState } from "react";
import { login } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import { Link } from "react-router-dom";
import "./index.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };

  return (
    <div className="login">
      <div className="login__top">
        <img
          className="logo"
          src="https://res.cloudinary.com/ductai2982/image/upload/v1661285637/netflix/Netflix_2015_logo.svg_spqlr9.png"
          alt="avt"
        />
      </div>
      <div className="login__container">
        <form>
          <h2>Welcome to Netflix</h2>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" onClick={handleLogin}>
            Sign In
          </button>
          <span>
            New to Netflix?{" "}
            <Link to="/register" className="link">
              <span className="signup"> Sign up </span> now.
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
