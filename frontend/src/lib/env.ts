const DEV_API_URL = "http://localhost:5000/api";
const DEV_SITE_URL = "http://localhost:3000";

function trimTrailingSlash(value: string): string {
  return value.replace(/\/$/, "");
}

/** Public API base URL (browser + SSR). Must be set in Vercel/production. */
export function getApiUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (url) return trimTrailingSlash(url);

  if (process.env.NODE_ENV === "production") {
    console.error(
      "[env] NEXT_PUBLIC_API_URL is not set. API requests will fail in production."
    );
  }

  return DEV_API_URL;
}

/** Canonical site URL for metadata, OG tags, and sitemap. */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return trimTrailingSlash(configured);

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel}`;

  return DEV_SITE_URL;
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}
