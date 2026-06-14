/**
 * Generates the social-share image (/public/og.jpg, 1200×630) and the
 * Apple touch icon (/app/apple-icon.png, 180×180) from existing brand
 * assets — no external fonts required.
 */
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = (p) => path.join(ROOT, "public", p);

const W = 1200;
const H = 630;

async function makeOg() {
  const bg = await sharp(pub("images/banners/banner-02.webp"))
    .resize(W, H, { fit: "cover", position: "center" })
    .toBuffer();

  const overlay = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
       <defs>
         <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
           <stop offset="0" stop-color="#000000" stop-opacity="0.45"/>
           <stop offset="0.55" stop-color="#000000" stop-opacity="0.5"/>
           <stop offset="1" stop-color="#000000" stop-opacity="0.78"/>
         </linearGradient>
       </defs>
       <rect width="${W}" height="${H}" fill="url(#g)"/>
       <rect x="0" y="${H - 10}" width="${W}" height="10" fill="#d4212a"/>
     </svg>`,
  );

  const wordmark = await sharp(pub("images/brand/logo-wordmark-light.png"))
    .resize({ width: 680 })
    .toBuffer();
  const wm = await sharp(wordmark).metadata();

  const out = await sharp(bg)
    .composite([
      { input: overlay, top: 0, left: 0 },
      {
        input: wordmark,
        top: Math.round((H - wm.height) / 2),
        left: Math.round((W - wm.width) / 2),
      },
    ])
    .jpeg({ quality: 86, progressive: true, mozjpeg: true })
    .toFile(pub("og.jpg"));

  console.log("✓ public/og.jpg", `${out.width}×${out.height}`, `${Math.round(out.size / 1024)}kB`);
}

async function makeAppleIcon() {
  const tf = await sharp(path.join(ROOT, "app", "icon.png"))
    .resize(148, 148, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: { width: 180, height: 180, channels: 4, background: "#ffffff" },
  })
    .composite([{ input: tf, top: 16, left: 16 }])
    .png()
    .toFile(path.join(ROOT, "app", "apple-icon.png"));

  console.log("✓ app/apple-icon.png 180×180");
}

await makeOg();
await makeAppleIcon();
