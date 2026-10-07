import type { IncomingMessage, ServerResponse } from "http";
import app from "../src/server";

function originalPath(req: IncomingMessage): string {
  const current = req.url || "";
  const pathname = current.split("?")[0];
  const rewritten =
    pathname === "/api" ||
    pathname === "/api/" ||
    pathname.startsWith("/api/index");

  if (pathname.startsWith("/api/") && !rewritten) return current;

  const headerNames = [
    "x-forwarded-uri",
    "x-original-url",
    "x-invoke-path",
    "x-vercel-original-url",
  ];

  for (const name of headerNames) {
    const value = req.headers[name];
    if (typeof value === "string" && value.startsWith("/")) return value;
  }

  return current;
}

export default function handler(req: IncomingMessage, res: ServerResponse) {
  req.url = originalPath(req);
  return app(req, res);
}
