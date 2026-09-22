import { fallbackNews } from "@data/news-articles";
import { fetchOptional, sanityApiUrl } from "@lib/sanity";
import { latestNewsQuery, newsDetailQuery, newsSummaryQuery } from "@lib/sanity-queries";
import type { Locale } from "@data/site";

export type NewsBanner = {
  kicker?: string;
  title?: string;
  meta?: string;
  tags?: string;
  aside?: string;
};

export type NewsSummary = {
  title: string;
  slug: string;
  category?: string;
  publishDate?: string;
  summary?: string;
  subtitle?: string;
  breadcrumbLabel?: string;
  location?: string;
  eventDateLabel?: string;
  editorialBanner?: NewsBanner;
  seoTitle?: string;
  seoDescription?: string;
};

export type NewsDetail = NewsSummary & {
  body?: unknown[];
  videoUrl?: string;
  pdfUrl?: string;
  pdfSize?: number;
  pdfLabel?: string;
};

function byNewest(a: NewsSummary, b: NewsSummary) {
  return Date.parse(b.publishDate || "") - Date.parse(a.publishDate || "");
}

function mergeNews<T extends NewsSummary>(locale: Locale, sanityItems: T[]): T[] {
  const merged = new Map<string, T>();
  for (const article of fallbackNews[locale] as T[]) {
    merged.set(article.slug, article);
  }
  for (const article of sanityItems) {
    const fallback = merged.get(article.slug);
    merged.set(article.slug, fallback ? { ...fallback, ...article } : article);
  }
  return [...merged.values()].sort(byNewest);
}

export async function getLatestNews(locale: Locale, limit = 3) {
  const sanity = await fetchOptional<NewsSummary[]>(latestNewsQuery, { locale, limit }, []);
  return mergeNews(locale, sanity).slice(0, limit);
}

export async function getAllNews(locale: Locale) {
  const sanity = await fetchOptional<NewsSummary[]>(newsSummaryQuery, { locale }, []);
  return mergeNews(locale, sanity);
}

export async function getNewsBySlug(locale: Locale, slug: string) {
  const sanity = await fetchOptional<NewsDetail | null>(newsDetailQuery, { locale, slug }, null);
  const fallback = fallbackNews[locale].find((article) => article.slug === slug) || null;
  if (sanity && fallback) return { ...fallback, ...sanity };
  return sanity || fallback;
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

export function formatNewsDate(value: string | undefined, locale: Locale) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  if (locale === "zh") {
    return `${date.getUTCFullYear()}年${date.getUTCMonth() + 1}月${date.getUTCDate()}日`;
  }
  return date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  });
}

export function formatPdfSize(bytes?: number) {
  if (!bytes || bytes <= 0) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function newsListTitle(title: string) {
  return title.replace(/\s*\n\s*/g, " ").replace(/\s+/g, " ").trim();
}
