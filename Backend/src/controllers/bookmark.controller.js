import { API_Error_handler } from "../utils/api_error_handler.js";
import { API_Responce } from "../utils/api_responce.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { Bookmark } from "../models/bookmark.model.js";
import { Post } from "../models/post.model.js";

// get all book marks of user

const toggle_bookmark = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const user = req.user._id;

  const post = await Post.findById(postId);

  if (!post) {
    throw new API_Error_handler(404, "post not found");
  }

  const bookmark = await Bookmark.findOne({
    post: postId,
    owner: user,
  });

  /// if we find bookmark then we need to delete it
  if (bookmark) {
    const deleted_bookMark = await bookmark.deleteOne();
    if (deleted_bookMark.deletedCount === 0) {
      throw new API_Error_handler(
        500,
        "something went wrong while deleting bookmark"
      );
    }

    return res
      .status(200)
      .json(new API_Responce(200, null, "bookmark deleted successfully"));
  }

  // if we not find it

  const new_bookmark = await Bookmark.create({
    post: postId,
    owner: user,
  });
  return res
    .status(200)
    .json(new API_Responce(200, new_bookmark, "bookmark added successfully"));
});

const get_all_bookmarks = asyncHandler(async (req, res) => {
  const user = req.user._id;

  const bookmark_list = await Bookmark.aggregate([
    {
      $match: {
        owner: user,
      },
    },
  ]);

  if (!bookmark_list) {
    return res
      .status(200)
      .json(new API_Responce(2000, null, "No bookmarks found"));
  }

  return res
    .status(200)
    .json(
      new API_Responce(
        2000,
        bookmark_list,
        "bookmarks list fetched successfully"
      )
    );
});

export { toggle_bookmark, get_all_bookmarks };
