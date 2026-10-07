const appModule = require("../dist/server.js");

const app = appModule.default || appModule;

function originalPath(req) {
  const current = req.url || "";
  const pathname = current.split("?")[0];
  const rewritten =
    pathname === "/api" ||
    pathname === "/api/" ||
    pathname.startsWith("/api/index.js") ||
    pathname.startsWith("/dist/server.js");

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

module.exports = (req, res) => {
  req.url = originalPath(req);
  return app(req, res);
};
