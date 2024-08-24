import { health_check } from "../controllers/healthCheck.controller.js";

import { Router } from "express";

const router = Router();

router.route("/").get(health_check);

export default router;
