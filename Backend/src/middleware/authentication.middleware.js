import { API_Error_handler } from "../utils/api_error_handler.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verify_jwt = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.access_token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      console.log("No token found");
      throw new API_Error_handler(401, "Un-Authorized Request");
    }

    const decoded_token = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded Token:", decoded_token);

    const user = await User.findById(decoded_token?._id).select("-password -refresh_token");
    if (!user) {
      console.log("User not found");
      throw new API_Error_handler(401, "Invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    throw new API_Error_handler(401, error?.message || "Invalid access token");
  }
});


/*

* req.cookies is an object that contains all cookies sent by the client.
* req.cookies?.access_token retrieves the value of the access_token cookie if it exists.
* Web browsers typically use cookies to store and send tokens automatically with each request.


* Mobile apps, API clients, and other non-browser clients often use the Authorization header to send tokens.
* Using req.header("Authorization") allows these clients to send the token in the HTTP header.
 */
