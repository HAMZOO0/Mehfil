import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1", // Backend URL
  withCredentials: true,
});

export const registerUser = (data) => api.post("/users/register", data);
export const loginUser = (data) => api.post("/users/login", data);
export const getCurrentUser = () => api.get("=/user/current");
export const updateAvatar = (formData) =>
  api.post("/user/update-avatar", formData);
export const updateAccountDetails = (data) =>
  api.put("/user/update-account", data);
export const getUserProfile = (username) =>
  api.get(`/user/profile/${username}`);
export const logoutUser = () => api.post("/user/logout");
