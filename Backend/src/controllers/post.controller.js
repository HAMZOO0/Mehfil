import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
// import {  } from "../middleware/authentication.middleware.js";
import { API_Error_handler } from "../utils/api_error_handler.js";
import { API_Responce } from "../utils/api_responce.js";
import asyncHandler from "express-async-handler";
import {
  cloudinary_file_upload,
  cloudinary_file_delete,
} from "../utils/cloudinary.js";
import mongoose from "mongoose";

const upload_post = asyncHandler(async (req, res) => {
  //TODO
  /*
   * get data from req.body
   * validate the data  (!empty)
   * check avatart and video files
   * if these are avable then uplaod on cloudniary
   * save it and return res
   */
  const { title, description, is_publish } = req.body;

  if (!title || !description) {
    throw new API_Error_handler(400, "Title and Description is required");
  }

  const post_img_path = req.files?.post_img?.[0]?.path || "";

  const video_path = req.files?.video?.[0]?.path || "";

  if (post_img_path !== "") {
    var post_img = await cloudinary_file_upload(post_img_path);
  }
  if (video_path !== "") {
    var video = await cloudinary_file_upload(video_path);
  }

  const postData = {
    owner: req.user._id,
    title,
    description,
    is_publish,
  };

  if (post_img) {
    postData.post_img = {
      field_id: post_img.public_id,
      url: post_img.url,
    };
  }

  // If video was uploaded, add it to the post data
  if (video) {
    postData.video = {
      field_id: video.public_id,
      url: video.url,
    };
  }
  console.log(postData);

  const post = await Post.create(postData);

  return res
    .status(200)
    .json(new API_Responce(200, post, "post uploaded successfully"));
});

const getAllPosts = asyncHandler(async (req, res) => {
  try {
    let { page = 1, limit = 10, query, sortBy = -1 } = req.query;

    limit = parseInt(limit, 10);
    page = parseInt(page, 10);
    sortBy = parseInt(sortBy, 10);
    const skip = (page - 1) * limit;

    // here we are using aggeration so we create simple array to add differnt pipline
    const pipline = [];

    // if nwe find any query then we add it to pipiline and serach it
    if (query) {
      pipline.push({
        $search: {
          index: "post-search",
          text: {
            query: query,
            path: ["title", "description"],
          },
        },
      });
    }

    pipline.push({
      // 2nd stage : get publish videos
      $match: {
        is_publish: true,
      },
    });

    // we get new posts
    pipline.push({
      $sort: {
        createdAt: sortBy, // Assuming sorting by creation date
      },
    });

    pipline.push({
      $skip: skip,
    });
    pipline.push({
      $limit: limit,
    });

    pipline.push({
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "user",
      },
    });
    pipline.push({
      $project: {
        "user.password": 0, // Exclude the password field
        "user.refresh_token": 0, // Exclude the tokens field
      },
    });

    const posts = await Post.aggregate(pipline);

    return res.status(200).json(
      new API_Responce(
        200,
        {
          Post: posts,
          current_page: page,
        },
        "get all posts"
      )
    );
  } catch (error) {
    throw new API_Error_handler(
      500,
      error.message || "something went wrong",
      error
    );
  }
});

const edit_post = asyncHandler(async (req, res) => {
  let { postId } = req.params;
  postId = new mongoose.Types.ObjectId(postId); // here  we convert into obejctid

  const { title, description, is_publish } = req.body;
  const post_img = req.file.path;
  console.log(post_img);

  if (!postId) {
    throw new API_Error_handler(400, "post id is required");
  }
  if (!title && !description && !is_publish && !avatart) {
    throw new API_Error_handler(400, "nothing to update");
  }

  // here we fetch the post which we wna to edit
  const post = await Post.findById(postId);

  if (!post) {
    throw new API_Error_handler(404, "post not found");
  }

  const postData = {
    title,
    description,
    is_publish,
  };

  // if user add new avatar then we delete old one and upload new one
  if (post_img) {
    const post_img_to_delete = post.post_img?.field_id;
    if (!post_img_to_delete) {
      throw new API_Error_handler(500, "post_img feild id is missing");
    }

    // here we delete old one from cloudinary
    await cloudinary_file_delete(post_img_to_delete);

    // new we upload new one
    const post_img_upload = await cloudinary_file_upload(post_img);
    if (!post_img_upload) {
      throw new API_Error_handler(500, "Error while uploading new post image");
    }

    postData.post_img = {
      field_id: post_img_upload.public_id,
      url: post_img_upload.url,
    };
  }

  // herer we update the post
  const updated_post = await Post.updateOne({ _id: post._id }, postData);

  return res
    .status(200)
    .json(new API_Responce(200, updated_post, "post updated successfullly"));
});

const delete_post = asyncHandler(async (req, res) => {
  let postID = req.params.postId;

  postID = new mongoose.Types.ObjectId(postID);

  if (!postID) {
    throw new API_Error_handler(400, "post id is required");
  }

  const post = await Post.findById(postID);

  if (!postID) {
    throw new API_Error_handler(404, "post not  found");
  }

  // we also need to delete the video or img we have with post
  const video_to_delete = post.video?.field_id;
  const post_img_to_delete = post.post_img?.field_id;

  // if we found post
  if (video_to_delete) {
    await cloudinary_file_delete(video_to_delete);
  }

  if (post_img_to_delete) {
    await cloudinary_file_delete(post_img_to_delete);
  }

  const deleted_post = await Post.deleteOne({ _id: postID });

  if (deleted_post.deletedCount == 0) {
    throw new API_Error_handler(500, "post deletion error");
  }
  return res.status(200).json(new API_Responce(200, null, "post deleted"));
});

export { upload_post, getAllPosts, edit_post, delete_post };
