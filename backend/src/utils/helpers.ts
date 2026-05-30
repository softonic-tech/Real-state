import { Response } from "express";
import { ApiResponse, PaginationMeta } from "../types";

export function sendSuccess<T>(
  res: Response,
  data: T,
  message?: string,
  statusCode = 200,
  meta?: PaginationMeta
): void {
  const response: ApiResponse<T> = { success: true, data, message, meta };
  res.status(statusCode).json(response);
}

export function sendError(
  res: Response,
  error: string,
  statusCode = 400
): void {
  const response: ApiResponse = { success: false, error };
  res.status(statusCode).json(response);
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[åä]/g, "a")
    .replace(/[ö]/g, "o")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function parsePagination(page?: string, limit?: string) {
  const parsedPage = Math.max(1, parseInt(page || "1", 10));
  const parsedLimit = Math.min(50, Math.max(1, parseInt(limit || "12", 10)));
  const skip = (parsedPage - 1) * parsedLimit;
  return { page: parsedPage, limit: parsedLimit, skip };
}
