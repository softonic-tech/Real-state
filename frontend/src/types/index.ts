export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  city: string;
  address: string;
  county: string;
  rooms: number;
  area: number;
  landArea: number | null;
  propertyType: PropertyType;
  status: PropertyStatus;
  images: string[];
  featured: boolean;
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
  updatedAt: string;
}

export type PropertyType =
  | "AGRICULTURAL"
  | "FOREST"
  | "MIXED"
  | "RESIDENTIAL"
  | "COMMERCIAL";

export type PropertyStatus = "FOR_SALE" | "SOLD" | "RENTED" | "RESERVED";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface Proposal {
  id: string;
  type: "BUYER" | "SELLER";
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId: string | null;
  propertyName: string | null;
  read: boolean;
  createdAt: string;
}

export interface Admin {
  id: string;
  email: string;
  name: string;
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

export interface DashboardStats {
  total: number;
  forSale: number;
  sold: number;
  rented: number;
  reserved: number;
  recentMessages: number;
}

export interface PropertyFilters {
  search?: string;
  city?: string;
  propertyType?: string;
  status?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: number;
}
