import { Router } from "express";
import { asyncHandler } from "../config/errorHandler";
import replyController from "../controller/replyController";
import { requireAuth } from "../middleware/authMiddleware";

const router = Router();

router.get("/:id", requireAuth, asyncHandler(replyController.getReplies));

router.post("/:id", requireAuth, asyncHandler(replyController.addReply));

export default router;
