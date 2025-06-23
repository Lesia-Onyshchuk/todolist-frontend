import axios from "axios";

export const api = axios.create({
  baseURL: "https://todolist-backend-a3cx.onrender.com",
});
