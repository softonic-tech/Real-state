import { Router } from "express";
import authRoutes from "./auth.routes";
import propertyRoutes from "./property.routes";
import contactRoutes from "./contact.routes";
import proposalRoutes from "./proposal.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/properties", propertyRoutes);
router.use("/contact", contactRoutes);
router.use("/proposals", proposalRoutes);

export default router;
