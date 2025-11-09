import { Router } from "express";
import postController from "../controller/postController";
import { asyncHandler } from "../config/errorHandler";
import { requireAuth } from "../middleware/authMiddleware";
const router = Router();

router.get("/", asyncHandler(postController.getPost));

router.post("/", requireAuth, asyncHandler(postController.createPost));

router.get("/:id", requireAuth, asyncHandler(postController.getSinglePost));

router.post(
  "/:id/upvote",
  requireAuth,
  asyncHandler(postController.upvotePost)
);

export default router;
