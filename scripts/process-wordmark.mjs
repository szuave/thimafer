// Crops the THIMAFER wordmark (drops the slogan) for the header lockup.
//   node scripts/process-wordmark.mjs
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";

const SRC = "C:/Users/uidlo/Desktop/a3c8922d-1e64-4590-bb56-2d3340a9db95.png";
const OUT = path.resolve("public/images/brand");
await fs.mkdir(OUT, { recursive: true });

const t = await sharp(SRC).trim({ threshold: 20 }).toBuffer({ resolveWithObject: true });
const { width, height } = t.info;
console.log(`trimmed wordmark+slogan: ${width}x${height}`);

// Keep the top part (THIMAFER), drop the slogan line.
const wmH = Math.round(height * 0.66);
await sharp(t.data)
  .extract({ left: 0, top: 0, width, height: wmH })
  .trim({ background: "#ffffff", threshold: 60 })
  .resize({ height: 200 })
  .png()
  .toFile(path.join(OUT, "logo-wordmark.png"));

const m = await sharp(path.join(OUT, "logo-wordmark.png")).metadata();
console.log(`logo-wordmark: ${m.width}x${m.height} (ratio ${(m.width / m.height).toFixed(2)})`);
