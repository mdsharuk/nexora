// Set this at build time to the public origin used by your production site.
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const origin = new URL(configuredUrl);
if (!['http:', 'https:'].includes(origin.protocol)) {
  throw new Error('NEXT_PUBLIC_SITE_URL must be an absolute HTTP(S) URL');
}

export const siteUrl = origin.origin;
export const siteName = "Nexora Tech";

export function absoluteUrl(path: string = "/"): string {
  const url = new URL(path, `${siteUrl}/`);
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('Structured data URLs must use HTTP(S)');
  }
  return url.href;
}
