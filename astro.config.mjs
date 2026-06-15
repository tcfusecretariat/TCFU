import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || "https://www.tcfunesco.org",
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory"
  }
});
