import { fallbackResources } from "@data/resources";
import { siteSettings as fallbackSiteSettings, type Locale } from "@data/site";
import { fetchOptional, imageUrl } from "@lib/sanity";

type ImageValue = {
  alt?: string;
  asset?: unknown;
};

export type CmsSummary = {
  title: string;
  slug: string;
  language?: Locale;
  category?: string;
  date?: string;
  location?: string;
  summary?: string;
  description?: string;
  coverImage?: ImageValue;
  poster?: ImageValue;
  thumbnail?: ImageValue;
  seoTitle?: string;
  seoDescription?: string;
};

export type CmsDetail = CmsSummary & {
  body?: unknown[];
  gallery?: ImageValue[];
  videoUrl?: string;
  youtubeUrl?: string;
  vimeoUrl?: string;
  bilibiliUrl?: string;
  transcript?: string;
  registrationUrl?: string;
  fileUrl?: string;
  externalUrl?: string;
  files?: { url?: string; originalFilename?: string }[];
};

export type Partner = {
  name: string;
  website?: string;
  description?: string;
  logo?: ImageValue;
};

export type ResolvedSiteSettings = typeof fallbackSiteSettings & {
  footer?: string;
  phone?: string;
  address?: string;
  socialLinks: { label: string; url: string }[];
};

const order = "order(isFeatured desc, sortOrder asc, coalesce(publishDate, date, _createdAt) desc)";

const typeConfig = {
  event: {
    type: "event",
    title: "eventName",
    date: "date",
    extra: "location, registrationUrl, description, poster, gallery, videoUrl: video, files[]{\"url\": asset->url, \"originalFilename\": asset->originalFilename}"
  },
  project: {
    type: "project",
    title: "title",
    date: "_createdAt",
    extra: "summary, coverImage, body, gallery, seoTitle, seoDescription"
  },
  resource: {
    type: "resource",
    title: "title",
    date: "_createdAt",
    extra: "description, coverImage, externalUrl, \"fileUrl\": file.asset->url, seoTitle, seoDescription"
  },
  video: {
    type: "video",
    title: "title",
    date: "_createdAt",
    extra: "thumbnail, youtubeUrl, vimeoUrl, bilibiliUrl, transcript, seoTitle, seoDescription"
  }
} as const;

type CmsKind = keyof typeof typeConfig;

function summaryQuery(kind: CmsKind, range = "") {
  const config = typeConfig[kind];
  return `*[_type == "${config.type}" && language == $locale && isHidden != true] | ${order}${range}{
    "${"title"}": ${config.title},
    "slug": slug.current,
    language,
    "date": ${config.date},
    ${config.extra}
  }`;
}

function detailQuery(kind: CmsKind) {
  const config = typeConfig[kind];
  return `*[_type == "${config.type}" && language == $locale && slug.current == $slug && isHidden != true][0]{
    "${"title"}": ${config.title},
    "slug": slug.current,
    language,
    "date": ${config.date},
    ${config.extra}
  }`;
}

export function imageSrc(image?: ImageValue, width = 1200) {
  if (!image) return "";
  try {
    return imageUrl(image).width(width).auto("format").fit("max").url();
  } catch {
    return "";
  }
}

export async function getItems(kind: CmsKind, locale: Locale, limit?: number) {
  const range = typeof limit === "number" ? `[0...${limit}]` : "";
  return fetchOptional<CmsSummary[]>(summaryQuery(kind, range), { locale }, []);
}

export async function getItem(kind: CmsKind, locale: Locale, slug: string) {
  return fetchOptional<CmsDetail | null>(detailQuery(kind), { locale, slug }, null);
}

export async function getPartners() {
  return fetchOptional<Partner[]>(
    `*[_type == "partner"] | order(name asc){
      name,
      website,
      description,
      logo
    }`,
    {},
    []
  );
}

export async function getSiteSettings(): Promise<ResolvedSiteSettings> {
  const data = await fetchOptional<{
    logoUrl?: string;
    logoAlt?: string;
    footer?: string;
    socialLinks?: { label?: string; url?: string }[];
    contactInformation?: { email?: string; phone?: string; address?: string };
  } | null>(
    `*[_type == "siteSettings"][0]{
      "logoUrl": logo.asset->url,
      "logoAlt": logo.alt,
      footer,
      socialLinks,
      contactInformation
    }`,
    {},
    null
  );

  const socialLinks = [
    ...(data?.socialLinks || []).filter((item): item is { label: string; url: string } => Boolean(item.label && item.url)),
    { label: "YouTube", url: "https://www.youtube.com/@Traditional_Culture_Foundation" },
    { label: "Instagram", url: "https://www.instagram.com/traditionalculture.foundation" }
  ];

  return {
    ...fallbackSiteSettings,
    logo: data?.logoUrl || fallbackSiteSettings.logo,
    name: data?.logoAlt || fallbackSiteSettings.name,
    email: data?.contactInformation?.email || fallbackSiteSettings.email,
    footer: data?.footer,
    phone: data?.contactInformation?.phone,
    address: data?.contactInformation?.address,
    socialLinks
  };
}

export async function getResources(locale: Locale) {
  const sanityResources = await getItems("resource", locale);
  if (sanityResources.length > 0) {
    return sanityResources.map((resource) => ({
      slug: resource.slug,
      title: resource.title,
      language: resource.language || locale,
      description: resource.description || "",
      file: (resource as CmsDetail).fileUrl || ""
    })).filter((resource) => resource.file);
  }

  return fallbackResources[locale];
}

export async function getResourceItem(locale: Locale, slug: string) {
  const sanityResource = await getItem("resource", locale, slug);
  if (sanityResource) return sanityResource;

  const fallback = fallbackResources[locale].find((resource) => resource.slug === slug);
  if (!fallback) return null;

  return {
    title: fallback.title,
    slug: fallback.slug,
    language: locale,
    description: fallback.description,
    fileUrl: fallback.file
  } satisfies CmsDetail;
}
