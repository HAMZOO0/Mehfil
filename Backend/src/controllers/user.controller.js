import User from "../models/user.model.js";
// import {  } from "../middleware/authentication.middleware.js";
import upload from "../middleware/multer.middleware.js";
import { API_Error_handler } from "../utils/api_error_handler.js";
import { API_Responce } from "../utils/api_responce.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

const register = asyncHandler(async (req, res) => {
  //TODO
  /*
   * get data from req.body
   * validate the data  (!empty)
   * check is this already exist
   * get avatar from req.file and validate
   * uplaod avatar on cloudinary
   * create user in db and upload all data
   * remove password and toekn form responce
   */
  const { user_name, Full_name, Email, password } = req.body;
  const { avatar } = req.file;
  //   const avatar_local_path = req.files?.avatar?.[0]?.path;

  if (!user_name || !Full_name || !Email || !password || !avatar) {
    throw new API_Error_handler(400, "All feilds are required ");
  }

  const user_check = await User.find({ user_name, Email });
  if (!user_check) {
    throw new API_Error_handler(409, "User already exist change Name or Email");
  }
  const cloudinary_avatar = await cloudinary_file_upload(avatar);
  if (!cloudinary_avatar) {
    throw new API_Error_handler(400, "Avatar File is required ");
  }
  const user = User.create({
    user_name,
    Full_name,
    Email,
    password,
    avatar: cloudinary_avatar,
  });

  const created_user = await User.findById(user._id).select(
    "-password -refresh_token "
  );

  if (!created_user) {
    throw new API_Error_handler(
      500,
      "Something is went wrong while creating user obejct "
    );
  }
  return res
    .status(200)
    .json(new API_Responce(200, created_user, "User registered Successfully"));
});
