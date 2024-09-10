import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../config variables.js";

const api = axios.create({
  baseURL: "https://mehfil-seven.vercel.app/api/v1/",
  withCredentials: true, // Include credentials with requests
});

api.interceptors.request.use(config => {
  // Assuming you store your token in localStorage or a global state
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const loginUser = async (formdata) => {
  try {
    const response = await api.post("/users/login", {
      Email: formdata.Email,
      password: formdata.password,
    });
    toast.success(response.data?.message || "Logged in successfully");
    
    // Save token to localStorage
    localStorage.setItem('token', response.data.token);
    
    return response.data.data.logged_in_user;
  } catch (error) {
    console.error("Error:", error);
    toast.error(error?.response?.data?.error || "Invalid Credentials");
    throw error;
  }
};

export const registerUser = async (formdata) => {
  try {
    const response = await api.post("/users/register", formdata);
    toast.success(formdata?.message);
    return response.data; // Assuming response contains the registered user data
  } catch (error) {
    toast.error(error?.response?.data?.error || "Registration failed");
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.get("/users/logout");
    toast.success(response?.message);
    // Remove token from localStorage
    localStorage.removeItem('token');
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
};

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

// users/refresh-access-token
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

export const get_user = async (id) => {
  try {
    console.log("Fetching data for user ID:", id);
    const response = await api.get(`users/user-profile/${id}`);

    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Failed to fetch user data");
    throw error;
  }
};

export const edit_user = async (formdata) => {
  try {
    const response = await api.post("users/update-account", formdata);
    toast.success(
      response.data?.message || "Your profile has been successfully updated."
    );
    return response.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.error ||
        "Failed to update profile. Please try again later."
    );
    throw error;
  }
};

export const all_users = async () => {
  try {
    const response = await api.get("users/get-all-users");
    console.log("Response", response);

    return response.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.error ||
        "Failed to fetch users. Please try again later."
    );
    throw error;
  }
};
