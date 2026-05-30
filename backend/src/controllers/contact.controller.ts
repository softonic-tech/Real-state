import { Request, Response } from "express";
import { ContactService } from "../services/contact.service";
import { AuthRequest } from "../types";
import { sendSuccess, sendError } from "../utils/helpers";

export class ContactController {
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const message = await ContactService.create(req.body);
      sendSuccess(res, message, "Meddelandet skickades.", 201);
    } catch (error) {
      sendError(res, (error as Error).message, 500);
    }
  }

  static async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await ContactService.getAll(
        req.query.page as string,
        req.query.limit as string
      );
      sendSuccess(res, result.messages, undefined, 200, result.meta);
    } catch (error) {
      sendError(res, (error as Error).message, 500);
    }
  }

  static async markAsRead(req: AuthRequest, res: Response): Promise<void> {
    try {
      const message = await ContactService.markAsRead(req.params.id);
      sendSuccess(res, message, "Meddelandet markerades som läst.");
    } catch (error) {
      sendError(res, (error as Error).message, 500);
    }
  }

  static async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      await ContactService.delete(req.params.id);
      sendSuccess(res, null, "Meddelandet raderades.");
    } catch (error) {
      sendError(res, (error as Error).message, 500);
    }
  }
}
