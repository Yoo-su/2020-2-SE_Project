import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://every-server.herokuapp.com/api"
});

export default apiClient;