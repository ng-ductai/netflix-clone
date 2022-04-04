import axios from "axios";

const token = window.localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: "https://netflix-t.herokuapp.com/api",
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export default axiosInstance;
