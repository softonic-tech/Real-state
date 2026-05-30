import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/helpers";

export const loginSchema = z.object({
  email: z.string().email("Ogiltig e-postadress"),
  password: z.string().min(6, "Lösenordet måste vara minst 6 tecken"),
});

export const propertySchema = z.object({
  title: z.string().min(3, "Titel måste vara minst 3 tecken"),
  description: z.string().min(10, "Beskrivning måste vara minst 10 tecken"),
  price: z.coerce.number().positive("Priset måste vara positivt"),
  city: z.string().min(2, "Stad krävs"),
  address: z.string().min(3, "Adress krävs"),
  county: z.string().min(2, "Län krävs"),
  rooms: z.coerce.number().int().min(0, "Antal rum kan inte vara negativt"),
  area: z.coerce.number().positive("Area måste vara positiv"),
  landArea: z.coerce.number().positive().optional(),
  propertyType: z.enum(["AGRICULTURAL", "FOREST", "MIXED", "RESIDENTIAL", "COMMERCIAL"]),
  status: z.enum(["FOR_SALE", "SOLD", "RENTED", "RESERVED"]).optional(),
  featured: z.coerce.boolean().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
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
      const errors = result.error.errors.map((e) => e.message).join(", ");
      sendError(res, errors, 422);
      return;
    }
    req.body = result.data;
    next();
  };
}
