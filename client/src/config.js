import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://netflix-server.vercel.app/api",
});

export default axiosInstance;
