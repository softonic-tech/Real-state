import { api } from "./api";
import { Admin } from "@/types";

interface LoginResponse {
  token: string;
  admin: Admin;
}

export const authService = {
  async login(email: string, password: string) {
    const res = await api.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    if (res.success && res.data) {
      localStorage.setItem("admin_token", res.data.token);
      localStorage.setItem("admin_user", JSON.stringify(res.data.admin));
    }
    return res;
  },

  logout() {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
  },

  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("admin_token");
  },

  getAdmin(): Admin | null {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem("admin_user");
    return data ? JSON.parse(data) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
