import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../config variables.js";

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Include credentials with requests if needed
});

// Interceptor to attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Get the stored token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors and token refresh
api.interceptors.response.use(
  (response) => {
    return response; // Return the response if successful
  },
  async (error) => {
    const originalRequest = error.config;

    // If we get a 401 error, attempt to refresh the token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call the refresh token API
        const response = await refreshAccessToken();
        const newToken = response.token;

        // Save the new token in localStorage
        localStorage.setItem("authToken", newToken);

        // Update the original request with the new token
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        throw refreshError;
      }
    }

    return Promise.reject(error); // Return any other errors
  }
);

// Login User
export const loginUser = async (formdata) => {
  try {
    const response = await api.post("/users/login", {
      Email: formdata.Email,
      password: formdata.password,
    });

    const token = response.data?.token;

    // Store the token in localStorage or cookies
    if (token) {
      localStorage.setItem("authToken", token);
    }

    toast.success(response.data?.message || "Logged in successfully");

    return response.data.data.logged_in_user;
  } catch (error) {
    console.error("Error:", error);
    toast.error(error?.response?.data?.error || "Invalid Credentials");
    throw error;
  }
};

// Register User
export const registerUser = async (formdata) => {
  try {
    const response = await api.post("/users/register", formdata);
    toast.success(response.data?.message || "Registered successfully");
    return response.data; // Return registered user data
  } catch (error) {
    toast.error(error?.response?.data?.error || "Registration failed");
    throw error;
  }
};

// Logout User
export const logoutUser = async () => {
  try {
    const response = await api.get("/users/logout");
    toast.success(response?.message || "Logged out successfully");
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Logout failed");
    throw error;
  }
};

// Change Password
export const changePassword = async (password, oldpassword) => {
  try {
    const response = await api.post("/users/change-password", {
      password,
      oldpassword,
    });
    toast.success(response.data?.message || "Password changed successfully");
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Failed to change password");
    throw error;
  }
};

// Refresh Access Token
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

// Get User Profile by ID
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

// Edit User Profile
export const edit_user = async (formdata) => {
  try {
    const response = await api.post("/users/update-account", formdata);
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

// Get All Users
export const all_users = async () => {
  try {
    const response = await api.get(`/users/get-all-users`);
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
