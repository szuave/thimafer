/**
 * Builds a single, tightly-cropped light lockup (white TF monogram +
 * THIMAFER wordmark, FER red) on a transparent canvas, so the dark-bg
 * Logo can use ONE image — no flex-gap/whitespace centering quirks.
 * Output: /public/images/brand/logo-lockup-light.png
 */
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const brand = (p) => path.join(ROOT, "public", "images", "brand", p);

const H = 220; // working height of the wordmark letters

// 1. White TF silhouette from the dark monogram (keep anti-aliased alpha), trimmed.
const monoSrc = brand("logo-monogram.png");
const m = await sharp(monoSrc).ensureAlpha().metadata();
const alpha = await sharp(monoSrc)
  .ensureAlpha()
  .extractChannel(3)
  .toColourspace("b-w")
  .toBuffer();
const whiteMono = await sharp({
  create: { width: m.width, height: m.height, channels: 3, background: { r: 255, g: 255, b: 255 } },
})
  .joinChannel(alpha)
  .png()
  .toBuffer();
// Monogram a touch taller than the cap height, like the original lockup.
const mono = await sharp(whiteMono).trim().resize({ height: Math.round(H * 1.18) }).toBuffer();
const monoMeta = await sharp(mono).metadata();

// 2. Wordmark (already white THIMA + red FER), trimmed to the letters.
const wm = await sharp(brand("logo-wordmark-light.png")).trim().resize({ height: H }).toBuffer();
const wmMeta = await sharp(wm).metadata();

// 3. Compose [TF][gap][THIMAFER], vertically centred, transparent canvas.
const gap = Math.round(H * 0.4);
const padV = Math.round(H * 0.14);
const canvasH = Math.max(monoMeta.height, wmMeta.height) + padV * 2;
const canvasW = monoMeta.width + gap + wmMeta.width;

await sharp({
  create: { width: canvasW, height: canvasH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
})
  .composite([
    { input: mono, left: 0, top: Math.round((canvasH - monoMeta.height) / 2) },
    { input: wm, left: monoMeta.width + gap, top: Math.round((canvasH - wmMeta.height) / 2) },
  ])
  .png()
  .toFile(brand("logo-lockup-light.png"));

console.log("✓ logo-lockup-light.png", `${canvasW}×${canvasH}`);
