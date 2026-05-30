import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { AuthRequest } from "../types";
import { sendError } from "../utils/helpers";

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    sendError(res, "Ingen behörighet. Vänligen logga in.", 401);
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { id: string };
    req.adminId = decoded.id;
    next();
  } catch {
    sendError(res, "Ogiltig eller utgången token.", 401);
  }
}
