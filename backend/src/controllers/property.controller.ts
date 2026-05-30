import { Request, Response } from "express";
import { PropertyService } from "../services/property.service";
import { AuthRequest, PropertyFilters } from "../types";
import { sendSuccess, sendError } from "../utils/helpers";

export class PropertyController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const filters: PropertyFilters = {
        search: req.query.search as string,
        city: req.query.city as string,
        county: req.query.county as string,
        propertyType: req.query.propertyType as string,
        status: req.query.status as string,
        minPrice: req.query.minPrice as string,
        maxPrice: req.query.maxPrice as string,
        featured: req.query.featured as string,
      };

      const result = await PropertyService.getAll(
        filters,
        req.query.page as string,
        req.query.limit as string
      );

      sendSuccess(res, result.properties, undefined, 200, result.meta);
    } catch (error) {
      sendError(res, (error as Error).message, 500);
    }
  }

  static async getBySlug(req: Request, res: Response): Promise<void> {
    try {
      const property = await PropertyService.getBySlug(req.params.slug);
      sendSuccess(res, property);
    } catch (error) {
      sendError(res, (error as Error).message, 404);
    }
  }

  static async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const property = await PropertyService.getById(req.params.id);
      sendSuccess(res, property);
    } catch (error) {
      sendError(res, (error as Error).message, 404);
    }
  }

  static async getFeatured(_req: Request, res: Response): Promise<void> {
    try {
      const properties = await PropertyService.getFeatured();
      sendSuccess(res, properties);
    } catch (error) {
      sendError(res, (error as Error).message, 500);
    }
  }

  static async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const property = await PropertyService.create(req.body);
      sendSuccess(res, property, "Fastigheten skapades.", 201);
    } catch (error) {
      sendError(res, (error as Error).message, 500);
    }
  }

  static async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const property = await PropertyService.update(req.params.id, req.body);
      sendSuccess(res, property, "Fastigheten uppdaterades.");
    } catch (error) {
      sendError(res, (error as Error).message, 500);
    }
  }

  static async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      await PropertyService.delete(req.params.id);
      sendSuccess(res, null, "Fastigheten raderades.");
    } catch (error) {
      sendError(res, (error as Error).message, 500);
    }
  }

  static async uploadImages(req: AuthRequest, res: Response): Promise<void> {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files?.length) {
        sendError(res, "Inga bilder uppladdade.", 400);
        return;
      }
      const urls = await PropertyService.uploadImages(files);
      sendSuccess(res, urls, "Bilderna laddades upp.");
    } catch (error) {
      sendError(res, (error as Error).message, 500);
    }
  }

  static async getDashboardStats(
    _req: AuthRequest,
    res: Response
  ): Promise<void> {
    try {
      const stats = await PropertyService.getDashboardStats();
      sendSuccess(res, stats);
    } catch (error) {
      sendError(res, (error as Error).message, 500);
    }
  }
}
