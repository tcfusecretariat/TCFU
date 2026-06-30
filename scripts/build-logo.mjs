/**
 * Regenerate public/assets/tcf-logo.png from the source SVG:
 * - Recolor near-black emblem strokes to bronze palette
 * - Ensure English vector text uses champagne bronze
 * - Bilingual vector text (English + Chinese) lives in path2
 * - Transparent background (for ivory #fbfaf5 site canvas)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const svgIn = resolve(root, "public/assets/tcf-logo.svg");
const pngOut = resolve(root, "public/assets/tcf-logo.png");
const pngOutLegacy = resolve(root, "assets/tcf-logo.png");

const BRONZE_TEXT = "#8c704e";
const BRONZE_DETAIL = "#7a6248";

function buildLogoSvg(raw) {
  let svg = raw
    .replace(/fill:#1b1918/gi, `fill:${BRONZE_DETAIL}`)
    .replace(/fill:#161911/gi, `fill:${BRONZE_TEXT}`)
    .replace(/pagecolor="#ffffff"/, 'pagecolor="none"');

  // Keep original viewBox — bilingual vector text lives in path2.
  return svg
}

const rawSvg = readFileSync(svgIn, "utf8");
const logoSvg = buildLogoSvg(rawSvg);

const pngBuffer = await sharp(Buffer.from(logoSvg), { density: 300 })
  .resize({ width: 980 })
  .png()
  .toBuffer();

writeFileSync(pngOut, pngBuffer);
writeFileSync(pngOutLegacy, pngBuffer);

// Keep SVG source colors in sync for direct SVG consumers.
writeFileSync(svgIn, buildLogoSvg(rawSvg));
writeFileSync(resolve(root, "assets/tcf-logo.svg"), readFileSync(svgIn, "utf8"));

console.log("Wrote", pngOut, `(${pngBuffer.length} bytes)`);
