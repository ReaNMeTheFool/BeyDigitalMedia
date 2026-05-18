import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

const nextConfig: NextConfig = {
  // React Compiler - Next.js 16.1.6'da root seviyesinde
  reactCompiler: true,

  // Docker icin standalone output
  output: "standalone",

  // URL trailing slash kapali (SEO)
  trailingSlash: false,

  // Turbopack root - birden fazla lockfile uyarisini kapatir
  turbopack: {
    root: path.resolve(dirname),
  },

  // Image optimizasyonu
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    localPatterns: [
      {
        pathname: "/api/media/file/**",
      },
      {
        pathname: "/**",
      },
    ],
  },

  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      ".cjs": [".cts", ".cjs"],
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
    };
    return webpackConfig;
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

export default withPayload(nextConfig, { devBundleServerPackages: false });
