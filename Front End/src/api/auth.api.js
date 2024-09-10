import axios from "axios";
import toast from "react-hot-toast";

// You can remove the import if `variables.js` is not used in this file
// import { BASE_URL } from "../../config/variables.js";

// Create Axios instance with base URL
const api = axios.create({
  baseURL: "https://mehfil-bt88.vercel.app/api/v1/", // Make sure this URL is correct
  withCredentials: true, // Include credentials with requests
});

// Attach token to requests using an Axios interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Make sure the token is stored under 'token'
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Login user
export const loginUser = async (formdata) => {
  try {
    const response = await api.post("/users/login", {
      Email: formdata.Email,
      password: formdata.password,
    });
    toast.success(response.data?.message || "Logged in successfully");
    return response.data.data.logged_in_user;
  } catch (error) {
    console.error("Error:", error);
    toast.error(error?.response?.data?.error || "Invalid Credentials");
    throw error;
  }
};

// Register user
export const registerUser = async (formdata) => {
  try {
    const response = await api.post("/users/register", formdata);
    toast.success(response.data?.message || "Registration successful");
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Registration failed");
    throw error;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const response = await api.get("/users/logout");
    toast.success(response.data?.message || "Logged out successfully");
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Logout failed");
    throw error;
  }
};

// Change password
export const changePassword = async (formdata) => {
  try {
    const response = await api.post("/users/change-password", formdata);
    toast.success(response.data?.message || "Password changed successfully");
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Failed to change password");
    throw error;
  }
};

// Refresh access token
export const refreshAccessToken = async () => {
  try {
    const response = await api.get("/users/refresh-access-token");
    toast.success(response.data?.message || "Token refreshed successfully");
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Failed to refresh token");
    throw error;
  }
};

// Get user by ID
export const get_user = async (id) => {
  try {
    console.log("Fetching data for user ID:", id);
    const response = await api.get(`/users/user-profile/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Failed to fetch user data");
    throw error;
  }
};

// Edit user profile
export const edit_user = async (formdata) => {
  try {
    const response = await api.post("/users/update-account", formdata);
    toast.success(response.data?.message || "Profile updated successfully");
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Failed to update profile");
    throw error;
  }
};

// Get all users
export const all_users = async () => {
  try {
    const response = await api.get("/users/get-all-users");
    console.log("Response", response);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Failed to fetch users");
    throw error;
  }
};
