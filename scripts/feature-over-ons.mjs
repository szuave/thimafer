import sharp from "sharp";
const src =
  "C:/Users/uidlo/Downloads/wetransfer_foto-s-web-site_2026-06-08_1747/Foto's Web-site/Stalen Binnen Trappen/Paard Van Troje/paard van troje (1) (Large).jpg";
await sharp(src).rotate().resize({ width: 1500 }).webp({ quality: 84 }).toFile("public/images/feature/over-ons.webp");
console.log("over-ons.webp written");
