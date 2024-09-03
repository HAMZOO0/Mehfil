import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../config variables.js";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Include credentials with requests
});

export const getAllPosts = async () => {
  try {
    const response = await api.get("/posts/all-posts");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
