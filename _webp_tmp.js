const sharp = require("sharp");
const path = require("path");
const dir = path.join(process.env.HOME, "Desktop/lovable-export-0bc23cc0/public/images");

const renders = [
  "render-bath-marble","render-bath-shower","render-bath-beige",
  "render-bedroom-light","render-bedroom-dark",
  "render-living-light","render-living-dark",
  "render-kitchen-living","render-kitchen-evening",
  "render-empty-kitchen-light","render-empty-kitchen-dark","render-empty-bedroom-dark",
];

(async () => {
  // HERO: 2 variante responsive
  const hero = path.join(dir, "IMG_3068.jpg");
  await sharp(hero).resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 72 }).toFile(path.join(dir, "hero-1920.webp"));
  await sharp(hero).resize({ width: 960, withoutEnlargement: true })
    .webp({ quality: 68 }).toFile(path.join(dir, "hero-960.webp"));

  // Randări -> webp (acelasi basename)
  for (const r of renders) {
    await sharp(path.join(dir, r + ".jpg"))
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 74 })
      .toFile(path.join(dir, r + ".webp"));
  }
  console.log("done");
})().catch(e => { console.error(e); process.exit(1); });
