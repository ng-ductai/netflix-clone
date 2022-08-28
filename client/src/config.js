import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://netflix2982.herokuapp.com/api",
});

export default axiosInstance;
