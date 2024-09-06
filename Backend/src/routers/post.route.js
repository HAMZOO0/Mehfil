import {
  upload_post,
  getAllPosts,
  edit_post,
  delete_post,
  userPosts,
} from "../controllers/post.controller.js";
import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { verify_jwt } from "../middleware/authentication.middleware.js";

const router = Router();

router.route("/upload-post").post(
  verify_jwt,
  upload.fields([
    { name: "post_img", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  upload_post
);

router.route("/all-posts").get(verify_jwt, upload.none(), getAllPosts);
router
  .route("/edit-post/:postId")
  .patch(verify_jwt, upload.single("post_img"), edit_post);

router.route("/delete-post/:postId").delete(verify_jwt, delete_post);

router.route("/user-posts/:userId").get(verify_jwt, userPosts);

export default router;
