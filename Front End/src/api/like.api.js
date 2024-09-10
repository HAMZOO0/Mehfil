import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../config variables.js";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Include credentials with requests
});

export const toggle_like = async (postid) => {
  try {
    const response = await api.post(`likes/toggle-post-like/${postid}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const all_likes = async (postid) => {
  try {
    const response = await api.get(`likes/all-likes/${postid}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
