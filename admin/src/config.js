import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://netflix-t.herokuapp.com/api",
});

export default axiosInstance;
