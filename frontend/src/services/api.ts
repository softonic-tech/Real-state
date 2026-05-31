import { ApiResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("admin_token");
  }

  private getHeaders(authenticated = false): HeadersInit {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (authenticated) {
      const token = this.getToken();
      if (token) headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }

  async get<T>(endpoint: string, authenticated = false): Promise<ApiResponse<T>> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: this.getHeaders(authenticated),
      cache: "no-store",
    });
    return res.json();
  }

  async post<T>(
    endpoint: string,
    data: unknown,
    authenticated = false
  ): Promise<ApiResponse<T>> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: this.getHeaders(authenticated),
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async put<T>(
    endpoint: string,
    data: unknown,
    authenticated = false
  ): Promise<ApiResponse<T>> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PUT",
      headers: this.getHeaders(authenticated),
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async patch<T>(
    endpoint: string,
    authenticated = false
  ): Promise<ApiResponse<T>> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PATCH",
      headers: this.getHeaders(authenticated),
    });
    return res.json();
  }

  async delete<T>(
    endpoint: string,
    authenticated = false
  ): Promise<ApiResponse<T>> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "DELETE",
      headers: this.getHeaders(authenticated),
    });
    return res.json();
  }

  async uploadFiles(
    endpoint: string,
    files: File[]
  ): Promise<ApiResponse<string[]>> {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    const headers: HeadersInit = {};
    const token = this.getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers,
      body: formData,
    });
    return res.json();
  }
}

export const api = new ApiClient(API_URL);
