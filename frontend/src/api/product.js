import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/products",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getProducts = () => API.get("/");
export const createProduct = (data) => API.post("/", data);
export const deleteProduct = (id) => API.delete(`/${id}`);
