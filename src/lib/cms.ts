import { fallbackResources, getResourceReaderTitle, isExcludedResource } from "@data/resources";
import { content } from "@data/content";
import { siteSettings as fallbackSiteSettings, defaultLocale, type Locale } from "@data/site";
import { fetchOptional, imageUrl, sanityApiUrl } from "@lib/sanity";
import { resourcesSummaryQuery } from "@lib/sanity-queries";
import { normalizeZhCopy, stripRocMentions } from "@lib/zh-copy";

function zhText(locale: Locale, text: string): string {
  return locale === "zh" ? normalizeZhCopy(text) : text;
}

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
  time?: string;
  organizers?: string;
  isRegistrationOpen?: boolean;
  videoUrl?: string;
  youtubeUrl?: string;
  vimeoUrl?: string;
  bilibiliUrl?: string;
  wechatUrl?: string;
  tencentUrl?: string;
  transcript?: string;
  registrationUrl?: string;
  fileUrl?: string;
  programmePdfUrl?: string;
  externalUrl?: string;
  files?: { url?: string; originalFilename?: string }[];
};

export type Partner = {
  name: string;
  website?: string;
  description?: string;
  type?: string;
  logo?: ImageValue;
};

export type ResolvedSiteSettings = typeof fallbackSiteSettings & {
  footer?: string;
  phone?: string;
  address?: string;
  googleMapUrl?: string;
  siteTitle?: string;
  socialLinks: { label: string; url: string }[];
};

const order = "order(isFeatured desc, sortOrder asc, coalesce(publishDate, date, _createdAt) desc)";

const typeConfig = {
  event: {
    type: "event",
    title: "eventName",
    date: "date",
    extra:
      'location, time, organizers, registrationUrl, isRegistrationOpen, description, body, poster, gallery, "videoUrl": video, "programmePdfUrl": programmePdf.asset->url, files[]{"url": asset->url, "originalFilename": asset->originalFilename}, seoTitle, seoDescription'
  },
  project: {
    type: "project",
    title: "title",
    date: "_createdAt",
    extra: "category, summary, coverImage, body, gallery, seoTitle, seoDescription"
  },
  resource: {
    type: "resource",
    title: "title",
    date: "_createdAt",
    extra: 'type, category, description, coverImage, externalUrl, "fileUrl": file.asset->url, seoTitle, seoDescription'
  },
  video: {
    type: "video",
    title: "title",
    date: "eventDate",
    extra:
      "description, thumbnail, youtubeUrl, vimeoUrl, bilibiliUrl, wechatUrl, tencentUrl, transcript, seoTitle, seoDescription"
  }
} as const;

type CmsKind = keyof typeof typeConfig;

function summaryQuery(kind: CmsKind, range = "") {
  const config = typeConfig[kind];
  return `*[_type == "${config.type}" && language == $locale && isHidden != true] | ${order}${range}{
    "title": ${config.title},
    "slug": slug.current,
    language,
    "date": ${config.date},
    ${config.extra}
  }`;
}

function detailQuery(kind: CmsKind) {
  const config = typeConfig[kind];
  return `*[_type == "${config.type}" && language == $locale && slug.current == $slug && isHidden != true][0]{
    "title": ${config.title},
    "slug": slug.current,
    language,
    "date": ${config.date},
    ${config.extra}
  }`;
}

export function imageSrc(image?: ImageValue, width = 1200) {
  if (!image || !image.asset) return "";
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
    `*[_type == "partner" && isFeatured != false] | order(sortOrder asc, name asc){
      name,
      website,
      description,
      type,
      logo
    }`,
    {},
    []
  );
}

export async function getSiteSettings(locale: Locale = defaultLocale): Promise<ResolvedSiteSettings> {
  const data = await fetchOptional<{
    logoAlt?: string;
    foundationName?: string;
    siteTitleZh?: string;
    siteTitleEn?: string;
    siteTitleFr?: string;
    footer?: string;
    contactEmail?: string;
    phone?: string;
    address?: string;
    googleMapUrl?: string;
    youtubeUrl?: string;
    instagramUrl?: string;
    helloAssoUrl?: string;
  } | null>(
    `*[_type == "siteSettings"][0]{
      "logoAlt": logo.alt,
      foundationName,
      siteTitleZh,
      siteTitleEn,
      siteTitleFr,
      footer,
      contactEmail,
      phone,
      address,
      googleMapUrl,
      youtubeUrl,
      instagramUrl,
      helloAssoUrl
    }`,
    {},
    null
  );

  const socialLinks = [
    ...(data?.youtubeUrl ? [{ label: "YouTube", url: data.youtubeUrl }] : []),
    ...(data?.instagramUrl ? [{ label: "Instagram", url: data.instagramUrl }] : [])
  ];

  if (socialLinks.length === 0) {
    socialLinks.push(
      { label: "YouTube", url: "https://www.youtube.com/@Traditional_Culture_Foundation" },
      { label: "Instagram", url: "https://www.instagram.com/traditionalculture.foundation" }
    );
  }

  const siteTitle =
    locale === "en" ? data?.siteTitleEn : locale === "fr" ? data?.siteTitleFr : data?.siteTitleZh;

  const footerRaw = data?.footer;
  const footer =
    footerRaw && !/教育部標準楷書|本網站中文頁面字體/.test(footerRaw)
      ? locale === "zh"
        ? normalizeZhCopy(footerRaw)
        : stripRocMentions(footerRaw)
      : undefined;

  return {
    ...fallbackSiteSettings,
    // Logo is always the versioned local SVG (see npm run build:logo).
    logo: fallbackSiteSettings.logo,
    name: data?.foundationName || data?.logoAlt || fallbackSiteSettings.name,
    email: data?.contactEmail || fallbackSiteSettings.email,
    helloAssoUrl: data?.helloAssoUrl || fallbackSiteSettings.helloAssoUrl,
    footer,
    phone: data?.phone,
    address: data?.address,
    googleMapUrl: data?.googleMapUrl,
    siteTitle: siteTitle || undefined,
    socialLinks
  };
}

export async function getResources(locale: Locale) {
  const sanityResources = await getItems("resource", locale);
  const withReaderTitle = (resource: {
    slug: string;
    title: string;
    language: string;
    description: string;
    file: string;
  }) => ({
    ...resource,
    readerTitle: getResourceReaderTitle(resource.slug, resource.title)
  });

  const mappedSanity = sanityResources
    .map((resource) => ({
      slug: resource.slug,
      title: resource.title,
      language: resource.language || locale,
      description: resource.description || "",
      file: (resource as CmsDetail).fileUrl || (resource as CmsDetail).externalUrl || ""
    }))
    .filter((resource) => resource.file && !isExcludedResource(resource.slug))
    .map(withReaderTitle);

  if (mappedSanity.length === 0) {
    return fallbackResources[locale].filter((r) => !isExcludedResource(r.slug)).map(withReaderTitle);
  }

  const seen = new Set(mappedSanity.map((resource) => resource.slug));
  const merged = [...mappedSanity];

  for (const resource of fallbackResources[locale]) {
    if (!seen.has(resource.slug) && !isExcludedResource(resource.slug)) {
      merged.push(withReaderTitle(resource));
    }
  }

  return merged.filter((resource) => !isExcludedResource(resource.slug));
}

export function getResourcesApiUrl(locale: Locale) {
  return sanityApiUrl(resourcesSummaryQuery, { locale });
}

export async function getResourceItem(locale: Locale, slug: string) {
  if (isExcludedResource(slug)) return null;

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

export type PageContent = {
  title?: string;
  coverImage?: ImageValue;
  body?: unknown[];
  seoTitle?: string;
  seoDescription?: string;
};

export async function getPage(pageKey: string, locale: Locale) {
  return fetchOptional<PageContent | null>(
    `*[_type == "page" && pageKey == $pageKey && language == $locale && isHidden != true][0]{
      title,
      coverImage,
      body,
      seoTitle,
      seoDescription
    }`,
    { pageKey, locale },
    null
  );
}

type HomeDoc = {
  heroTitle?: string;
  heroSubtitle?: string;
  heroPrimaryCtaText?: string;
  heroPrimaryCtaUrl?: string;
  heroSecondaryCtaText?: string;
  heroSecondaryCtaUrl?: string;
  showPhilosophy?: boolean;
  philosophyKicker?: string;
  philosophyTitle?: string;
  philosophyParagraphs?: string[];
  showWork?: boolean;
  workKicker?: string;
  workTitle?: string;
  workPillars?: { title?: string; subtitle?: string }[];
  showProjects?: boolean;
  projectsKicker?: string;
  projectsTitle?: string;
  showLibrary?: boolean;
  libraryKicker?: string;
  libraryTitle?: string;
  libraryDescription?: string;
  libraryLanguages?: string[];
  showEvent?: boolean;
  eventKicker?: string;
  eventTitle?: string;
  eventDescription?: string;
  eventLinkText?: string;
  eventLinkUrl?: string;
  showNews?: boolean;
  newsKicker?: string;
  newsTitle?: string;
  showSupport?: boolean;
  supportKicker?: string;
  supportTitle?: string;
  supportItems?: string[];
  supportCtaText?: string;
  showPartners?: boolean;
};

const showDefault = (value: boolean | undefined) => value !== false;

export async function getHomeContent(locale: Locale) {
  const fallback = content[locale];
  const doc = await fetchOptional<HomeDoc | null>(
    `*[_type == "homePage" && language == $locale][0]{
      heroTitle, heroSubtitle, heroPrimaryCtaText, heroPrimaryCtaUrl, heroSecondaryCtaText, heroSecondaryCtaUrl,
      showPhilosophy, philosophyKicker, philosophyTitle, philosophyParagraphs,
      showWork, workKicker, workTitle, workPillars,
      showProjects, projectsKicker, projectsTitle,
      showLibrary, libraryKicker, libraryTitle, libraryDescription, libraryLanguages,
      showEvent, eventKicker, eventTitle, eventDescription, eventLinkText, eventLinkUrl,
      showNews, newsKicker, newsTitle,
      showSupport, supportKicker, supportTitle, supportItems, supportCtaText,
      showPartners
    }`,
    { locale },
    null
  );

  return {
    hero: {
      title: doc?.heroTitle ? zhText(locale, doc.heroTitle) : undefined,
      description: zhText(locale, doc?.heroSubtitle || fallback.hero.description),
      primaryCta: doc?.heroPrimaryCtaText || fallback.hero.primaryCta,
      primaryCtaUrl: doc?.heroPrimaryCtaUrl || `/${locale}/#about`,
      secondaryCta: doc?.heroSecondaryCtaText || fallback.hero.secondaryCta,
      secondaryCtaUrl: doc?.heroSecondaryCtaUrl || `/${locale}/#library`,
      translations: fallback.hero.translations
    },
    philosophy: {
      kicker: zhText(locale, doc?.philosophyKicker || fallback.sections.philosophy.kicker),
      title: zhText(locale, doc?.philosophyTitle || fallback.sections.philosophy.title),
      paragraphs: doc?.philosophyParagraphs?.length
        ? doc.philosophyParagraphs.map((paragraph) => zhText(locale, paragraph))
        : fallback.sections.philosophy.paragraphs
    },
    work: {
      kicker: zhText(locale, doc?.workKicker || fallback.sections.work.kicker),
      title: zhText(locale, doc?.workTitle || fallback.sections.work.title),
      pillars: doc?.workPillars?.length
        ? doc.workPillars.map((pillar) => ({
            title: zhText(locale, pillar.title || ""),
            subtitle: locale === "en" ? "" : pillar.subtitle || ""
          }))
        : fallback.sections.work.pillars
    },
    projects: {
      kicker: zhText(locale, doc?.projectsKicker || fallback.sections.projects.kicker),
      title: zhText(locale, doc?.projectsTitle || fallback.sections.projects.title)
    },
    library: {
      kicker: zhText(locale, doc?.libraryKicker || fallback.sections.library.kicker),
      title: zhText(locale, doc?.libraryTitle || fallback.sections.library.title),
      description: zhText(locale, doc?.libraryDescription || fallback.sections.library.description),
      languages: doc?.libraryLanguages?.length ? doc.libraryLanguages : fallback.sections.library.languages
    },
    event: {
      kicker: zhText(locale, doc?.eventKicker || fallback.sections.event.kicker),
      title: zhText(locale, doc?.eventTitle || fallback.sections.event.title),
      description: zhText(locale, doc?.eventDescription || fallback.sections.event.description),
      link: zhText(locale, doc?.eventLinkText || fallback.sections.event.link),
      linkUrl: doc?.eventLinkUrl || "/assets/events/international-peace-conference-2025-programme.pdf"
    },
    news: {
      kicker: zhText(locale, doc?.newsKicker || fallback.sections.news.kicker),
      title: zhText(locale, doc?.newsTitle || fallback.sections.news.title)
    },
    support: {
      kicker: zhText(locale, doc?.supportKicker || fallback.sections.support.kicker),
      title: zhText(locale, doc?.supportTitle || fallback.sections.support.title),
      items: doc?.supportItems?.length
        ? doc.supportItems.map((item) => zhText(locale, item))
        : fallback.sections.support.items,
      cta: zhText(locale, doc?.supportCtaText || fallback.sections.support.cta)
    },
    show: {
      philosophy: showDefault(doc?.showPhilosophy),
      work: showDefault(doc?.showWork),
      projects: showDefault(doc?.showProjects),
      library: showDefault(doc?.showLibrary),
      event: showDefault(doc?.showEvent),
      news: showDefault(doc?.showNews),
      support: showDefault(doc?.showSupport),
      partners: showDefault(doc?.showPartners)
    }
  };
}
