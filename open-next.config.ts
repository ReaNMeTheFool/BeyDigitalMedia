import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Next 16 + Turbopack cikti hash'li modul adi uretir (orn. "sharp-20c6a5da84e2135f");
// OpenNext sharp'i bilerek haric tuttugu icin esbuild cozumlemez. Webpack ciktisi
// duz require("sharp") uretir ve derleme basarili olur.
export default {
  ...defineCloudflareConfig(),
  buildCommand: "next build --webpack",
};
