import { ApiResponse } from "@/types";
import { getApiUrl } from "@/lib/env";

class ApiClient {
  private get baseUrl(): string {
    return getApiUrl();
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

  private async parseResponse<T>(res: Response): Promise<ApiResponse<T>> {
    const contentType = res.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      return {
        success: false,
        error: res.ok
          ? "Ogiltigt svar från servern"
          : `Serverfel (${res.status})`,
      };
    }

    try {
      const data = (await res.json()) as ApiResponse<T>;
      if (!res.ok && data.success !== false) {
        return {
          success: false,
          error: data.error || `Serverfel (${res.status})`,
        };
      }
      return data;
    } catch {
      return { success: false, error: "Kunde inte läsa serversvar" };
    }
  }

  private async request<T>(
    endpoint: string,
    init: RequestInit = {},
    authenticated = false
  ): Promise<ApiResponse<T>> {
    if (!this.baseUrl) {
      return { success: false, error: "API-URL saknas (NEXT_PUBLIC_API_URL)" };
    }

    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        ...init,
        headers: { ...this.getHeaders(authenticated), ...init.headers },
        cache: init.cache ?? "no-store",
      });
      return this.parseResponse<T>(res);
    } catch {
      return {
        success: false,
        error: "Kunde inte nå servern. Kontrollera att API:et körs.",
      };
    }
  }

  async get<T>(endpoint: string, authenticated = false): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" }, authenticated);
  }

  async post<T>(
    endpoint: string,
    data: unknown,
    authenticated = false
  ): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      { method: "POST", body: JSON.stringify(data) },
      authenticated
    );
  }

  async put<T>(
    endpoint: string,
    data: unknown,
    authenticated = false
  ): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      { method: "PUT", body: JSON.stringify(data) },
      authenticated
    );
  }

  async patch<T>(
    endpoint: string,
    authenticated = false
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "PATCH" }, authenticated);
  }

  async delete<T>(
    endpoint: string,
    authenticated = false
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" }, authenticated);
  }

  async uploadFiles(
    endpoint: string,
    files: File[]
  ): Promise<ApiResponse<string[]>> {
    if (!this.baseUrl) {
      return { success: false, error: "API-URL saknas (NEXT_PUBLIC_API_URL)" };
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    const headers: HeadersInit = {};
    const token = this.getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;

    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "POST",
        headers,
        body: formData,
      });
      return this.parseResponse<string[]>(res);
    } catch {
      return {
        success: false,
        error: "Kunde inte ladda upp filer. Kontrollera API-anslutningen.",
      };
    }
  }
}

export const api = new ApiClient();
