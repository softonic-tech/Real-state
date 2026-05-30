import { Router } from "express";
import { ProposalController } from "../controllers/proposal.controller";
import { authMiddleware } from "../middleware/auth";
import { validate, proposalSchema } from "../validators";

const router = Router();

router.post("/", validate(proposalSchema), ProposalController.create);
router.get("/", authMiddleware, ProposalController.getAll);
router.patch("/:id/read", authMiddleware, ProposalController.markAsRead);
router.delete("/:id", authMiddleware, ProposalController.delete);

export default router;
