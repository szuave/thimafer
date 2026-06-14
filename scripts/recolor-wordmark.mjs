// Makes a dark-bg version of the THIMAFER wordmark: "THIMA" → white, "FER"
// stays red, transparent stays transparent.  node scripts/recolor-wordmark.mjs
import sharp from "sharp";

const SRC = "public/images/brand/logo-wordmark.png";
const OUT = "public/images/brand/logo-wordmark-light.png";

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
for (let i = 0; i < data.length; i += channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const a = data[i + 3];
  if (a < 8) continue; // transparent
  const isRed = r > 110 && r > g + 35 && r > b + 35;
  if (!isRed) {
    data[i] = 255;
    data[i + 1] = 255;
    data[i + 2] = 255;
  }
}

await sharp(data, { raw: { width, height, channels } })
  .png()
  .toFile(OUT);

console.log(`recolored wordmark: ${width}x${height}`);
