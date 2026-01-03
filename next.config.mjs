/** @type {import('next').NextConfig} */
// Allow optional `basePath` and `assetPrefix` via environment variables so
// the site can be hosted on a GitHub Pages project subpath (e.g. /repo-name).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || '';

const nextConfig = {
  // Export as a static site when using `next build` + `output: 'export'`.
  output: 'export',
  // Set basePath/assetPrefix only when provided (avoid empty-string behaviour)
  ...(basePath ? { basePath } : {}),
  ...(assetPrefix ? { assetPrefix } : {}),
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
