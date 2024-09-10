import { API_Error_handler } from "../utils/api_error_handler.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verify_jwt = asyncHandler(async (req, res, next) => {
  try {
    // Try to get the token from cookies or Authorization header
    const token =
      req.cookies?.access_token ||
      req.header("Authorization")?.replace("Bearer ", "");

    // Log the retrieved token
    console.log("Retrieved Token:", token);

    // Check if token is not present
    if (!token) {
      console.log("No token found");
      throw new API_Error_handler(401, "Un-Authorized Request");
    }

    // Verify token
    const decoded_token = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded Token:", decoded_token);

    // Find user by ID from the token
    const user = await User.findById(decoded_token?._id).select("-password -refresh_token");
    if (!user) {
      console.log("User not found");
      throw new API_Error_handler(401, "Invalid access token");
    }

    // Attach user to the request object
    req.user = user;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    throw new API_Error_handler(401, error?.message || "Invalid access token");
  }
});

export { verify_jwt };
