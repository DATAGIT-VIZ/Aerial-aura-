// The site's public address, used for share-image links, the sitemap and robots.txt.
// Set NEXT_PUBLIC_SITE_URL once the domain is live. Until then it falls back to the
// host's own production URL (Vercel or Netlify), so link previews work before launch.
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, '');
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  const netlify = process.env.URL; // set by Netlify builds
  if (netlify) return netlify.replace(/\/$/, '');
  return 'https://aerialaurastudio.com';
}

export const SITE_URL = resolveSiteUrl();
