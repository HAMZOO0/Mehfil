import {
  register_user,
  login_user,
  logout_user,
} from "../controllers/user.controller.js";
import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { verify_jwt } from "../middleware/authentication.middleware.js";

const router = Router();

router.route("/register").post(upload.single("avatar"), register_user);
router.route("/login").post(login_user);
router.route("/logout").get(verify_jwt, logout_user);

export default router;
