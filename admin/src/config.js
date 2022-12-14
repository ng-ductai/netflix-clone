import axios from "axios";

const baseURL = "https://netflix-server.vercel.app/api";
/* const baseURL = "http://localhost:5800/api"; */

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;
