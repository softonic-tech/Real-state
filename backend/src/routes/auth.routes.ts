import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth";
import { validate, loginSchema } from "../validators";

const router = Router();

router.post("/login", validate(loginSchema), AuthController.login);
router.get("/profile", authMiddleware, AuthController.profile);

export default router;
