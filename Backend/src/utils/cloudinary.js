import { v2 as cloudinary } from "cloudinary";
import { API_Error_handler } from "../utils/api_error_handler.js";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

const cloudinary_file_upload = async (url, public_id, resource_type) => {
  try {
    if (!url) {
      throw new API_Error_handler(404, "Url is missing ");
    }

    const file = await cloudinary.uploader.upload(url, {
      public_id: public_id,
      resource_type: resource_type,
    });

    fs.unlinkSync(url);
    return file;
  } catch (error) {
    fs.unlinkSync(url);
    throw new API_Error_handler(400, "Error While uploading avatar file ");
  }
};
