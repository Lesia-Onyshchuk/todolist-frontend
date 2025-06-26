import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: "https://todolist-backend-a3cx.onrender.com",
});
