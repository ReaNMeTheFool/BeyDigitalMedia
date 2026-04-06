import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React Compiler - Next.js 16.1.6'da root seviyesinde
  reactCompiler: true,

  // Turbopack root - birden fazla lockfile uyarısını kapatır
  turbopack: {
    root: process.cwd(),
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
  },

  // Header yapılandırması - güvenlik ve performans
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
