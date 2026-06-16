import { fetchOptional, sanityApiUrl } from "@lib/sanity";
import { latestNewsQuery, newsDetailQuery, newsSummaryQuery } from "@lib/sanity-queries";
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
  return fetchOptional<NewsSummary[]>(latestNewsQuery, { locale, limit }, []);
}

export async function getAllNews(locale: Locale) {
  return fetchOptional<NewsSummary[]>(newsSummaryQuery, { locale }, []);
}

export async function getNewsBySlug(locale: Locale, slug: string) {
  return fetchOptional<NewsDetail | null>(newsDetailQuery, { locale, slug }, null);
}

export function getLatestNewsApiUrl(locale: Locale, limit = 3) {
  return sanityApiUrl(latestNewsQuery, { locale, limit });
}

export function getAllNewsApiUrl(locale: Locale) {
  return sanityApiUrl(newsSummaryQuery, { locale });
}

export function getNewsBySlugApiUrl(locale: Locale, slug: string) {
  return sanityApiUrl(newsDetailQuery, { locale, slug });
}
