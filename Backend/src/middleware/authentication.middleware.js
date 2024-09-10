import { API_Error_handler } from "../utils/api_error_handler.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verify_jwt = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.access_token ||
      req.header("Authorization")?.replace("Bearer ", ""); // here we access the token

    if (!token) {
      throw new API_Error_handler(401, "Un-Authorized Requst");
    }

    //  token expire will check by server . it check currect time and the time which is stored in token while creating
    const decoded_token = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded_token?._id).select(
      "-password -refresh_token"
    );
    if (!user) {
      throw new API_Error_handler(401, "invalid access token");
    }

    req.user = user;

    next();
  } catch (error) {
    throw new API_Error_handler(401, error?.message || "invalid access token");
  }
});

export { verify_jwt };

/*

* req.cookies is an object that contains all cookies sent by the client.
* req.cookies?.access_token retrieves the value of the access_token cookie if it exists.
* Web browsers typically use cookies to store and send tokens automatically with each request.


* Mobile apps, API clients, and other non-browser clients often use the Authorization header to send tokens.
* Using req.header("Authorization") allows these clients to send the token in the HTTP header.
 */
