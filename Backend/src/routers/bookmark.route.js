import {
  toggle_bookmark,
  get_all_bookmarks,
} from "../controllers/bookmark.controller.js";
import { Router } from "express";
import { verify_jwt } from "../middleware/authentication.middleware.js";

const router = Router();

router.route("/toggle-bookmark/:postId").post(verify_jwt, toggle_bookmark);
router.route("/get-bookmark").get(verify_jwt, get_all_bookmarks);

export default router;
