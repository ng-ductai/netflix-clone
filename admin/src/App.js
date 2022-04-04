import "./app.scss";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./pages/login/Login";
import { AuthContext } from "./context/authContext/AuthContext";
import { useContext } from "react";
import List from "./pages/List/List";
import User from "./pages/User/User";
import Movie from "./pages/Movie/Movie";
import NewList from "./pages/new/List/NewList";
import NewMovie from "./pages/new/Movie/NewMovie";
import NewUser from "./pages/new/User/NewUser";
import EditUser from "./pages/update/User/editUser";
import EditList from "./pages/update/List/editList";
import EditMovie from "./pages/update/Movie/editMovie";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        {user && (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <User />
              </Route>
              <Route path="/user/:userId">
                <EditUser />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/movies">
                <Movie />
              </Route>
              <Route path="/movie/:movieId">
                <EditMovie />
              </Route>
              <Route path="/newMovie">
                <NewMovie />
              </Route>
              <Route path="/lists">
                <List />
              </Route>
              <Route path="/list/:listId">
                <EditList />
              </Route>
              <Route path="/newlist">
                <NewList />
              </Route>
            </div>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
