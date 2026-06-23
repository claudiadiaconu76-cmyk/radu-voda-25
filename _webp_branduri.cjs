const sharp = require("sharp");
const path = require("path");
const src = path.join(process.env.HOME, "Desktop/pexels-karola-g-4977410.jpg");
const out = path.join(process.env.HOME, "Desktop/lovable-export-0bc23cc0/public/images/material-branduri.webp");

sharp(src)
  .resize({ width: 1000, height: 750, fit: "cover", position: "centre", withoutEnlargement: true })
  .webp({ quality: 72 })
  .toFile(out)
  .then(() => console.log("done"))
  .catch(e => { console.error(e); process.exit(1); });
