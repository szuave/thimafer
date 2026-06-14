// Builds numbered contact sheets per category so the best photos can be picked.
//   node scripts/make-montage.mjs
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";

const SRC =
  "C:/Users/uidlo/Desktop/wetransfer_foto-s-web-site_2026-06-08_1747/Foto's Web-site";
// fall back to the Downloads path if the Desktop copy doesn't exist
const SRC_ALT =
  "C:/Users/uidlo/Downloads/wetransfer_foto-s-web-site_2026-06-08_1747/Foto's Web-site";
const OUT = path.resolve("_montages");
await fs.mkdir(OUT, { recursive: true });

async function root() {
  try {
    await fs.access(SRC);
    return SRC;
  } catch {
    return SRC_ALT;
  }
}
const BASE = await root();

const CATS = {
  trappen: [
    "Stalen Binnen Trappen/Cortoos",
    "Stalen Binnen Trappen/Paard Van Troje",
    "Stalen Binnen Trappen/Baku - Knokke",
    "Stalen Binnen Trappen/Geert Jansens",
    "Buitentrappen gegalvaniseerd/Stekene",
  ],
  leuningen: [
    "Balustrades inox/Vereecke-Cleene",
    "Balustrades inox/Willem De Beerstraat",
    "Glazen Balustrades/Ternat",
    "Glazen Balustrades/Eindewere",
    "Balustrades Staal/Nieuwpoort",
  ],
  poorten: ["Poorten/Ken Meire", "Poorten/Melissa", "Poorten/Krommewal", "Poorten/Ahmed - Mariakerke"],
  staalconstructies: [
    "Stalen constructies/Zwijnaard carrefour",
    "Stalen constructies/Wondelgem",
    "Stalen constructies/Ref. Maandag/Loods 23",
    "Stalen constructies/Ferrerlaan",
  ],
  gevelconstructies: [
    "Gevelconstructies/UZA",
    "Gevelconstructies/Einde-were",
    "Gevelconstructies/Parkeer gebouw Blankenberge",
    "Gevelconstructies/Bomastraat",
  ],
  fietsenstallingen: ["Stalen constructies/Ref. Maandag/Fietsen stalling Deinze"],
  "stalen-schrijnwerk": [
    "Stalen Schrijnwerk/Oosterzele",
    "Stalen Schrijnwerk/Henley Kaai",
    "Stalen Schrijnwerk/Flint - Zwalm",
    "Stalen Schrijnwerk/Eeklo",
  ],
};

async function listImages(dir, n) {
  try {
    const files = (await fs.readdir(dir))
      .filter((f) => /\.(jpe?g|png)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    return files.slice(0, n).map((f) => path.join(dir, f));
  } catch {
    return [];
  }
}

async function collect(folders, max) {
  const imgs = [];
  const perFolder = Math.max(1, Math.ceil(max / folders.length));
  for (const f of folders) {
    const got = await listImages(path.join(BASE, f), perFolder + 1);
    for (const g of got) {
      imgs.push(g);
      if (imgs.length >= max) return imgs;
    }
  }
  return imgs;
}

function label(i) {
  return Buffer.from(
    `<svg width="46" height="32"><rect width="46" height="32" rx="3" fill="#d4212a"/><text x="23" y="22" font-size="18" fill="white" font-family="Arial" font-weight="bold" text-anchor="middle">${i + 1}</text></svg>`,
  );
}

const map = {};
for (const [name, folders] of Object.entries(CATS)) {
  const imgs = await collect(folders, 8);
  map[name] = imgs.map((p) => path.relative(BASE, p));
  if (imgs.length === 0) {
    console.log(`! ${name}: no images`);
    continue;
  }
  const cols = 4;
  const tw = 360;
  const th = 270;
  const gap = 8;
  const rows = Math.ceil(imgs.length / cols);
  const W = cols * tw + (cols + 1) * gap;
  const H = rows * th + (rows + 1) * gap;
  const composites = [];
  for (let i = 0; i < imgs.length; i++) {
    const thumb = await sharp(imgs[i]).rotate().resize(tw, th, { fit: "cover" }).jpeg({ quality: 70 }).toBuffer();
    const x = gap + (i % cols) * (tw + gap);
    const y = gap + Math.floor(i / cols) * (th + gap);
    composites.push({ input: thumb, left: x, top: y });
    composites.push({ input: label(i), left: x + 6, top: y + 6 });
  }
  await sharp({ create: { width: W, height: H, channels: 3, background: "#ffffff" } })
    .composite(composites)
    .jpeg({ quality: 72 })
    .toFile(path.join(OUT, `${name}.jpg`));
  console.log(`✓ ${name}: ${imgs.length} thumbs`);
}

await fs.writeFile(path.join(OUT, "map.json"), JSON.stringify(map, null, 2));
console.log("\nMap written to _montages/map.json");
