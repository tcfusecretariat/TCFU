/**
 * Regenerate public/assets/tcf-logo.svg (+ PNG fallback) from the Illustrator source:
 * - Export embedded PDF artboard via PyMuPDF (scripts/export-ai-logo.py)
 * - Recolor near-black text/emblem strokes to site bronze palette
 * - Bilingual vector art (English Baskerville + Chinese calligraphy paths)
 * - Transparent background for ivory #fbfaf5 site canvas
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

const SOURCE_EXTERNAL = "/Users/pahdwfb/Documents/tcfu_logo_v1 .ai";
const sourceInRepo = resolve(root, "scripts/sources/tcfu_logo_v1.ai");
const venvPython = resolve(root, ".venv-logo/bin/python");
const exportScript = resolve(root, "scripts/export-ai-logo.py");
const rawSvgPath = resolve(root, "tmp-preview/tcf-logo-raw.svg");

const svgOut = resolve(root, "public/assets/tcf-logo.svg");
const pngOut = resolve(root, "public/assets/tcf-logo.png");
const pngOutLegacy = resolve(root, "assets/tcf-logo.png");
const svgOutLegacy = resolve(root, "assets/tcf-logo.svg");

const BRONZE_TEXT = "#8c704e";
const BRONZE_DETAIL = "#7a6248";
const BRONZE_EMBLEM = "#9f8171";

function ensureSource() {
  mkdirSync(dirname(sourceInRepo), { recursive: true });
  if (!existsSync(sourceInRepo)) {
    if (!existsSync(SOURCE_EXTERNAL)) {
      throw new Error(
        `Logo source missing. Expected ${SOURCE_EXTERNAL} or ${sourceInRepo}`,
      );
    }
    copyFileSync(SOURCE_EXTERNAL, sourceInRepo);
    console.log("Copied Illustrator source to", sourceInRepo);
  }
  return sourceInRepo;
}

function exportFromAi(source) {
  if (!existsSync(venvPython)) {
    throw new Error(
      "Missing .venv-logo. Run: python3 -m venv .venv-logo && .venv-logo/bin/pip install pymupdf",
    );
  }

  mkdirSync(dirname(rawSvgPath), { recursive: true });
  execFileSync(venvPython, [exportScript, source, rawSvgPath, "--scale", "1"], {
    stdio: "inherit",
  });
  return readFileSync(rawSvgPath, "utf8");
}

function buildLogoSvg(raw) {
  return (
    raw
      // English letterforms exported as near-black fills
      .replace(/fill="#2c292a"/gi, `fill="${BRONZE_TEXT}"`)
      .replace(/fill="#2c2523"/gi, `fill="${BRONZE_DETAIL}"`)
      .replace(/fill="#1b1918"/gi, `fill="${BRONZE_DETAIL}"`)
      .replace(/fill="#161911"/gi, `fill="${BRONZE_TEXT}"`)
      // Emblem bronze from Illustrator proof PDF
      .replace(/fill="#9f8171"/gi, `fill="${BRONZE_EMBLEM}"`)
      .replace(/pagecolor="#ffffff"/, 'pagecolor="none"')
      .replace(/<g clip-path="url\(#clip_1\)">/, "<g>")
      .replace(/<clipPath id="clip_1">[\s\S]*?<\/clipPath>\s*/m, "")
      // Modern browsers expect href; keep xlink for older SVG viewers
      .replace(/xlink:href="/g, 'href="')
  );
}

ensureSource();
const rawSvg = exportFromAi(sourceInRepo);
const logoSvg = buildLogoSvg(rawSvg);

writeFileSync(svgOut, logoSvg);
writeFileSync(svgOutLegacy, logoSvg);

const PNG_WIDTH = 2048;

const pngBuffer = await sharp(Buffer.from(logoSvg), { density: 300 })
  .resize({ width: PNG_WIDTH })
  .png()
  .toBuffer();

writeFileSync(pngOut, pngBuffer);
writeFileSync(pngOutLegacy, pngBuffer);

console.log("Wrote", svgOut);
console.log("Wrote", pngOut, `(${pngBuffer.length} bytes)`);
