import { Prisma } from "@prisma/client";
import { prisma } from "../config/database";
import { parsePagination } from "../utils/helpers";

export class ContactService {
  static async create(data: Prisma.ContactMessageCreateInput) {
    return prisma.contactMessage.create({ data });
  }

  static async getAll(page?: string, limit?: string) {
    const { page: p, limit: l, skip } = parsePagination(page, limit);

    const [messages, total] = await Promise.all([
      prisma.contactMessage.findMany({
        skip,
        take: l,
        orderBy: { createdAt: "desc" },
      }),
      prisma.contactMessage.count(),
    ]);

    return {
      messages,
      meta: { page: p, limit: l, total, totalPages: Math.ceil(total / l) },
    };
  }

  static async markAsRead(id: string) {
    return prisma.contactMessage.update({
      where: { id },
      data: { read: true },
    });
  }

  static async delete(id: string) {
    return prisma.contactMessage.delete({ where: { id } });
  }
}
