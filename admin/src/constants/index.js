import Home from "../pages/home";
import User from "../pages/user";
import NewUser from "../pages/user/addUser";
import EditUser from "../pages/user/updateUser";
import Movie from "../pages/movie";
import NewMovie from "../pages/movie/addMovie";
import EditMovie from "../pages/movie/updateMovie";
import List from "../pages/list";
import NewList from "../pages/list/addList";
import EditList from "../pages/list/updateList";

const genre = [
  {
    value: "action",
    title: "Action",
  },
  {
    value: "adventure",
    title: "Adventure",
  },
  {
    value: "comedy",
    title: "Comedy",
  },
  {
    value: "drama",
    title: "Drama",
  },
  {
    value: "fantasy",
    title: "Fantasy",
  },
  {
    value: "historical",
    title: "Historical",
  },
  {
    value: "horror",
    title: "Horror",
  },
  {
    value: "romance",
    title: "Romance",
  },
  {
    value: "sci-fi",
    title: "Sci-fi",
  },
  {
    value: "thriller",
    title: "Thriller",
  },
];

const type = [
  {
    value: "movies",
    title: "Movies",
  },
  {
    value: "series",
    title: "Series",
  },
];

const route = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/lists",
    component: <List />,
  },
  {
    path: "/list/:listId",
    component: <EditList />,
  },
  {
    path: "/newlist",
    component: <NewList />,
  },

  {
    path: "/movies",
    component: <Movie />,
  },
  {
    path: "/movie/:movieId",
    component: <EditMovie />,
  },
  {
    path: "/newMovie",
    component: <NewMovie />,
  },
  {
    path: "/users",
    component: <User />,
  },
  {
    path: "/users/:userId",
    component: <EditUser />,
  },
  {
    path: "/newUser",
    component: <NewUser />,
  },
];

const convertGenre = (type = 0) => {
  switch (type) {
    case "action":
      return "Action";
    case "adventure":
      return "Adventure";
    case "comedy":
      return "Comedy";
    case "drama":
      return "Drama";
    case "fantasy":
      return "Fantasy";
    case "historical":
      return "Historical";
    case "horror":
      return "Horror";
    case "romance":
      return "Romance";
    case "sci-fi":
      return "Sci-fi";
    case "thriller":
      return "Thriller";
    default:
      return "Khác";
  }
};

const convertSerie = (type = 0) => {
  switch (type) {
    case true:
      return "True";
    case false:
      return "False";
    default:
      return "Khác";
  }
};


const convertType = (type = 0) => {
  switch (type) {
    case "movies":
      return "Movies";
    case "series":
      return "Series";
    default:
      return "Khác";
  }
};

export { genre, type, route, convertGenre, convertSerie , convertType};
