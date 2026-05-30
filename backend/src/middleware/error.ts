import { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/helpers";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error("Error:", err.message);

  if (err.name === "ZodError") {
    sendError(res, "Valideringsfel. Kontrollera dina uppgifter.", 422);
    return;
  }

  if (err.name === "PrismaClientKnownRequestError") {
    sendError(res, "Databasfel. Försök igen.", 500);
    return;
  }

  sendError(
    res,
    process.env.NODE_ENV === "production"
      ? "Ett internt fel uppstod."
      : err.message,
    500
  );
}

export function notFoundHandler(_req: Request, res: Response): void {
  sendError(res, "Resursen hittades inte.", 404);
}
