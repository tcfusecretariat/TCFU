/**
 * Logo processor: white JPEG background → transparent PNG for ivory (#fbfaf5) site.
 * Pass 1: near-white (≥248) → transparent.
 * Pass 2: low-saturation gray fringe (JPEG artefact) → transparent.
 * Does not touch taupe emblem fill (min channel typically ≤220).
 */
import sharp from "sharp";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

const source = process.argv[2];
const dest = resolve(repoRoot, "public/assets/tcf-logo.png");
const WHITE_THRESHOLD = 248;
const FRINGE_MIN = 238;
const FRINGE_CHROMA = 15;

if (!source) {
  console.error("Usage: node scripts/process-logo.mjs <source-image>");
  process.exit(1);
}

const { data, info } = await sharp(source)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const pixels = new Uint8Array(data);
let whiteRemoved = 0;
let fringeRemoved = 0;

for (let i = 0; i < pixels.length; i += 4) {
  const r = pixels[i];
  const g = pixels[i + 1];
  const b = pixels[i + 2];
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (r >= WHITE_THRESHOLD && g >= WHITE_THRESHOLD && b >= WHITE_THRESHOLD) {
    pixels[i + 3] = 0;
    whiteRemoved++;
    continue;
  }

  if (min >= FRINGE_MIN && max - min <= FRINGE_CHROMA) {
    pixels[i + 3] = 0;
    fringeRemoved++;
  }
}

await sharp(pixels, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .trim({ threshold: 1 })
  .png({ compressionLevel: 9, palette: false })
  .toFile(dest);

const meta = await sharp(dest).metadata();
console.log(`Source: ${source}`);
console.log(`Input: ${info.width}x${info.height}`);
console.log(`Output: ${meta.width}x${meta.height}`);
console.log(`White→transparent: ${whiteRemoved}`);
console.log(`Fringe→transparent: ${fringeRemoved}`);
console.log(`Wrote: ${dest}`);
