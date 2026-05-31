import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { config, validateProductionConfig } from "./config";
import routes from "./routes";
import { errorHandler, notFoundHandler } from "./middleware/error";

validateProductionConfig();

const app = express();

function isLocalhostOrigin(origin: string): boolean {
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
}

function isVercelPreviewOrigin(origin: string): boolean {
  return /^https:\/\/[\w-]+[\w.-]*\.vercel\.app$/.test(origin);
}

const corsOptions: cors.CorsOptions = {
  origin(origin, callback) {
    if (!origin) {
      callback(null, true);
      return;
    }

    const normalized = origin.replace(/\/$/, "");

    if (config.allowedOrigins.includes(normalized)) {
      callback(null, true);
      return;
    }

    if (config.allowVercelPreviews && isVercelPreviewOrigin(normalized)) {
      callback(null, true);
      return;
    }

    if (!config.isProduction && isLocalhostOrigin(normalized)) {
      callback(null, true);
      return;
    }

    callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.set("trust proxy", 1);

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: config.isProduction ? 200 : 100,
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => req.method === "OPTIONS",
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    env: config.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

app.use("/api", routes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(
    `Server running on port ${config.port} in ${config.nodeEnv} mode`
  );
  console.log(
    `CORS: ${config.allowedOrigins.join(", ") || "(none)"}${
      config.allowVercelPreviews ? " + Vercel previews" : ""
    }${config.isProduction ? "" : " + localhost in development"}`
  );
});

export default app;
