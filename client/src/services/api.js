import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  return req;
});

export const signup = (formdata) => API.post("/user/signup", formdata);
export const signin = (formdata) => API.post("/user/signin", formdata);
export const getAllUsers = () => API.get("/user/");

export const getTasks = () => API.get("/task/");
export const createTask = (newTask) => API.post("/task/", newTask);
export const updateTask = (id, updateTask) =>
  API.put(`/task/${id}`, updateTask);
export const deleteTask = (id) => API.delete(`/task/${id}`);
