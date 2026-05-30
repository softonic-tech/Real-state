import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "5000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET || "fallback-secret-change-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  frontendUrl:
    process.env.FRONTEND_URL ||
    process.env.CORS_ORIGIN ||
    "http://localhost:3000",
  cloudinary: {
    cloudName:
      process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || process.env.CLOUD_KEY || "",
    apiSecret:
      process.env.CLOUDINARY_API_SECRET || process.env.CLOUD_SECRET || "",
  },
} as const;
