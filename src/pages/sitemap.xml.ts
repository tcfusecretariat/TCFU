import type { APIRoute } from "astro";
import { languages, type Locale } from "@data/site";

const pageSlugs = ["", "about", "contact", "support", "privacy-policy", "legal-notice", "accessibility", "news", "library"];

export const GET: APIRoute = ({ site }) => {
  const origin = site?.toString().replace(/\/$/, "") || "https://traditionalculturefoundation.org";
  const urls = Object.keys(languages).flatMap((locale) =>
    pageSlugs.map((slug) => {
      const path = `/${locale}/${slug ? `${slug}/` : ""}`;
      const alternates = Object.keys(languages)
        .map((lang) => `<xhtml:link rel="alternate" hreflang="${languages[lang as Locale].lang}" href="${origin}/${lang}/${slug ? `${slug}/` : ""}" />`)
        .join("");
      return `<url><loc>${origin}${path}</loc>${alternates}</url>`;
    })
  );

  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
};
