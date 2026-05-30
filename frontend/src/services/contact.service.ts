import { api } from "./api";
import { ContactMessage, Proposal } from "@/types";

export const contactService = {
  async send(data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) {
    return api.post<ContactMessage>("/contact", data);
  },

  async getAll(page = 1) {
    return api.get<ContactMessage[]>(`/contact?page=${page}`, true);
  },

  async markAsRead(id: string) {
    return api.patch<ContactMessage>(`/contact/${id}/read`, true);
  },

  async delete(id: string) {
    return api.delete(`/contact/${id}`, true);
  },
};

export const proposalService = {
  async send(data: {
    type: "BUYER" | "SELLER";
    name: string;
    email: string;
    phone: string;
    message: string;
    propertyId?: string;
    propertyName?: string;
  }) {
    return api.post<Proposal>("/proposals", data);
  },

  async getAll(type?: string, page = 1) {
    const params = new URLSearchParams({ page: String(page) });
    if (type) params.set("type", type);
    return api.get<Proposal[]>(`/proposals?${params}`, true);
  },

  async markAsRead(id: string) {
    return api.patch<Proposal>(`/proposals/${id}/read`, true);
  },

  async delete(id: string) {
    return api.delete(`/proposals/${id}`, true);
  },
};
