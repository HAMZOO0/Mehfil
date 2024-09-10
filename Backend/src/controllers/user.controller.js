import { User } from "../models/user.model.js";
import cookie from "cookie-parser";
import { API_Error_handler } from "../utils/api_error_handler.js";
import { API_Responce } from "../utils/api_responce.js";
import asyncHandler from "express-async-handler";
import {
  cloudinary_file_upload,
  cloudinary_file_delete,
} from "../utils/cloudinary.js";
import { genrate_access_and_refresh_token } from "../utils/genrate_token.js";
import mongoose from "mongoose";

const register_user = asyncHandler(async (req, res) => {
  const {
    user_name,
    Full_name,
    Email,
    password,
    bio = "No bio",
    links = "No link",
  } = req.body;
  const avatar = req.file?.path;

  if (!user_name || !Full_name || !Email || !password || !avatar) {
    throw new API_Error_handler(400, "All fields are required");
  }

  const user_check = await User.findOne({ user_name, Email });
  if (user_check) {
    throw new API_Error_handler(409, "User already exists. Change Name or Email");
  }

  const cloudinary_avatar = await cloudinary_file_upload(avatar);
  if (!cloudinary_avatar) {
    throw new API_Error_handler(400, "Error uploading avatar");
  }

  const user = await User.create({
    user_name,
    Full_name,
    Email,
    password,
    bio,
    links,
    avatar: {
      field_id: cloudinary_avatar.public_id,
      url: cloudinary_avatar.url,
    },
  });

  const created_user = await User.findById(user._id).select("-password -refresh_token");
  if (!created_user) {
    throw new API_Error_handler(500, "Error creating user object");
  }

  return res.status(200).json(new API_Responce(200, created_user, "User registered successfully"));
});

const login_user = asyncHandler(async (req, res) => {
  const { Email, password } = req.body;
  if (!Email || !password) {
    throw new API_Error_handler(400, "Email and Password are required");
  }

  const user = await User.findOne({ Email });
  if (!user) {
    throw new API_Error_handler(404, "Invalid Email - User not found");
  }

  const password_check = await user.is_password_currect(password);
  if (!password_check) {
    throw new API_Error_handler(401, "Incorrect password");
  }

  const { refresh_token, access_token } = await genrate_access_and_refresh_token(user._id);
  const logged_in_user = await User.findById(user._id).select("-password -refresh_token");

  const options = {
    path: "/",
    sameSite: "None",
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("access_token", access_token, options)
    .cookie("refresh_token", refresh_token, options)
    .json(new API_Responce(200, { logged_in_user }, "User logged in successfully"));
});

const logout_user = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    { $unset: { refresh_token: "" } },
    { new: true }
  );

  return res
    .status(200)
    .clearCookie("access_token")
    .clearCookie("refresh_token")
    .json(new API_Responce(200, null, "User logged out successfully"));
});

const refresh_Access_token = asyncHandler(async (req, res) => {
  const token =
    req.cookies?.refresh_token ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new API_Error_handler(400, "No refresh token provided");
  }

  const user = await User.findOne({ refresh_token: token });
  if (!user) {
    throw new API_Error_handler(404, "User not found");
  }

  const { refresh_token: new_refresh_token, access_token } =
    await genrate_access_and_refresh_token(user._id);

  const options = {
    path: "/",
    sameSite: "None",
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("access_token", access_token, options)
    .cookie("refresh_token", new_refresh_token, options)
    .json(new API_Responce(200, { access_token, refresh_token: new_refresh_token }, "Tokens refreshed successfully"));
});

const change_password = asyncHandler(async (req, res) => {
  const { oldpassword, password } = req.body;
  if (!password || !oldpassword) {
    throw new API_Error_handler(400, "Both old and new passwords are required");
  }

  const user = await User.findById(req.user?._id);
  if (!user || !(await user.is_password_currect(oldpassword))) {
    throw new API_Error_handler(400, "Old password is incorrect");
  }

  user.password = password;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json(new API_Responce(200, {}, "Password changed successfully"));
});

const get_current_user = asyncHandler(async (req, res) => {
  return res.status(200).json(new API_Responce(200, req.user, "Current user fetched successfully"));
});

const update_account_details = asyncHandler(async (req, res) => {
  const { user_name, Email, links, bio } = req.body;
  if (!user_name && !Email && !links && !bio) {
    throw new API_Error_handler(400, "Nothing to update");
  }

  const user = await User.findById(req.user?._id).select("-password -refresh_token");

  if (user_name) user.user_name = user_name;
  if (Email) user.Email = Email;
  if (links) user.links = links;
  if (bio) user.bio = bio;

  await user.save({ validateBeforeSave: false });

  return res.status(200).json(new API_Responce(200, user, "Account details updated successfully"));
});

const update_avatar = asyncHandler(async (req, res) => {
  const avatar = req.file?.path;
  if (!avatar) {
    throw new API_Error_handler(400, "Avatar is missing");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new API_Error_handler(404, "User not found");
  }

  const avatar_to_delete = user.avatar?.field_id;
  if (avatar_to_delete) {
    await cloudinary_file_delete(avatar_to_delete);
  }

  const new_avatar = await cloudinary_file_upload(avatar);
  if (!new_avatar) {
    throw new API_Error_handler(500, "Error uploading new avatar");
  }

  user.avatar = {
    field_id: new_avatar.public_id,
    url: new_avatar.url,
  };
  await user.save({ validateBeforeSave: false });

  return res.status(200).json(new API_Responce(200, user, "Avatar updated"));
});

const user_profile = asyncHandler(async (req, res) => {
  const { user_name } = req.params;
  const id = new mongoose.Types.ObjectId(user_name);

  const userData = await User.findById(id);
  if (!userData) {
    throw new API_Error_handler(404, "User not found");
  }

  return res.status(200).json(new API_Responce(200, userData, "User profile fetched"));
});

export {
  register_user,
  login_user,
  logout_user,
  refresh_Access_token,
  change_password,
  get_current_user,
  update_account_details,
  update_avatar,
  user_profile,
};
