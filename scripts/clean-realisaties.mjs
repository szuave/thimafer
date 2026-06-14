/**
 * Neutralises realisatie titles/slugs so NO client names or addresses are
 * exposed anywhere (titles, URLs, image folders, alt-text). Each project
 * gets a clean per-category name like "Stalen trap 01".
 *
 * - Renames the image folders on disk to match the new slug.
 * - Rewrites drizzle/seed.sql (slug, title, cover path, image url, alt).
 * Re-run the seed afterwards to apply to the database.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SEED = path.join(ROOT, "drizzle", "seed.sql");
const REAL = path.join(ROOT, "public", "images", "realisaties");

const CAT = {
  trappen: { prefix: "stalen-trap", label: "Stalen trap" },
  leuningen: { prefix: "stalen-leuning", label: "Stalen leuning" },
  poorten: { prefix: "stalen-poort", label: "Stalen poort" },
  fietsenstallingen: { prefix: "fietsenstalling", label: "Fietsenstalling" },
  staalconstructies: { prefix: "staalconstructie", label: "Staalconstructie" },
  gevelconstructies: { prefix: "gevelconstructie", label: "Gevelconstructie" },
  "stalen-schrijnwerk": { prefix: "stalen-schrijnwerk", label: "Stalen schrijnwerk" },
};

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

let text = fs.readFileSync(SEED, "utf8");
const lines = text.split("\n");

const counters = {};
const mapping = {}; // `${cat}/${oldslug}` -> { newslug, newtitle }
const renames = []; // { cat, oldslug, newslug }

const out = lines.map((line) => {
  // ---- project line ----
  if (line.startsWith("INSERT INTO projects")) {
    const m = line.match(/\/images\/realisaties\/([^/]+)\/([^/]+)\/cover\.webp/);
    if (!m) return line;
    const [, cat, oldslug] = m;
    const c = CAT[cat];
    if (!c) return line;
    counters[cat] = (counters[cat] || 0) + 1;
    const nn = String(counters[cat]).padStart(2, "0");
    const newslug = `${c.prefix}-${nn}`;
    const newtitle = `${c.label} ${nn}`;
    mapping[`${cat}/${oldslug}`] = { newslug, newtitle };
    renames.push({ cat, oldslug, newslug });

    let l = line;
    // slug field: 'oldslug',  ->  'newslug',
    l = l.replace(`'${oldslug}',`, `'${newslug}',`);
    // title field: anchored on the new slug
    l = l.replace(
      new RegExp(`(VALUES \\(\\d+, '${esc(newslug)}', ')(?:[^']|'')*(', )`),
      `$1${newtitle}$2`,
    );
    // cover path
    l = l.replace(
      `/images/realisaties/${cat}/${oldslug}/cover.webp`,
      `/images/realisaties/${cat}/${newslug}/cover.webp`,
    );
    return l;
  }

  // ---- image line ----
  if (line.startsWith("INSERT INTO project_images")) {
    const m = line.match(/\/images\/realisaties\/([^/]+)\/([^/]+)\//);
    if (!m) return line;
    const [, cat, oldslug] = m;
    const map = mapping[`${cat}/${oldslug}`];
    if (!map) return line;
    let l = line;
    l = l.replaceAll(
      `/images/realisaties/${cat}/${oldslug}/`,
      `/images/realisaties/${cat}/${map.newslug}/`,
    );
    // alt field (second-to-last) -> new title
    l = l.replace(/, '(?:[^']|'')*', (\d+)\);/, `, '${map.newtitle}', $1);`);
    return l;
  }

  return line;
});

fs.writeFileSync(SEED, out.join("\n"), "utf8");
console.log(`✓ seed.sql herschreven — ${renames.length} projecten geneutraliseerd`);

// ---- rename folders on disk ----
let renamed = 0;
for (const { cat, oldslug, newslug } of renames) {
  const from = path.join(REAL, cat, oldslug);
  const to = path.join(REAL, cat, newslug);
  if (fs.existsSync(from) && !fs.existsSync(to)) {
    fs.renameSync(from, to);
    renamed++;
  } else if (!fs.existsSync(from)) {
    console.warn(`! map ontbreekt: ${cat}/${oldslug}`);
  }
}
console.log(`✓ ${renamed} fotomappen hernoemd`);
