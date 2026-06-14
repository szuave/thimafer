import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    // Photos are served from /public and (uploaded realisaties) from R2.
    // On Cloudflare, image optimization runs through the IMAGES binding.
    formats: ["image/avif", "image/webp"],
  },
  // Steel-industry photos can be large; keep server actions body limit generous.
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;

// Enables Cloudflare bindings (D1, R2, ...) during `next dev`.
initOpenNextCloudflareForDev();
