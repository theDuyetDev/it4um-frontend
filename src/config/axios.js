import axios from "axios";
import store from "../redux/store";

const getToken = () => {
  const { token } = store.getState().user;
  return token;
};

const getAdminToken = () => {
  const adminToken = store.getState().admin.token;
  return adminToken;
};

const api = axios.create({
  baseURL: "https://it4um-server.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      const adminToken = getAdminToken();
      if (adminToken) {
        config.headers.Authorization = `Bearer ${adminToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
