import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    // De bronfoto's zijn al geoptimaliseerde WebP's. Zolang R2 (en dus de
    // optimalisatie-cache) uit staat, serveren we ze rechtstreeks als
    // statische, edge-gecachete assets — dat is sneller dan de Worker die
    // elke afbeelding opnieuw optimaliseert zonder cache.
    // Terug aanzetten samen met R2: verwijder `unoptimized`.
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
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
