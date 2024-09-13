import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../config variables.js";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Include credentials with requests
});

export const addBookmark = async (postId) => {
  try {
    const response = await api.post(`/bookmark/toggle-bookmark/${postId}`);
    toast.success(response.data?.message || "Bookmark added successfully");

    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Failed to add bookmark");
    throw error;
  }
};

export const getAllBookmarks = async () => {
  try {
    const response = await api.get("/bookmark/get-bookmark");

    return response.data;
  } catch (error) {
    throw error;
  }
};
