import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../config variables.js";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Include credentials with requests
});

export const toggleFollow = async (id) => {
  try {
    const response = await api.post(`follow/follow-toggle/${id}`);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    toast.error(error?.response?.data?.error || "Failed to follow user");
  }
};
