import axios from "axios";

const baseURL = "https://netflix2982.herokuapp.com/api";
/* const baseURL = "http://localhost:5800/api"; */

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;
