import { Router } from "express";
import { PropertyController } from "../controllers/property.controller";
import { authMiddleware } from "../middleware/auth";
import { upload } from "../middleware/upload";
import { validate, propertySchema } from "../validators";

const router = Router();

// Public routes
router.get("/", PropertyController.getAll);
router.get("/featured", PropertyController.getFeatured);

// Protected routes (before /:slug to avoid route conflicts)
router.get("/admin/stats", authMiddleware, PropertyController.getDashboardStats);
router.get("/by-id/:id", authMiddleware, PropertyController.getById);

router.get("/:slug", PropertyController.getBySlug);
router.post(
  "/",
  authMiddleware,
  validate(propertySchema),
  PropertyController.create
);
router.put("/:id", authMiddleware, PropertyController.update);
router.delete("/:id", authMiddleware, PropertyController.delete);
router.post(
  "/upload",
  authMiddleware,
  upload.array("images", 50),
  PropertyController.uploadImages
);

export default router;
