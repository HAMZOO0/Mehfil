const verify_jwt = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.access_token ||
      req.header("Authorization")?.replace("Bearer ", "");

    // Log the extracted token
    console.log("Extracted Token:", token);

    if (!token) {
      throw new API_Error_handler(401, "Un-Authorized Request");
    }

    const decoded_token = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded_token?._id).select(
      "-password -refresh_token"
    );
    if (!user) {
      throw new API_Error_handler(401, "Invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    throw new API_Error_handler(401, error?.message || "Invalid access token");
  }
});
