import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../config/database";
import { config } from "../config";

export class AuthService {
  static async login(email: string, password: string) {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      throw new Error("Ogiltiga inloggningsuppgifter.");
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      throw new Error("Ogiltiga inloggningsuppgifter.");
    }

    const token = jwt.sign({ id: admin.id }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });

    return {
      token,
      admin: { id: admin.id, email: admin.email, name: admin.name },
    };
  }

  static async getProfile(adminId: string) {
    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    if (!admin) {
      throw new Error("Administratören hittades inte.");
    }

    return admin;
  }
}
