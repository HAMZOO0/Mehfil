import { API_Error_handler } from "../utils/api_error_handler.js";
import { User } from "../models/user.model.js";

const genrate_access_and_refresh_token = async (user_id) => {
  try {
    const user = await User.findById(user_id);
    if (!user) {
      throw new API_Error_handler(404, "User not found for token genration");
    }

    const refresh_token = user.genrate_refresh_token();
    const access_token = user.genrate_access_token();

    if (!refresh_token || !access_token) {
      throw new API_Error_handler(
        500,
        "Token is missing - Error while genrating Tokens "
      );
    }

    // save in db

    user.refresh_token = refresh_token;
    await user.save({ validateBeforeSave: false });

    return { refresh_token, access_token };
  } catch (error) {
    throw new API_Error_handler(
      500,
      error.message ||
        "Something went wrong while generating refresh or access tokens"
    );
  }
};

export { genrate_access_and_refresh_token };
