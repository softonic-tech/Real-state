import { Request } from "express";

export interface AuthRequest extends Request {
  adminId?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginationQuery {
  page?: string;
  limit?: string;
}

export interface PropertyFilters {
  search?: string;
  city?: string;
  county?: string;
  propertyType?: string;
  status?: string;
  minPrice?: string;
  maxPrice?: string;
  featured?: string;
}
