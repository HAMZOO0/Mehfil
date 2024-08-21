import { API_Error_handler } from "../utils/api_error_handler.js";
import { API_Responce } from "../utils/api_responce.js";
import asyncHandler from "express-async-handler";
import { User } from "../models/user.model.js";
import { Follow } from "../models/follow.model.js";
import mongoose from "mongoose";

const toggle_follow = asyncHandler(async (req, res) => {
  const { following_Id } = req.params;
  const followingId = new mongoose.Types.ObjectId(following_Id);
  const user = req.user._id;

  if (!followingId || !user) {
    throw new API_Error_handler(404, " user and following id required");
  }

  if (user._id.equals(followingId)) {
    throw new API_Error_handler(400, "self following is not allowed");
  }
  // here we search the follower nad following to check that if we followed are not
  const follow = await Follow.findOne({
    follower: user,
    following: followingId,
  });

  // if we not found ..
  if (!follow) {
    const new_follow = await Follow.create({
      follower: user,
      following: followingId,
    });

    if (!new_follow) {
      throw new API_Error_handler(500, " Error while following process");
    }

    return res
      .status(200)
      .json(new API_Responce(200, new_follow, "You Follow successfully"));
  }
  // if we find
  const delete_follow = await follow.deleteOne();

  if (delete_follow.deletedCount === 0) {
    throw new API_Error_handler(500, " Error while following process");
  }
  return res
    .status(200)
    .json(new API_Responce(200, delete_follow, "You UnFollowed successfully"));
});

// const get_user_followers = asyncHandler(async(req,res)=>{ })

// here we get the user profile followers
const get_followers = asyncHandler(async (req, res) => {
  const { followingId } = req.params;

  const following_Id = new mongoose.Types.ObjectId(followingId);

  if (!following_Id) {
    throw new API_Error_handler(404, "following id not found");
  }

  const follower_list = await Follow.aggregate([
    {
      $match: {
        following: following_Id,
      },
    },

    {
      $group: {
        _id: null,
        total_follwers: { $sum: 1 }, // Count the number of followers
        followers: { $push: "$follower" }, // Project the followers
      },
    },
    {
      $project: {
        _id: 0, // Exclude the _id field from the result

        total_follwers: 1,
        followers: 1,
      },
    },
  ]);
  if (follower_list.length === 0) {
    return res
      .status(200)
      .json(new API_Responce(200, [], "No followers found"));
  }
  return res
    .status(200)
    .json(
      new API_Responce(200, follower_list, "Follwer Data fetch Successfully")
    );
});

// here we get the user follwoing list
const get_following = asyncHandler(async (req, res) => {
  const { userID } = req.params;
  const user_id = new mongoose.Types.ObjectId(userID);

  const following_list = await Follow.aggregate([
    {
      $match: {
        follower: user_id,
      },
    },
    {
      $group: {
        _id: null, // This is required for the group stage, but we're not grouping by any specific field

        total_following: { $sum: 1 },
        following: { $push: "$following" },
      },
    },
    {
      $project: {
        total_following: 1,
        following: 1,
      },
    },
  ]);

  if (following_list.length === 0) {
    return res
      .status(200)
      .json(new API_Responce(200, [], "No Following found"));
  }
  return res
    .status(200)
    .json(
      new API_Responce(
        200,
        following_list,
        " Following list fetched successfully"
      )
    );
});

export { toggle_follow, get_followers, get_following };
