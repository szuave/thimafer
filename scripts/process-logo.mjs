// Processes the brand logo into web assets.
//   node scripts/process-logo.mjs
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";

const SRC = "C:/Users/uidlo/Desktop/thimafer.png";
const OUT = path.resolve("public/images/brand");
await fs.mkdir(OUT, { recursive: true });

// 1) Trim surrounding whitespace.
const trimmed = await sharp(SRC).trim({ threshold: 15 }).toBuffer({ resolveWithObject: true });
const { width, height } = trimmed.info;
console.log(`trimmed: ${width}x${height}`);

// 2) Full logo (with slogan) — for OG / general use.
await sharp(trimmed.data).resize({ width: 800 }).png().toFile(path.join(OUT, "logo-full.png"));

// 3) Header mark — monogram + wordmark, slogan cropped off.
const markH = Math.round(height * 0.76);
await sharp(trimmed.data)
  .extract({ left: 0, top: 0, width, height: markH })
  .trim({ threshold: 15 })
  .resize({ width: 640 })
  .png()
  .toFile(path.join(OUT, "logo-mark.png"));

const meta = await sharp(path.join(OUT, "logo-mark.png")).metadata();
console.log(`logo-mark: ${meta.width}x${meta.height} (ratio ${(meta.width / meta.height).toFixed(2)})`);

// 4) Monogram only (top graphic) — for the header lockup [TF] + THIMAFER text.
const monoH = Math.round(height * 0.6);
await sharp(trimmed.data)
  .extract({ left: 0, top: 0, width, height: monoH })
  .trim({ background: "#ffffff", threshold: 70 })
  .resize({ height: 240 })
  .png()
  .toFile(path.join(OUT, "logo-monogram.png"));
const mm = await sharp(path.join(OUT, "logo-monogram.png")).metadata();
console.log(`logo-monogram: ${mm.width}x${mm.height} (ratio ${(mm.width / mm.height).toFixed(2)})`);
console.log("Done.");
