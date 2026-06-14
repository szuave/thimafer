// Media pipeline: optimized WebP assets in /public/images.
//   node scripts/optimize-media.mjs
//
// Hero banners + category covers + feature image are hand-picked photos
// that show actual finished steelwork (chosen via scripts/make-montage.mjs).

import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";

const SRC =
  "C:/Users/uidlo/Downloads/wetransfer_foto-s-web-site_2026-06-08_1747/Foto's Web-site";
const PUB = path.resolve("public/images");

sharp.cache(false);

async function ensure(dir) {
  await fs.mkdir(dir, { recursive: true });
}
async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}
async function cover(srcFile, destFile, width, height, quality = 82) {
  await ensure(path.dirname(destFile));
  await sharp(srcFile)
    .rotate()
    .resize(width, height, { fit: "cover", position: "attention" })
    .webp({ quality })
    .toFile(destFile);
  const { size } = await fs.stat(destFile);
  console.log(`  ${path.basename(destFile)}  (${Math.round(size / 1024)} KB)`);
}

/* Hero banners — the client's own banner selection (Bannershome_page). */
const BANNERS = [
  "Bannershome_page/Bannerhomepage-1.jpg",
  "Bannershome_page/Bannerhomepage-2.jpg",
  "Bannershome_page/Bannerhomepage-4.jpg",
  "Bannershome_page/dreamstime_xl_21562308.jpg",
  "Bannershome_page/dreamstime_xl_6735377.jpg",
];

/* Category covers — best representative photo per category. */
const CATEGORY_FILES = {
  trappen: "Stalen Binnen Trappen/Paard Van Troje/paard van troje (1) (Large).jpg",
  leuningen: "Balustrades inox/Vereecke-Cleene/Vereecke-Cleene_traphal (4).JPG",
  poorten: "Poorten/Ken Meire/Ken Meire (3).JPG",
  fietsenstallingen: "Stalen constructies/Ref. Maandag/Fietsen stalling Deinze/IMG_2548.JPEG",
  staalconstructies: "Stalen constructies/Wondelgem/wondelgem (1).JPG",
  gevelconstructies: "Gevelconstructies/UZA/UZA (2).jpg",
  "stalen-schrijnwerk": "Stalen Schrijnwerk/Oosterzele/Oosterzele (1).jpg",
};

/* Feature image (over-ons / dienst-detail) — clean finished steelwork. */
const FEATURES = {
  atelier: "Stalen Schrijnwerk/Oosterzele/Oosterzele (3).jpg",
};

async function run() {
  console.log("→ Hero banners");
  let i = 1;
  for (const rel of BANNERS) {
    const src = path.join(SRC, rel);
    if (!(await exists(src))) {
      console.log(`  ! missing: ${rel}`);
      continue;
    }
    // Landscape hero crop (right column).
    await cover(src, path.join(PUB, "banners", `banner-${String(i).padStart(2, "0")}.webp`), 1600, 1200, 82);
    i++;
  }

  console.log("→ Category covers");
  for (const [slug, rel] of Object.entries(CATEGORY_FILES)) {
    const src = path.join(SRC, rel);
    if (!(await exists(src))) {
      console.log(`  ! missing: ${rel}`);
      continue;
    }
    await cover(src, path.join(PUB, "categories", `${slug}.webp`), 1400, 1050, 82);
  }

  console.log("→ Feature images");
  for (const [name, rel] of Object.entries(FEATURES)) {
    const src = path.join(SRC, rel);
    if (!(await exists(src))) {
      console.log(`  ! missing: ${rel}`);
      continue;
    }
    // Whole photo, no crop.
    await sharp(src).rotate().resize({ width: 1600 }).webp({ quality: 82 }).toFile(path.join(PUB, "feature", `${name}.webp`));
  }

  console.log("Done.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
