import { api } from "./api";
import { Property, PropertyFilters, DashboardStats } from "@/types";

export const propertyService = {
  async getAll(filters?: PropertyFilters) {
    const params = new URLSearchParams();
    if (filters?.search) params.set("search", filters.search);
    if (filters?.city) params.set("city", filters.city);
    if (filters?.county) params.set("county", filters.county);
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

  async getRecommended(current: Property, limit = 3) {
    const picked: Property[] = [];
    const seen = new Set<string>([current.id]);

    const addFrom = (list: Property[]) => {
      for (const property of list) {
        if (seen.has(property.id)) continue;
        seen.add(property.id);
        picked.push(property);
        if (picked.length >= limit) return;
      }
    };

    const cityRes = await this.getAll({
      city: current.city,
      status: "FOR_SALE",
    });
    if (cityRes.success && cityRes.data) addFrom(cityRes.data);

    if (picked.length < limit) {
      const countyRes = await this.getAll({
        county: current.county,
        status: "FOR_SALE",
      });
      if (countyRes.success && countyRes.data) addFrom(countyRes.data);
    }

    if (picked.length < limit) {
      const featuredRes = await this.getFeatured();
      if (featuredRes.success && featuredRes.data) addFrom(featuredRes.data);
    }

    return { success: true as const, data: picked.slice(0, limit) };
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
