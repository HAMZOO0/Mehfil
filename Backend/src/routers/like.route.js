import {
  toggle_post_like,
  toggle_comment_like,
  get_liked_posts,
} from "../controllers/like.controller.js";

import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { verify_jwt } from "../middleware/authentication.middleware.js";

const router = Router();

router
  .route("/toggle-comment-like/:comment_Id")
  .post(verify_jwt, toggle_comment_like);

router.route("/toggle-post-like/:postId").post(verify_jwt, toggle_post_like);
router.route("/post-like").get(verify_jwt, get_liked_posts);

export default router;
