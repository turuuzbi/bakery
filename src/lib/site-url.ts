/**
 * Absolute site URL for metadata, OG images and structured data.
 * Set NEXT_PUBLIC_SITE_URL once you have a custom domain; on Vercel the
 * production URL is picked up automatically.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
