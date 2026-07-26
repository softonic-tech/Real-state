import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/helpers";

export const loginSchema = z.object({
  email: z.string().email("Ogiltig e-postadress"),
  password: z.string().min(6, "Lösenordet måste vara minst 6 tecken"),
});

const PROPERTY_TYPES = [
  "AGRICULTURAL",
  "FOREST",
  "MIXED",
  "RESIDENTIAL",
  "COMMERCIAL",
] as const;

const PROPERTY_STATUSES = ["FOR_SALE", "SOLD", "RENTED", "RESERVED"] as const;

function toOptionalString(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  const trimmed = String(value).trim();
  return trimmed.length > 0 ? trimmed : null;
}

function toPositiveNumber(value: unknown, fallback: number): number {
  const num = Number(value);
  if (Number.isNaN(num) || num <= 0) return fallback;
  return num;
}

function toOptionalPositiveNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const num = Number(value);
  if (Number.isNaN(num) || num <= 0) return null;
  return num;
}

function toOptionalInt(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const num = parseInt(String(value), 10);
  if (Number.isNaN(num) || num <= 0) return null;
  return num;
}

function toNonNegativeInt(value: unknown, fallback = 0): number {
  const num = parseInt(String(value ?? fallback), 10);
  if (Number.isNaN(num) || num < 0) return fallback;
  return num;
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item).trim()).filter(Boolean);
}

/** Accepts loose admin input and normalizes with safe defaults — avoids hard validation failures. */
export const propertySchema = z
  .object({
    title: z.unknown().optional(),
    description: z.unknown().optional(),
    price: z.unknown().optional(),
    city: z.unknown().optional(),
    address: z.unknown().optional(),
    county: z.unknown().optional(),
    rooms: z.unknown().optional(),
    area: z.unknown().optional(),
    landArea: z.unknown().optional(),
    propertyType: z.unknown().optional(),
    status: z.unknown().optional(),
    featured: z.unknown().optional(),
    latitude: z.unknown().optional(),
    longitude: z.unknown().optional(),
    images: z.unknown().optional(),
    floorPlanImages: z.unknown().optional(),
    features: z.unknown().optional(),
    housingType: z.unknown().optional(),
    ownershipForm: z.unknown().optional(),
    municipality: z.unknown().optional(),
    minCash: z.unknown().optional(),
    titleDeedCost: z.unknown().optional(),
    electricityKwh: z.unknown().optional(),
    viewingDate: z.unknown().optional(),
    viewingNote: z.unknown().optional(),
  })
  .strip()
  .transform((data) => {
    const title = toOptionalString(data.title) || "Ny fastighet";
    const propertyType = PROPERTY_TYPES.includes(
      String(data.propertyType) as (typeof PROPERTY_TYPES)[number]
    )
      ? (String(data.propertyType) as (typeof PROPERTY_TYPES)[number])
      : "RESIDENTIAL";

    const status = PROPERTY_STATUSES.includes(
      String(data.status) as (typeof PROPERTY_STATUSES)[number]
    )
      ? (String(data.status) as (typeof PROPERTY_STATUSES)[number])
      : "FOR_SALE";

    return {
      title,
      description:
        toOptionalString(data.description) || "Beskrivning kommer snart.",
      price: toPositiveNumber(data.price, 1),
      city: toOptionalString(data.city) || "Junsele",
      address: toOptionalString(data.address) || title,
      county: toOptionalString(data.county) || "Västernorrland",
      rooms: toNonNegativeInt(data.rooms, 0),
      area: toPositiveNumber(data.area, 1),
      landArea: toOptionalPositiveNumber(data.landArea),
      propertyType,
      status,
      featured: Boolean(data.featured),
      latitude: toOptionalPositiveNumber(data.latitude),
      longitude: toOptionalPositiveNumber(data.longitude),
      images: toStringArray(data.images),
      floorPlanImages: toStringArray(data.floorPlanImages),
      features: toStringArray(data.features),
      housingType: toOptionalString(data.housingType),
      ownershipForm: toOptionalString(data.ownershipForm),
      municipality: toOptionalString(data.municipality),
      minCash: toOptionalPositiveNumber(data.minCash),
      titleDeedCost: toOptionalPositiveNumber(data.titleDeedCost),
      electricityKwh: toOptionalInt(data.electricityKwh),
      viewingDate: toOptionalString(data.viewingDate),
      viewingNote: toOptionalString(data.viewingNote),
    };
  });

export const contactSchema = z.object({
  name: z.string().min(2, "Namn krävs"),
  email: z.string().email("Ogiltig e-postadress"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Ämne krävs"),
  message: z.string().min(10, "Meddelande måste vara minst 10 tecken"),
});

export const proposalSchema = z.object({
  type: z.enum(["BUYER", "SELLER"]),
  name: z.string().min(2, "Namn krävs"),
  email: z.string().email("Ogiltig e-postadress"),
  phone: z.string().min(5, "Telefonnummer krävs"),
  message: z.string().min(10, "Meddelande måste vara minst 10 tecken"),
  propertyId: z.string().optional(),
  propertyName: z.string().optional(),
});

export function validate(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message =
        result.error.errors[0]?.message ||
        "Kunde inte spara fastigheten. Kontrollera uppgifterna.";
      sendError(res, message, 422);
      return;
    }
    req.body = result.data;
    next();
  };
}
