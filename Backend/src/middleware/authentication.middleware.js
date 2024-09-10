import { API_Error_handler } from "../utils/api_error_handler.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verify_jwt = asyncHandler(async (req, res, next) => {
  try {
    // Access the token from cookies or Authorization header
    const token =
      req.cookies?.access_token ||
      req.header("Authorization")?.replace("Bearer ", "");

    // If no token is found, throw an error
    if (!token) {
      throw new API_Error_handler(401, "Unauthorized Request: No token provided");
    }

    // Verify the token using JWT
    let decoded_token;
    try {
      decoded_token = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new API_Error_handler(401, "Token has expired, please log in again.");
      } else {
        throw new API_Error_handler(401, "Invalid access token.");
      }
    }

    // Find the user by decoded token ID and exclude sensitive fields
    const user = await User.findById(decoded_token?._id).select(
      "-password -refresh_token"
    );
    
    // If the user is not found, throw an error
    if (!user) {
      throw new API_Error_handler(401, "Invalid access token: User not found");
    }

    // Attach the user to the request object for further use
    req.user = user;

    // Call next middleware or route handler
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);  // For debugging
    throw new API_Error_handler(401, error?.message || "Unauthorized access");
  }
});

export { verify_jwt };
