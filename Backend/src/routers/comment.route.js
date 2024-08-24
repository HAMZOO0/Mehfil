import {
  addComment,
  updateComment,
  deleteComment,
  getPostComments,
} from "../controllers/comment.controller.js";
import { Router } from "express";
import { verify_jwt } from "../middleware/authentication.middleware.js";

const router = Router();

router.route("/get-comment/:postId").get(verify_jwt, getPostComments);

router.route("/add-comment/:postId").post(verify_jwt, addComment);

router.route("/update-comment/:commentId").patch(verify_jwt, updateComment);

router.route("/delete-comment/:commentId").delete(verify_jwt, deleteComment);

export default router;
