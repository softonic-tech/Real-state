import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { AuthRequest } from "../types";
import { sendSuccess, sendError } from "../utils/helpers";

function isDatabaseError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes("database connection") ||
    message.includes("DNS resolution") ||
    message.includes("PrismaClientInitializationError")
  );
}

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      sendSuccess(res, result, "Inloggningen lyckades.");
    } catch (error) {
      if (isDatabaseError(error)) {
        sendError(
          res,
          process.env.NODE_ENV === "production"
            ? "Databasfel. Försök igen senare."
            : (error as Error).message,
          503
        );
        return;
      }
      sendError(res, (error as Error).message, 401);
    }
  }

  static async profile(req: AuthRequest, res: Response): Promise<void> {
    try {
      const admin = await AuthService.getProfile(req.adminId!);
      sendSuccess(res, admin);
    } catch (error) {
      sendError(res, (error as Error).message, 404);
    }
  }
}
