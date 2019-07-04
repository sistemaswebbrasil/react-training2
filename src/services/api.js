import axios from "axios";
import { getToken, logout } from "./auth";

const api = axios.create({
  baseURL: "https://localhost:5001/api/"
});

api.postOrPut = async (url, id, data, config = {}) => {
  const method = id ? "put" : "post";
  const apiUrl = id ? `${url}/${id}` : url;
  return await api[method](apiUrl, data, config);
};

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    const {
      response: { status }
    } = error;
    status === 403 && logout();
    return Promise.reject(error);
  }
);

export default api;
