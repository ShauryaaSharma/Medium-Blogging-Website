import axios from "axios";
import { BACKEND_URL } from "../config";

export const api = axios.create({
  baseURL: BACKEND_URL,
});

api.interceptors.request.use((requestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  }
  return requestConfig;
});
