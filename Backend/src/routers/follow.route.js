import {
  toggle_follow,
  get_followers,
  get_following,
} from "../controllers/follow.controller.js";
import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { verify_jwt } from "../middleware/authentication.middleware.js";

const router = Router();

router.route("/follow-toggle/:following_Id").post(verify_jwt, toggle_follow);
router.route("/get-follower/:followingId").get(verify_jwt, get_followers);
router.route("/get-following/:userID").get(verify_jwt, get_following);

export default router;
