import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

initOpenNextCloudflareForDev();

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

const nextConfig: NextConfig = {
  // React Compiler - Next.js 16.1.6'da root seviyesinde
  reactCompiler: true,

  // URL trailing slash kapali (SEO)
  trailingSlash: false,

  // Turbopack root - birden fazla lockfile uyarisini kapatir
  turbopack: {
    root: path.resolve(dirname),
  },

  // Sharp workerd altinda calismadigi icin optimizasyon kapali (Cloudflare deploy)
  images: {
    unoptimized: true,
  },

  // www -> non-www redirect
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.beydigitalmedia.com",
          },
        ],
        destination: "https://beydigitalmedia.com/:path*",
        permanent: true,
      },
    ];
  },

  // Header yapilandirmasi - guvenlik ve performans
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
