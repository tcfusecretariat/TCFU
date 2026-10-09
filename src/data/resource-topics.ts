import { fallbackResources, getResourceReaderTitle, isExcludedResource, resourceReaderTitles, type LibraryResource } from "./resources";
import { languages, type Locale } from "./site";

const LOCALES = Object.keys(languages) as Locale[];

export type ResourceStatus = "published" | "comingSoon" | "draft";

export type ResourceEdition = LibraryResource & {
  readerTitle: string;
  format: "PDF";
  bytes: number;
  external: boolean;
};

export type Localized<T> = Record<Locale, T>;

export type ResourceTopic = {
  slug: string;
  status: ResourceStatus;
  featured: boolean;
  publishDate: string;
  resourceType: Localized<string>;
  resourceTypeKey: "ebook" | "video" | "topic";
  title: Localized<string>;
  subtitle: Localized<string>;
  summary: Localized<string>;
  content: Localized<string>;
  coverImage: string;
  coverImageAlt: Localized<string>;
  keywords: Localized<string[]>;
  themes: Localized<string[]>;
  seoTitle: Localized<string>;
  seoDescription: Localized<string>;
  editionSlugs: string[];
};

export const QUNSHU_TOPIC_SLUG = "qunshu-zhiyao";
export const INCLUSIVE_EDUCATION_SLUG = "traditional-culture-inclusive-education";

const EDITION_BYTES: Record<string, number> = {
  "qunshu-zhiyao-360-zh": 2_856_338,
  "qunshu-zhiyao-es": 1_435_384,
  "qunshu-zhiyao-fr-vol1": 4_745_500,
  "qunshu-zhiyao-ja-vol3": 4_529_963
};

export const libraryHubCopy: Localized<{
  kicker: string;
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  searchSubmit: string;
  filterAll: string;
  filterEbook: string;
  filterVideo: string;
  language: string;
  theme: string;
  sort: string;
  sortNewest: string;
  readOnline: string;
  comingSoon: string;
  learnMore: string;
  seoTitle: string;
  seoDescription: string;
}> = {
  zh: {
    kicker: "RESOURCE CENTER",
    title: "文化資源中心",
    subtitle: "閱讀經典，聆聽智慧，探索傳統文化。",
    searchPlaceholder: "搜尋書名、講者或主題",
    searchSubmit: "搜尋",
    filterAll: "全部資源",
    filterEbook: "電子書",
    filterVideo: "影片",
    language: "語言",
    theme: "主題",
    sort: "最新發布",
    sortNewest: "最新發布",
    readOnline: "線上閱讀",
    comingSoon: "內容即將推出",
    learnMore: "瞭解更多",
    seoTitle: "文化資源中心",
    seoDescription: "閱讀經典，聆聽智慧，探索傳統文化。精選電子書與專題資源。"
  },
  en: {
    kicker: "RESOURCE CENTER",
    title: "Resource Center",
    subtitle: "Read the classics, encounter enduring wisdom, and explore traditional culture.",
    searchPlaceholder: "Search titles, speakers, or topics",
    searchSubmit: "Search",
    filterAll: "All resources",
    filterEbook: "eBooks",
    filterVideo: "Videos",
    language: "Language",
    theme: "Theme",
    sort: "Latest",
    sortNewest: "Latest",
    readOnline: "Read Online",
    comingSoon: "Coming Soon",
    learnMore: "Learn More",
    seoTitle: "Resource Center",
    seoDescription: "Read the classics, encounter enduring wisdom, and explore traditional culture."
  },
  fr: {
    kicker: "RESOURCE CENTER",
    title: "Centre de ressources",
    subtitle: "Lire les classiques, rencontrer une sagesse durable et explorer la culture traditionnelle.",
    searchPlaceholder: "Rechercher un titre, un intervenant ou un thème",
    searchSubmit: "Rechercher",
    filterAll: "Toutes les ressources",
    filterEbook: "Livres électroniques",
    filterVideo: "Vidéos",
    language: "Langue",
    theme: "Thème",
    sort: "Plus récent",
    sortNewest: "Plus récent",
    readOnline: "Lire en ligne",
    comingSoon: "Prochainement",
    learnMore: "En savoir plus",
    seoTitle: "Centre de ressources",
    seoDescription: "Lire les classiques, rencontrer une sagesse durable et explorer la culture traditionnelle."
  }
};

export const resourceTopicChrome: Localized<{
  home: string;
  hub: string;
  back: string;
  editions: string;
  format: string;
  size: string;
  read: string;
  download: string;
  external: string;
  prev: string;
  next: string;
}> = {
  zh: {
    home: "首頁",
    hub: "文化資源中心",
    back: "返回文化資源中心",
    editions: "語言版本",
    format: "格式",
    size: "檔案大小",
    read: "線上閱讀",
    download: "下載 PDF",
    external: "外部連結",
    prev: "上一頁",
    next: "下一頁"
  },
  en: {
    home: "Home",
    hub: "Resource Center",
    back: "Back to Resource Center",
    editions: "Language editions",
    format: "Format",
    size: "File size",
    read: "Read Online",
    download: "Download PDF",
    external: "External link",
    prev: "Previous",
    next: "Next"
  },
  fr: {
    home: "Accueil",
    hub: "Centre de ressources",
    back: "Retour au centre de ressources",
    editions: "Éditions linguistiques",
    format: "Format",
    size: "Taille du fichier",
    read: "Lire en ligne",
    download: "Télécharger le PDF",
    external: "Lien externe",
    prev: "Page précédente",
    next: "Page suivante"
  }
};

export const resourceTopics: ResourceTopic[] = [
  {
    slug: QUNSHU_TOPIC_SLUG,
    status: "published",
    featured: true,
    publishDate: "2024-06-15",
    resourceTypeKey: "ebook",
    resourceType: {
      zh: "多語言電子書",
      en: "Multilingual eBook",
      fr: "Livre électronique multilingue"
    },
    title: {
      zh: "群書治要",
      en: "The Governing Principles of Ancient China",
      fr: "Les Principes de Gouvernance de la Chine Ancienne"
    },
    subtitle: {
      zh: "",
      en: "",
      fr: ""
    },
    summary: {
      zh: "《群書治要》是基金會推動傳統智慧全球共享的重要出版與翻譯計劃。",
      en: "The Governing Principles of Ancient China is a flagship translation and publishing initiative for sharing classical wisdom globally.",
      fr: "Les Principes de Gouvernance de la Chine Ancienne constituent un projet phare de traduction et d’édition pour partager la sagesse classique à l’échelle mondiale."
    },
    content: {
      zh: "精選《群書治要》多語版本，提供線上閱讀與 PDF 下載，讓經典智慧以清晰、優雅的方式被更多讀者親近。",
      en: "Selected multilingual editions of The Governing Principles of Ancient China are available for online reading and PDF download.",
      fr: "Des éditions multilingues sélectionnées des principes de gouvernance de la chine ancienne sont disponibles en lecture en ligne et en téléchargement PDF."
    },
    coverImage: "/assets/resources/qunshu-zhiyao-cover.png",
    coverImageAlt: {
      zh: "《群書治要》線裝書封面",
      en: "Cover of The Governing Principles of Ancient China",
      fr: "Couverture des Principes de Gouvernance de la Chine Ancienne"
    },
    keywords: {
      zh: ["群書治要", "電子書", "經典", "翻譯"],
      en: ["Qunshu Zhiyao", "eBook", "classics", "translation"],
      fr: ["Qunshu Zhiyao", "livre électronique", "classiques", "traduction"]
    },
    themes: {
      zh: ["經典翻譯", "傳統智慧"],
      en: ["Classical translation", "Traditional wisdom"],
      fr: ["Traduction des classiques", "Sagesse traditionnelle"]
    },
    seoTitle: {
      zh: "群書治要",
      en: "The Governing Principles of Ancient China",
      fr: "Les Principes de Gouvernance de la Chine Ancienne"
    },
    seoDescription: {
      zh: "精選《群書治要》多語版本，提供線上閱讀與 PDF 下載，讓經典智慧以清晰、優雅的方式被更多讀者親近。",
      en: "Selected multilingual editions of The Governing Principles of Ancient China are available for online reading and PDF download.",
      fr: "Des éditions multilingues sélectionnées des principes de gouvernance de la chine ancienne sont disponibles en lecture en ligne et en téléchargement PDF."
    },
    editionSlugs: fallbackResources.en.map((item) => item.slug).filter((slug) => !isExcludedResource(slug))
  },
  {
    slug: INCLUSIVE_EDUCATION_SLUG,
    status: "comingSoon",
    featured: true,
    publishDate: "2026-10-08",
    resourceTypeKey: "topic",
    resourceType: {
      zh: "專題資源",
      en: "Thematic resource",
      fr: "Ressource thématique"
    },
    title: {
      zh: "傳統文化與全納教育",
      en: "Traditional Culture and Inclusive Education",
      fr: "Culture traditionnelle et éducation inclusive"
    },
    subtitle: {
      zh: "",
      en: "",
      fr: ""
    },
    summary: {
      zh: "以傳統文化滋養心靈，尊重每位學習者的差異，讓獨特潛能得以綻放。",
      en: "",
      fr: ""
    },
    content: {
      zh: "以傳統文化滋養心靈，尊重每位學習者的差異，讓獨特潛能得以綻放。",
      en: "",
      fr: ""
    },
    coverImage: "/assets/resources/inclusive-education-emblem.png",
    coverImageAlt: {
      zh: "啟動核心源動力",
      en: "Ignite the vital spark of the heart",
      fr: "Réveiller l’élan vital du cœur"
    },
    keywords: {
      zh: ["全納教育", "傳統文化", "教育"],
      en: ["inclusive education", "traditional culture", "education"],
      fr: ["éducation inclusive", "culture traditionnelle", "éducation"]
    },
    themes: {
      zh: ["教育"],
      en: ["Education"],
      fr: ["Éducation"]
    },
    seoTitle: {
      zh: "傳統文化與全納教育",
      en: "Traditional Culture and Inclusive Education",
      fr: "Culture traditionnelle et éducation inclusive"
    },
    seoDescription: {
      zh: "以傳統文化滋養心靈，尊重每位學習者的差異，讓獨特潛能得以綻放。",
      en: "Coming Soon",
      fr: "Prochainement"
    },
    editionSlugs: []
  }
];

export function visibleResourceTopics() {
  return resourceTopics.filter((topic) => topic.status !== "draft");
}

export function getResourceTopic(slug: string) {
  return resourceTopics.find((topic) => topic.slug === slug && topic.status !== "draft") || null;
}

export function topicHref(locale: Locale, slug: string) {
  return `/${locale}/library/${slug}/`;
}

export function libraryHref(locale: Locale) {
  return `/${locale}/library/`;
}

export function editionHref(locale: Locale, editionSlug: string) {
  return `/${locale}/library/${QUNSHU_TOPIC_SLUG}/#${editionSlug}`;
}

export function isQunshuEditionSlug(slug: string) {
  return slug.startsWith("qunshu-zhiyao-") && !isExcludedResource(slug);
}

function isExternalFile(file: string) {
  return /^https?:\/\//i.test(file) && !file.includes("traditionalculturefoundation.org");
}

export function editionsForTopic(locale: Locale, topic: ResourceTopic, extra: LibraryResource[] = []): ResourceEdition[] {
  const bySlug = new Map<string, LibraryResource>();
  for (const item of fallbackResources[locale]) {
    if (topic.editionSlugs.includes(item.slug) && !isExcludedResource(item.slug)) {
      bySlug.set(item.slug, item);
    }
  }
  if (topic.slug === QUNSHU_TOPIC_SLUG) {
    for (const item of extra) {
      if (isQunshuEditionSlug(item.slug)) bySlug.set(item.slug, item);
    }
  }

  return [...bySlug.values()].map((item) => ({
    ...item,
    readerTitle: getResourceReaderTitle(item.slug, item.title),
    format: "PDF" as const,
    bytes: EDITION_BYTES[item.slug] || 0,
    external: isExternalFile(item.file)
  }));
}

export function topicDisplaySubtitle(locale: Locale, topic: ResourceTopic) {
  const title = topic.title[locale]?.trim() || "";
  const subtitle = topic.subtitle[locale]?.trim() || "";
  if (!subtitle || subtitle === title) return "";
  return subtitle;
}

function localizedStrings(value: Localized<string> | Localized<string[]>) {
  return LOCALES.flatMap((locale) => {
    const entry = value[locale];
    return Array.isArray(entry) ? entry : entry ? [entry] : [];
  });
}

function resourceFileName(file: string) {
  const path = file.split(/[?#]/)[0];
  return path.split("/").filter(Boolean).pop() || file;
}

export function topicSearchBlob(_locale: Locale, topic: ResourceTopic) {
  const parts = [
    ...localizedStrings(topic.title),
    ...localizedStrings(topic.subtitle),
    ...localizedStrings(topic.summary),
    ...localizedStrings(topic.content),
    ...localizedStrings(topic.resourceType),
    ...localizedStrings(topic.keywords),
    ...localizedStrings(topic.themes),
    ...localizedStrings(topic.seoTitle),
    ...localizedStrings(topic.seoDescription),
    topic.slug
  ];

  if (topic.slug === QUNSHU_TOPIC_SLUG) {
    parts.push(...Object.values(resourceReaderTitles));
    const seen = new Set<string>();
    for (const locale of LOCALES) {
      for (const edition of editionsForTopic(locale, topic)) {
        if (seen.has(`${locale}:${edition.slug}`)) continue;
        seen.add(`${locale}:${edition.slug}`);
        parts.push(
          edition.slug,
          edition.title,
          edition.language,
          edition.description,
          edition.readerTitle,
          edition.file,
          resourceFileName(edition.file)
        );
      }
    }
  }

  return parts.filter(Boolean).join(" ").toLowerCase();
}
