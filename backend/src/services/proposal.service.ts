import { Prisma } from "@prisma/client";
import { prisma } from "../config/database";
import { parsePagination } from "../utils/helpers";

export class ProposalService {
  static async create(data: Prisma.ProposalCreateInput) {
    return prisma.proposal.create({ data });
  }

  static async getAll(type?: string, page?: string, limit?: string) {
    const { page: p, limit: l, skip } = parsePagination(page, limit);
    const where: Prisma.ProposalWhereInput = {};

    if (type === "BUYER" || type === "SELLER") {
      where.type = type;
    }

    const [proposals, total] = await Promise.all([
      prisma.proposal.findMany({
        where,
        skip,
        take: l,
        orderBy: { createdAt: "desc" },
      }),
      prisma.proposal.count({ where }),
    ]);

    return {
      proposals,
      meta: { page: p, limit: l, total, totalPages: Math.ceil(total / l) },
    };
  }

  static async markAsRead(id: string) {
    return prisma.proposal.update({
      where: { id },
      data: { read: true },
    });
  }

  static async delete(id: string) {
    return prisma.proposal.delete({ where: { id } });
  }
}
