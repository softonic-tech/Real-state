import { api } from "./api";
import { Property, PropertyFilters, DashboardStats } from "@/types";

export const propertyService = {
  async getAll(filters?: PropertyFilters) {
    const params = new URLSearchParams();
    if (filters?.search) params.set("search", filters.search);
    if (filters?.city) params.set("city", filters.city);
    if (filters?.propertyType) params.set("propertyType", filters.propertyType);
    if (filters?.status) params.set("status", filters.status);
    if (filters?.minPrice) params.set("minPrice", filters.minPrice);
    if (filters?.maxPrice) params.set("maxPrice", filters.maxPrice);
    if (filters?.page) params.set("page", String(filters.page));

    const query = params.toString();
    return api.get<Property[]>(`/properties${query ? `?${query}` : ""}`);
  },

  async getFeatured() {
    return api.get<Property[]>("/properties/featured");
  },

  async getBySlug(slug: string) {
    return api.get<Property>(`/properties/${slug}`);
  },

  async getById(id: string) {
    return api.get<Property>(`/properties/by-id/${id}`, true);
  },

  async create(data: Partial<Property>) {
    return api.post<Property>("/properties", data, true);
  },

  async update(id: string, data: Partial<Property>) {
    return api.put<Property>(`/properties/${id}`, data, true);
  },

  async delete(id: string) {
    return api.delete(`/properties/${id}`, true);
  },

  async uploadImages(files: File[]) {
    return api.uploadFiles("/properties/upload", files);
  },

  async getStats() {
    return api.get<DashboardStats>("/properties/admin/stats", true);
  },
};
