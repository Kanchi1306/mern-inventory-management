import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/transactions",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getTransactions = () => API.get("/");
export const createTransaction = (data) => API.post("/", data);
