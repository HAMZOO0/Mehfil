import {
  register_user,
  login_user,
  logout_user,
  refresh_Access_token,
  change_password,
  get_current_user,
  update_account_details,
  update_avatar,
  user_profile,
} from "../controllers/user.controller.js";
import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { verify_jwt } from "../middleware/authentication.middleware.js";

const router = Router();

router.route("/register").post(upload.single("avatar"), register_user);
router.route("/login").post(login_user);
router.route("/logout").get(verify_jwt, logout_user);
router.route("/refresh-access-token").get(refresh_Access_token);
router.route("/change-password").post(verify_jwt, change_password);
router.route("/get-currect-user").get(verify_jwt, get_current_user);
router.route("/update-account").post(verify_jwt, update_account_details);
router.route("/user-profile/:user_name").get(verify_jwt, user_profile);
router
  .route("/update-avatar")
  .post(upload.single("avatar"), verify_jwt, update_avatar);

export default router;
