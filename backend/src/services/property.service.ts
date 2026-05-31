import { Prisma } from "@prisma/client";
import { prisma } from "../config/database";
import { cloudinary } from "../config/cloudinary";
import { PropertyFilters } from "../types";
import { generateSlug, parsePagination } from "../utils/helpers";
import { expandSwedishVariants } from "../utils/swedishSearch";

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
    const allImages = [...property.images, ...property.floorPlanImages];
    for (const imageUrl of allImages) {
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
    const and: Prisma.PropertyWhereInput[] = [];

    if (filters.search) {
      const variants = expandSwedishVariants(filters.search);
      const searchOr: Prisma.PropertyWhereInput[] = [];

      for (const term of variants) {
        searchOr.push(
          { title: { contains: term } },
          { city: { contains: term } },
          { address: { contains: term } },
          { county: { contains: term } },
          { municipality: { contains: term } },
          { description: { contains: term } }
        );
      }

      and.push({ OR: searchOr });
    }

    if (filters.city) {
      const variants = expandSwedishVariants(filters.city);
      and.push({
        OR: variants.map((term) => ({ city: { contains: term } })),
      });
    }

    if (filters.county) {
      const variants = expandSwedishVariants(filters.county);
      and.push({
        OR: variants.map((term) => ({ county: { contains: term } })),
      });
    }

    if (filters.propertyType) {
      and.push({ propertyType: filters.propertyType as Prisma.EnumPropertyTypeFilter["equals"] });
    }
    if (filters.status) {
      and.push({ status: filters.status as Prisma.EnumPropertyStatusFilter["equals"] });
    }
    if (filters.featured === "true") {
      and.push({ featured: true });
    }

    if (filters.minPrice || filters.maxPrice) {
      const price: Prisma.IntFilter = {};
      if (filters.minPrice) price.gte = parseFloat(filters.minPrice);
      if (filters.maxPrice) price.lte = parseFloat(filters.maxPrice);
      and.push({ price });
    }

    return and.length ? { AND: and } : {};
  }

  private static extractPublicId(url: string): string | null {
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.\w+$/);
    return match ? match[1] : null;
  }
}
