import { API_Error_handler } from "../utils/api_error_handler.js";
import { API_Responce } from "../utils/api_responce.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";

const getPostComments = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  let { page = 1, limit = 10 } = req.query;

  limit = parseInt(limit, 10);
  page = parseInt(page, 10);
  const skip = (page - 1) * limit; // formula to skip previous pages

  const post_find = await Post.findById(postId);

  if (!postId || !post_find) {
    throw new API_Error_handler(404, "Post not found ");
  }

  const comment_list = await Comment.aggregate([
    {
      $match: {
        post: new mongoose.Types.ObjectId(postId),
      },
    },

    {
      $skip: skip,
    },

    {
      $limit: limit,
    },
  ]);

  if (!comment_list) {
    return res
      .status(200)
      .json(new API_Responce(200, null, " 0 Comments found"));
  }

  return res
    .status(200)
    .json(new API_Responce(200, comment_list, "Comments fetched successfully"));
});

const addComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  try {
    var new_comment = await Comment.create({
      content,
      post: postId,
      owner: req.user._id,
    });
  } catch (error) {
    throw new API_Error_handler(
      500,
      error.message || "Comment not added | Internal server error"
    );
  }

  return res
    .status(200)
    .json(new API_Responce(200, new_comment, "Comment added successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  try {
    var updated_comment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );
  } catch (error) {
    throw new API_Error_handler(
      500,
      error.message || "Comment not Updated | Internal server error"
    );
  }

  return res
    .status(200)
    .json(
      new API_Responce(200, updated_comment, "Comment Updated successfully")
    );
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  try {
    var deleted_comment = await Comment.findByIdAndDelete(commentId);
    if (!deleted_comment) {
      throw new API_Error_handler(404, "Comment not found");
    }
  } catch (error) {
    throw new API_Error_handler(
      500,
      error.message || "Comment not Detelted | Internal server error"
    );
  }

  res
    .status(200)
    .json(new API_Responce(200, null, "Comment Deleted successfully !"));
});

export { addComment, updateComment, deleteComment, getPostComments };
