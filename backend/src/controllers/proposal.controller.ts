import { Request, Response } from "express";
import { ProposalService } from "../services/proposal.service";
import { AuthRequest } from "../types";
import { sendSuccess, sendError } from "../utils/helpers";

export class ProposalController {
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const proposal = await ProposalService.create(req.body);
      sendSuccess(res, proposal, "Förfrågan skickades.", 201);
    } catch (error) {
      sendError(res, (error as Error).message, 500);
    }
  }

  static async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await ProposalService.getAll(
        req.query.type as string,
        req.query.page as string,
        req.query.limit as string
      );
      sendSuccess(res, result.proposals, undefined, 200, result.meta);
    } catch (error) {
      sendError(res, (error as Error).message, 500);
    }
  }

  static async markAsRead(req: AuthRequest, res: Response): Promise<void> {
    try {
      const proposal = await ProposalService.markAsRead(req.params.id);
      sendSuccess(res, proposal, "Förfrågan markerades som läst.");
    } catch (error) {
      sendError(res, (error as Error).message, 500);
    }
  }

  static async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      await ProposalService.delete(req.params.id);
      sendSuccess(res, null, "Förfrågan raderades.");
    } catch (error) {
      sendError(res, (error as Error).message, 500);
    }
  }
}
