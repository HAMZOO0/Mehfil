import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../config variables.js";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Include credentials with requests
});

export const addComment = async (comment, postId) => {
  try {
    const response = await api.post(`/comment/add-comment/${postId}`, {
      content: comment,
    });
    toast.success(response.data?.message || "Comment added successfully");
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Failed to add comment");
    throw error;
  }
};

export const getAllComments = async (postId) => {
  try {
    const response = await api.get(`/comment/get-comment/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await api.delete(`/comment/delete-comment/${commentId}`);

    toast.success(response.data?.message || "Comment deleted successfully");
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Failed to delete comment");
    throw error;
  }
};
export const updateComment = async (commentId) => {
  try {
    const response = await api.patch(`comment/update-comment/${commentId}`);

    toast.success(response.data?.message || "Comment updated successfully");
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Failed to update comment");
    throw error;
  }
};
