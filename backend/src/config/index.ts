import dotenv from "dotenv";

dotenv.config();

function parseClientUrls(): string[] {
  const raw =
    process.env.CLIENT_URL ||
    process.env.FRONTEND_URL ||
    process.env.CORS_ORIGINS ||
    "http://localhost:3000";
  return raw
    .split(",")
    .map((url) => url.trim().replace(/\/$/, ""))
    .filter(Boolean);
}

const nodeEnv = process.env.NODE_ENV || "development";
const isProduction = nodeEnv === "production";

function requireEnv(name: string, value: string | undefined): string {
  if (!value || value.trim() === "") {
    console.error(`[config] Missing required environment variable: ${name}`);
    process.exit(1);
  }
  return value.trim();
}

/** Fail fast in production if critical secrets/config are missing. */
export function validateProductionConfig(): void {
  if (!isProduction) return;

  requireEnv("DATABASE_URL", process.env.DATABASE_URL);
  requireEnv("JWT_SECRET", process.env.JWT_SECRET);

  const clientUrls = parseClientUrls();
  if (clientUrls.length === 0 || clientUrls[0] === "http://localhost:3000") {
    console.error(
      "[config] CLIENT_URL must include your production frontend URL(s) in production"
    );
    process.exit(1);
  }

  const { cloudName, apiKey, apiSecret } = {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY || process.env.CLOUD_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET || process.env.CLOUD_SECRET,
  };

  if (!cloudName || !apiKey || !apiSecret) {
    console.error(
      "[config] Cloudinary credentials are required in production for image uploads"
    );
    process.exit(1);
  }
}

export const config = {
  port: parseInt(process.env.PORT || "5000", 10),
  nodeEnv,
  isProduction,
  jwtSecret: isProduction
    ? requireEnv("JWT_SECRET", process.env.JWT_SECRET)
    : process.env.JWT_SECRET || "dev-only-jwt-secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  frontendUrl: parseClientUrls()[0] || "http://localhost:3000",
  allowedOrigins: parseClientUrls(),
  allowVercelPreviews: process.env.ALLOW_VERCEL_PREVIEWS === "true",
  cloudinary: {
    cloudName:
      process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || process.env.CLOUD_KEY || "",
    apiSecret:
      process.env.CLOUDINARY_API_SECRET || process.env.CLOUD_SECRET || "",
  },
} as const;
