import { API_Error_handler } from "../utils/api_error_handler.js";
import { API_Responce } from "../utils/api_responce.js";
import asyncHandler from "express-async-handler";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";
import { Like } from "../models/like.model.js";
import mongoose from "mongoose";

// post like toggle
// comment like toggle
// get all like of post

const toggle_post_like = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const user = req.user._id;

  const post_id = new mongoose.Types.ObjectId(postId);

  const post = await Post.findById(post_id);

  if (!post) {
    throw new API_Error_handler(404, "This post is not exist ");
  }
  const post_to_like = await Like.findOne({
    post: post_id,
    liked_by: user,
  });

  if (post_to_like) {
    await Like.deleteOne(post_to_like);
    return res
      .status(200)
      .json(new API_Responce(200, null, "Post Disliked ! "));
  }

  const post_like = await Like.create({
    post: post_id,
    liked_by: user,
  });

  return res
    .status(200)
    .json(new API_Responce(200, post_like, "Post Likes ! "));
});

const toggle_comment_like = asyncHandler(async (req, res) => {
  const { comment_Id } = req.params;
  const user = req.user._id;

  const commentId = new mongoose.Types.ObjectId(comment_Id);

  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new API_Error_handler(404, "This comment is not exist ");
  }
  const comment_to_like = await Like.findOne({
    comment: commentId,
    liked_by: user,
  });

  if (comment_to_like) {
    await Like.deleteOne(comment_to_like);
    return res
      .status(200)
      .json(new API_Responce(200, null, "Comment Disliked ! "));
  }

  const liked_coment = await Like.create({
    comment: commentId,
    liked_by: user,
  });
  return res
    .status(200)
    .json(new API_Responce(200, liked_coment, "comment Likes ! "));
});

const get_liked_posts = asyncHandler(async (req, res) => {
  const user = req.user._id;

  const like_posts = await Like.aggregate([
    {
      $match: {
        liked_by: user,
        post: { $exists: true, $ne: null },
      },
    },

    {
      $lookup: {
        from: "posts",
        localField: "post",
        foreignField: "_id",
        as: "post",
      },
    },

    {
      $unwind: "$post", // array into obj
    },
  ]);

  return res
    .status(200)
    .json(new API_Responce(200, like_posts, "post likes data fetched"));
});

const get_all_likes = asyncHandler(async (req, res) => {
  const { postid } = req.params;
  const id = new mongoose.Types.ObjectId(postid);

  try {
    const totalLikes = await Like.aggregate([
      {
        $match: { post: id },
      },
      {
        $count: "totalLikes", // This will create a field "totalLikes" with the count
      },
    ]);

    res
      .status(200)
      .json(
        new API_Responce(200, totalLikes, " Total Likes Fetch successfully")
      );
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch like count" });
  }
});

export {
  toggle_post_like,
  toggle_comment_like,
  get_liked_posts,
  get_all_likes,
};
