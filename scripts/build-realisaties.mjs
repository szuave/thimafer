// Curates realisatie galleries from the client's photos and emits seed SQL.
// Auto-scans every project folder per category (skips work-in-progress /
// duplicate folders), so a large share of the photos is used.
//
//   node scripts/build-realisaties.mjs
//   npx wrangler d1 execute themafer-db --local --file drizzle/seed.sql

import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";

function baseSlug(input) {
  return String(input)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const SRC =
  "C:/Users/uidlo/Downloads/wetransfer_foto-s-web-site_2026-06-08_1747/Foto's Web-site";
const PUB = path.resolve("public/images/realisaties");
const SEED = path.resolve("drizzle/seed.sql");
const MAX = 8; // photos per project
const TS = 1717000000;

sharp.cache(false);

// Folders we never use (messy work-in-progress / duplicates).
const EXCLUDE = new Set([
  "Montages",
  "Referenties",
  "Diversen",
  "Bannershome_page",
  "Zwijnaard carrefour", // truck/site shots — not nice enough
]);
const FIETSEN_REL = "Stalen constructies/Ref. Maandag/Fietsen stalling Deinze";

const CATEGORIES = [
  { slug: "trappen", name: "Trappen", description: "Stalen binnen- en buitentrappen op maat — van strakke spiltrappen tot robuuste gegalvaniseerde buitentrappen.", blurb: "Een op maat gemaakte stalen trap, ontworpen, geproduceerd en gemonteerd door Thimafer.", roots: ["Stalen Binnen Trappen", "Buitentrappen gegalvaniseerd"] },
  { slug: "leuningen", name: "Leuningen", description: "Leuningen en balustrades in staal, inox of glas. Veilig, strak en perfect op maat afgewerkt.", blurb: "Een leuning of balustrade op maat, met oog voor veiligheid en detail.", roots: ["Balustrades inox", "Balustrades Staal", "Glazen Balustrades"] },
  { slug: "poorten", name: "Poorten", description: "Stalen poorten en hekwerk — manueel of gemotoriseerd, sober of decoratief.", blurb: "Een stalen poort op maat, stevig en strak afgewerkt.", roots: ["Poorten"] },
  { slug: "fietsenstallingen", name: "Fietsenstallingen", description: "Fietsenstallingen en overkappingen voor de publieke ruimte, bedrijven en residenties.", blurb: "Een duurzame fietsenstalling, ontworpen en gemonteerd in staal.", roots: [] },
  { slug: "staalconstructies", name: "Staalconstructies", description: "Draagstructuren, bordessen en industriële staalbouw — berekend, gelast en gemonteerd.", blurb: "Een staalconstructie op maat — berekend, gelast en gemonteerd door Thimafer.", roots: ["Stalen constructies"] },
  { slug: "gevelconstructies", name: "Gevelconstructies", description: "Stalen gevelconstructies en draagstructuren voor bekleding, met oog voor detail en duurzaamheid.", blurb: "Een stalen gevelconstructie, uitgevoerd met precisie en duurzaamheid.", roots: ["Gevelconstructies"] },
  { slug: "stalen-schrijnwerk", name: "Stalen schrijnwerk", description: "Stalen ramen, deuren en taatsdeuren met fijne profielen — tijdloos en op maat.", blurb: "Stalen schrijnwerk met fijne profielen — tijdloos en op maat gemaakt.", roots: ["Stalen Schrijnwerk"] },
];

const POSTS = [
  { slug: "waarom-maatwerk-in-staal", title: "Waarom kiezen voor maatwerk in staal?", excerpt: "Staal is sterk, duurzaam en eindeloos vormbaar. Ontdek waarom maatwerk in staal de slimme keuze is voor uw project.", cover: "/images/feature/atelier.webp", content: "<p>Staal is een van de meest veelzijdige materialen in de bouw. Het combineert een enorme sterkte met een verrassende vormbaarheid, waardoor het zowel voor fijne details als voor zware draagstructuren ingezet kan worden.</p><p>Bij maatwerk vertrekken we altijd van uw specifieke situatie. Geen standaardmaten, maar een oplossing die exact past — esthetisch én technisch.</p><p>Bovendien is staal 100% recycleerbaar en gaat een goed afgewerkte constructie generaties lang mee.</p>" },
  { slug: "stalen-trappen-stijl-en-duurzaamheid", title: "Stalen trappen: stijl én duurzaamheid", excerpt: "Een stalen trap is meer dan een verbinding tussen twee verdiepingen. Het is een blikvanger die jaren meegaat.", cover: "/images/categories/trappen.webp", content: "<p>Een trap is vaak het eerste wat opvalt in een ruimte. In staal krijgt u strakke lijnen, slanke profielen en een tijdloze uitstraling.</p><p>Of u nu kiest voor een zwevende binnentrap of een robuuste gegalvaniseerde buitentrap: wij tekenen, produceren en plaatsen alles in eigen beheer.</p>" },
  { slug: "van-tekening-tot-montage", title: "Van tekening tot montage: zo werkt Thimafer", excerpt: "Eén partner, van het eerste tekenwerk tot de plaatsing op de werf. Zo houden we de kwaliteit in eigen hand.", cover: "/images/feature/werkwijze.webp", content: "<p>Bij Thimafer doorloopt elk project hetzelfde duidelijke traject: contact, opmeting, offerte, tekenwerk, productie, afwerking en montage.</p><p>Doordat we alles zelf doen, blijft de communicatie kort en de kwaliteit hoog.</p>" },
];

async function ensure(d) { await fs.mkdir(d, { recursive: true }); }
async function exists(p) { try { await fs.access(p); return true; } catch { return false; } }
function esc(s) { return String(s).replace(/'/g, "''"); }
function cleanName(s) { return s.replace(/[_]+/g, " ").replace(/\s+/g, " ").trim(); }

async function imagesIn(dir) {
  try {
    return (await fs.readdir(dir, { withFileTypes: true }))
      .filter((e) => e.isFile() && /\.(jpe?g|png)$/i.test(e.name))
      .map((e) => e.name)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch { return []; }
}
async function subdirs(dir) {
  try {
    return (await fs.readdir(dir, { withFileTypes: true }))
      .filter((e) => e.isDirectory() && !EXCLUDE.has(e.name))
      .map((e) => e.name)
      .sort();
  } catch { return []; }
}
// Recursively find folders that directly contain images.
async function collectProjects(absDir, acc = []) {
  const imgs = await imagesIn(absDir);
  if (imgs.length > 0) acc.push(absDir);
  for (const sub of await subdirs(absDir)) {
    await collectProjects(path.join(absDir, sub), acc);
  }
  return acc;
}

async function cover(src, dest) {
  await ensure(path.dirname(dest));
  await sharp(src).rotate().resize(1400, 1050, { fit: "cover", position: "attention" }).webp({ quality: 80 }).toFile(dest);
}
async function wide(src, dest) {
  await ensure(path.dirname(dest));
  await sharp(src).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(dest);
}

async function run() {
  const lines = [];
  lines.push("-- Auto-generated seed. Run scripts/build-realisaties.mjs.");
  lines.push("PRAGMA foreign_keys=OFF;");
  lines.push("DELETE FROM project_images;");
  lines.push("DELETE FROM projects;");
  lines.push("DELETE FROM categories;");
  lines.push("DELETE FROM posts;");

  CATEGORIES.forEach((c, i) => {
    lines.push(`INSERT INTO categories (id, slug, name, description, cover_image, sort_order, created_at) VALUES (${i + 1}, '${esc(c.slug)}', '${esc(c.name)}', '${esc(c.description)}', '/images/categories/${c.slug}.webp', ${i}, ${TS});`);
  });

  const usedSlugs = new Set();
  let projectId = 0;
  let imageId = 0;
  let totalImages = 0;

  for (let ci = 0; ci < CATEGORIES.length; ci++) {
    const cat = CATEGORIES[ci];
    let projectDirs = [];

    if (cat.slug === "fietsenstallingen") {
      const d = path.join(SRC, FIETSEN_REL);
      if (await exists(d)) projectDirs = [d];
    } else {
      for (const root of cat.roots) {
        const rootAbs = path.join(SRC, root);
        const found = await collectProjects(rootAbs);
        projectDirs.push(...found);
      }
      if (cat.slug === "staalconstructies") {
        projectDirs = projectDirs.filter((d) => !d.replace(/\\/g, "/").includes(FIETSEN_REL));
      }
    }

    let order = 0;
    for (const dir of projectDirs) {
      // Keep only good-quality (high enough resolution) photos.
      const all = await imagesIn(dir);
      const imgs = [];
      for (const name of all) {
        try {
          const meta = await sharp(path.join(dir, name)).metadata();
          if ((meta.width || 0) >= 900 && (meta.height || 0) >= 620) imgs.push(name);
        } catch {}
        if (imgs.length >= MAX) break;
      }
      if (imgs.length === 0) continue;
      const base = cleanName(path.basename(dir));
      let slug = baseSlug(base) || `project-${projectId + 1}`;
      let n = 2;
      while (usedSlugs.has(slug)) slug = `${baseSlug(base)}-${n++}`;
      usedSlugs.add(slug);

      projectId++;
      const outDir = path.join(PUB, cat.slug, slug);
      const coverUrl = `/images/realisaties/${cat.slug}/${slug}/cover.webp`;
      await cover(path.join(dir, imgs[0]), path.join(outDir, "cover.webp"));

      const title = base;
      const desc = cat.blurb;
      lines.push(`INSERT INTO projects (id, slug, title, category_id, location, year, description, cover_image, published, featured, sort_order, created_at, updated_at) VALUES (${projectId}, '${esc(slug)}', '${esc(title)}', ${ci + 1}, NULL, NULL, '${esc(desc)}', '${coverUrl}', 1, ${order === 0 ? 1 : 0}, ${order}, ${TS}, ${TS});`);

      for (let k = 0; k < imgs.length; k++) {
        const url = `/images/realisaties/${cat.slug}/${slug}/g-${k + 1}.webp`;
        await wide(path.join(dir, imgs[k]), path.join(outDir, `g-${k + 1}.webp`));
        imageId++;
        totalImages++;
        lines.push(`INSERT INTO project_images (id, project_id, url, alt, sort_order) VALUES (${imageId}, ${projectId}, '${url}', '${esc(title)}', ${k});`);
      }
      order++;
    }
    console.log(`${cat.slug}: ${projectDirs.length} projecten`);
  }

  POSTS.forEach((post, i) => {
    lines.push(`INSERT INTO posts (id, slug, title, excerpt, content, cover_image, published, published_at, created_at, updated_at) VALUES (${i + 1}, '${esc(post.slug)}', '${esc(post.title)}', '${esc(post.excerpt)}', '${esc(post.content)}', '${esc(post.cover)}', 1, ${TS + i * 86400}, ${TS}, ${TS});`);
  });

  lines.push("PRAGMA foreign_keys=ON;");
  await ensure(path.dirname(SEED));
  await fs.writeFile(SEED, lines.join("\n") + "\n", "utf8");
  console.log(`\nProjects: ${projectId} · Images: ${totalImages} · Posts: ${POSTS.length}`);
  console.log(`Seed → ${SEED}`);
}

run().catch((e) => { console.error(e); process.exit(1); });
