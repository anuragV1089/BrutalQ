import { Request, Response, NextFunction } from "express";
import ExpressError from "../config/errorHandler";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    throw new ExpressError(`Who the hell are you? You are not one of us!`, 200);
  }
  next();
}
