// Builds a transparent TF favicon → app/icon.png  (node scripts/make-favicon.mjs)
import sharp from "sharp";
import path from "node:path";

const SRC = "C:/Users/uidlo/Desktop/9d6eac30-b0ff-463c-b89d-efdd40129800.png";

// Flatten onto white, trim to the TF.
const t = await sharp(SRC)
  .flatten({ background: "#ffffff" })
  .trim({ background: "#ffffff", threshold: 20 })
  .toBuffer({ resolveWithObject: true });
const { width, height } = t.info;

// Alpha mask: TF opaque, white background transparent.
const mask = await sharp(t.data)
  .greyscale()
  .threshold(238)
  .negate()
  .toColourspace("b-w")
  .raw()
  .toBuffer();

// Original colours.
const rgb = await sharp(t.data).removeAlpha().raw().toBuffer();

// Colours + alpha → TF on transparent.
const tf = await sharp(rgb, { raw: { width, height, channels: 3 } })
  .joinChannel(mask, { raw: { width, height, channels: 1 } })
  .png()
  .toBuffer();

// Big, centered, fully transparent canvas.
// Zoom in so the TF reads large at 16px (crop the thin outer edges).
const zoomed = await sharp(tf).resize(820, 820, { fit: "cover", position: "centre" }).toBuffer();
await sharp(zoomed)
  .extract({ left: 154, top: 154, width: 512, height: 512 })
  .png()
  .toFile(path.resolve("app/icon.png"));

console.log("favicon written: TF zoomed (transparent)");
