import {
  toggle_follow,
  get_followers,
} from "../controllers/follow.controller.js";
import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { verify_jwt } from "../middleware/authentication.middleware.js";

const router = Router();

router.route("/follow-toggle/:following_Id").post(verify_jwt, toggle_follow);
router.route("/get-follower/:followingId").post(verify_jwt, get_followers);

export default router;
