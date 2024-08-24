import { API_Responce } from "../utils/api_responce.js";
import asyncHandler from "express-async-handler";

const health_check = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new API_Responce(200, null, "server is up and running"));
});

export { health_check };
