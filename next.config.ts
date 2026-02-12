import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React Compiler - Next.js 16'da experimental'dan çıktı
  reactCompiler: true,
  
  // Turbopack kullanımı (varsayılan)
  turbopack: {},
  
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
