import { Router, Request, Response } from "express";
import { asyncHandler } from "../config/errorHandler";
import userController from "../controller/userController";
import { requireAuth } from "../middleware/authMiddleware";
const router = Router();

router.post("/signup", asyncHandler(userController.signup));

router.post("/login", asyncHandler(userController.login));

router.get("/me", requireAuth, asyncHandler(userController.me));

router.get("/logout", requireAuth, asyncHandler(userController.logout));

export default router;
