import { Prisma } from "@prisma/client";
import { prisma } from "../config/database";
import { cloudinary } from "../config/cloudinary";
import { PropertyFilters } from "../types";
import { generateSlug, parsePagination } from "../utils/helpers";

export class PropertyService {
  static async getAll(
    filters: PropertyFilters,
    page?: string,
    limit?: string
  ) {
    const { page: p, limit: l, skip } = parsePagination(page, limit);
    const where = this.buildWhereClause(filters);

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        skip,
        take: l,
        orderBy: { createdAt: "desc" },
      }),
      prisma.property.count({ where }),
    ]);

    return {
      properties,
      meta: {
        page: p,
        limit: l,
        total,
        totalPages: Math.ceil(total / l),
      },
    };
  }

  static async getBySlug(slug: string) {
    const property = await prisma.property.findUnique({ where: { slug } });
    if (!property) {
      throw new Error("Fastigheten hittades inte.");
    }
    return property;
  }

  static async getById(id: string) {
    const property = await prisma.property.findUnique({ where: { id } });
    if (!property) {
      throw new Error("Fastigheten hittades inte.");
    }
    return property;
  }

  static async getFeatured() {
    return prisma.property.findMany({
      where: { featured: true, status: "FOR_SALE" },
      take: 6,
      orderBy: { createdAt: "desc" },
    });
  }

  static async create(data: Prisma.PropertyCreateInput) {
    const slug = generateSlug(data.title) + "-" + Date.now().toString(36);
    return prisma.property.create({
      data: { ...data, slug },
    });
  }

  static async update(id: string, data: Prisma.PropertyUpdateInput) {
    const property = await prisma.property.findUnique({ where: { id } });
    if (!property) {
      throw new Error("Fastigheten hittades inte.");
    }
    return prisma.property.update({ where: { id }, data });
  }

  static async delete(id: string) {
    const property = await prisma.property.findUnique({ where: { id } });
    if (!property) {
      throw new Error("Fastigheten hittades inte.");
    }
    // Delete images from Cloudinary
    for (const imageUrl of property.images) {
      try {
        const publicId = this.extractPublicId(imageUrl);
        if (publicId) await cloudinary.uploader.destroy(publicId);
      } catch {
        // Continue deletion even if image cleanup fails
      }
    }
    return prisma.property.delete({ where: { id } });
  }

  static async uploadImages(files: Express.Multer.File[]): Promise<string[]> {
    const uploadPromises = files.map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "nordmark-properties",
              transformation: [
                { width: 1200, height: 800, crop: "fill", quality: "auto" },
              ],
            },
            (error, result) => {
              if (error || !result) reject(error || new Error("Upload failed"));
              else resolve(result.secure_url);
            }
          );
          stream.end(file.buffer);
        })
    );

    return Promise.all(uploadPromises);
  }

  static async getDashboardStats() {
    const [total, forSale, sold, rented, reserved, recentMessages] =
      await Promise.all([
        prisma.property.count(),
        prisma.property.count({ where: { status: "FOR_SALE" } }),
        prisma.property.count({ where: { status: "SOLD" } }),
        prisma.property.count({ where: { status: "RENTED" } }),
        prisma.property.count({ where: { status: "RESERVED" } }),
        prisma.contactMessage.count({ where: { read: false } }),
      ]);

    return { total, forSale, sold, rented, reserved, recentMessages };
  }

  private static buildWhereClause(
    filters: PropertyFilters
  ): Prisma.PropertyWhereInput {
    const where: Prisma.PropertyWhereInput = {};

    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: "insensitive" } },
        { city: { contains: filters.search, mode: "insensitive" } },
        { county: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    if (filters.city) where.city = { contains: filters.city, mode: "insensitive" };
    if (filters.county) where.county = { contains: filters.county, mode: "insensitive" };
    if (filters.propertyType) where.propertyType = filters.propertyType as any;
    if (filters.status) where.status = filters.status as any;
    if (filters.featured === "true") where.featured = true;

    if (filters.minPrice || filters.maxPrice) {
      where.price = {};
      if (filters.minPrice) where.price.gte = parseFloat(filters.minPrice);
      if (filters.maxPrice) where.price.lte = parseFloat(filters.maxPrice);
    }

    return where;
  }

  private static extractPublicId(url: string): string | null {
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.\w+$/);
    return match ? match[1] : null;
  }
}
