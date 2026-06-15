import { fetchOptional } from "@lib/sanity";
import type { Locale } from "@data/site";

export type NewsSummary = {
  title: string;
  slug: string;
  category?: string;
  publishDate?: string;
  summary?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type NewsDetail = NewsSummary & {
  body?: unknown[];
  videoUrl?: string;
  pdfUrl?: string;
};

export async function getLatestNews(locale: Locale, limit = 3) {
  return fetchOptional<NewsSummary[]>(
    `*[_type == "news" && language == $locale && isHidden != true] | order(isFeatured desc, sortOrder asc, publishDate desc)[0...$limit]{
      title,
      "slug": slug.current,
      category,
      publishDate,
      summary,
      seoTitle,
      seoDescription
    }`,
    { locale, limit },
    []
  );
}

export async function getAllNews(locale: Locale) {
  return fetchOptional<NewsSummary[]>(
    `*[_type == "news" && language == $locale && isHidden != true] | order(isFeatured desc, sortOrder asc, publishDate desc){
      title,
      "slug": slug.current,
      category,
      publishDate,
      summary,
      seoTitle,
      seoDescription
    }`,
    { locale },
    []
  );
}

export async function getNewsBySlug(locale: Locale, slug: string) {
  return fetchOptional<NewsDetail | null>(
    `*[_type == "news" && language == $locale && slug.current == $slug && isHidden != true][0]{
      title,
      "slug": slug.current,
      category,
      publishDate,
      summary,
      body,
      videoUrl,
      "pdfUrl": pdfAttachment.asset->url,
      seoTitle,
      seoDescription
    }`,
    { locale, slug },
    null
  );
}
