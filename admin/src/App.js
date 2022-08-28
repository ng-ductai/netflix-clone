import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Login from "./pages/login";
import { AuthContext } from "./context/authContext/AuthContext";
import { useContext } from "react";
import "./index.scss";
import { route } from "./constants";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        {user ? (
          <>
            <Header />
            <div className="container">
              <div className="container__left">
                <Sidebar />
              </div>

              {route.map((item, index) => (
                <Route key={index} exact path={item.path}>
                  {item.component}
                </Route>
              ))}
            </div>
          </>
        ) :(
          <Redirect to="/login" />
        )}
      </Switch>
    </Router>
  );
}

export default App;
