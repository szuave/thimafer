// Composites the TF monogram + THIMAFER wordmark into one horizontal lockup.
//   node scripts/build-lockup.mjs
import sharp from "sharp";
import path from "node:path";

const OUT = path.resolve("public/images/brand");
const monoH = 132;
const wordH = 104;
const gap = 18;
const pad = 8;

const mono = await sharp(path.join(OUT, "logo-monogram.png"))
  .resize({ height: monoH })
  .toBuffer({ resolveWithObject: true });
const word = await sharp(path.join(OUT, "logo-wordmark.png"))
  .resize({ height: wordH })
  .toBuffer({ resolveWithObject: true });

const H = Math.max(mono.info.height, word.info.height) + pad * 2;
const W = mono.info.width + gap + word.info.width + pad * 2;

await sharp({ create: { width: W, height: H, channels: 3, background: "#ffffff" } })
  .composite([
    { input: mono.data, left: pad, top: Math.round((H - mono.info.height) / 2) },
    { input: word.data, left: pad + mono.info.width + gap, top: Math.round((H - word.info.height) / 2) },
  ])
  .png()
  .toFile(path.join(OUT, "logo-lockup.png"));

const m = await sharp(path.join(OUT, "logo-lockup.png")).metadata();
console.log(`logo-lockup: ${m.width}x${m.height} (ratio ${(m.width / m.height).toFixed(2)})`);
