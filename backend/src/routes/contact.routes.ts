import { Router } from "express";
import { ContactController } from "../controllers/contact.controller";
import { authMiddleware } from "../middleware/auth";
import { validate, contactSchema } from "../validators";

const router = Router();

router.post("/", validate(contactSchema), ContactController.create);
router.get("/", authMiddleware, ContactController.getAll);
router.patch("/:id/read", authMiddleware, ContactController.markAsRead);
router.delete("/:id", authMiddleware, ContactController.delete);

export default router;
