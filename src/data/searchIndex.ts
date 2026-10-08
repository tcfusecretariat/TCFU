import { fallbackResources, getResourceReaderTitle, isExcludedResource } from "./resources";
import {
  QUNSHU_TOPIC_SLUG,
  editionHref,
  getResourceTopic,
  libraryHubCopy,
  topicHref,
  topicSearchBlob,
  visibleResourceTopics
} from "./resource-topics";
import { languages, type Locale } from "./site";

export type SearchItem = {
  title: string;
  description: string;
  url: string;
  locale: Locale;
  type: string;
  search?: string;
};

const LOCALES = Object.keys(languages) as Locale[];

const pageItems: SearchItem[] = [
  { locale: "zh", type: "Page", title: "認識我們", description: "基金會介紹、使命與願景。", url: "/zh/about/" },
  { locale: "zh", type: "Page", title: "最新論壇", description: "2026 年世界和平論壇直播頁面。", url: "/zh/live/" },
  { locale: "zh", type: "News", title: "2026 世界和平論壇 – 概念說明", description: "2026 年 10 月 1–2 日，巴黎聯合國教科文組織總部世界和平論壇概念說明。", url: "/zh/news/international-conference-on-peace-2026-concept-note/" },
  { locale: "zh", type: "Page", title: "組織治理", description: "基金會主席、副主席與組織架構。", url: "/zh/governance/" },
  { locale: "zh", type: "Page", title: "支持我們", description: "支持愛的教育、國際論壇與經典翻譯。", url: "/zh/support/" },
  { locale: "zh", type: "Page", title: "文化資源中心", description: "閱讀經典，聆聽智慧，探索傳統文化。", url: "/zh/library/" },
  { locale: "en", type: "Page", title: "About Us", description: "Foundation mission and vision.", url: "/en/about/" },
  { locale: "en", type: "Page", title: "Latest Forum", description: "Live coverage of the International Conference on Peace, 1–2 October 2026, UNESCO Headquarters.", url: "/en/live/" },
  { locale: "en", type: "News", title: "International Conference on Peace 2026 – Concept Note", description: "Concept Note for the International Conference on Peace, 1–2 October 2026, UNESCO Headquarters, Paris.", url: "/en/news/international-conference-on-peace-2026-concept-note/" },
  { locale: "en", type: "Page", title: "Governance", description: "Foundation leadership and governance.", url: "/en/governance/" },
  { locale: "en", type: "Page", title: "Support Us", description: "Support Love Education, international forums, and classical translation.", url: "/en/support/" },
  { locale: "en", type: "Page", title: "Resource Center", description: "Read the classics, encounter enduring wisdom, and explore traditional culture.", url: "/en/library/" },
  { locale: "fr", type: "Page", title: "Nous connaître", description: "Mission et vision de la Fondation.", url: "/fr/about/" },
  { locale: "fr", type: "Page", title: "Dernier forum", description: "Couverture en direct de la Conférence internationale pour la paix, 1–2 octobre 2026, siège de l'UNESCO.", url: "/fr/live/" },
  { locale: "fr", type: "News", title: "Conférence internationale pour la paix 2026 – Note conceptuelle", description: "Note conceptuelle de la Conférence internationale pour la paix, 1–2 octobre 2026, siège de l'UNESCO, Paris.", url: "/fr/news/international-conference-on-peace-2026-concept-note/" },
  { locale: "fr", type: "Page", title: "Gouvernance", description: "Direction et gouvernance de la Fondation.", url: "/fr/governance/" },
  { locale: "fr", type: "Page", title: "Centre de ressources", description: "Lire les classiques, rencontrer une sagesse durable et explorer la culture traditionnelle.", url: "/fr/library/" }
];

function qunshuSearchItems(): SearchItem[] {
  const topic = getResourceTopic(QUNSHU_TOPIC_SLUG);
  if (!topic) return [];

  const items: SearchItem[] = [];
  for (const locale of LOCALES) {
    items.push({
      locale,
      type: "Resource",
      title: topic.title[locale],
      description: topic.summary[locale] || topic.content[locale],
      url: topicHref(locale, topic.slug),
      search: topicSearchBlob(locale, topic)
    });

    for (const edition of fallbackResources[locale]) {
      if (isExcludedResource(edition.slug)) continue;
      const readerTitle = getResourceReaderTitle(edition.slug, edition.title);
      items.push({
        locale,
        type: "Resource",
        title: edition.title,
        description: edition.description,
        url: editionHref(locale, edition.slug),
        search: [edition.slug, edition.title, edition.language, edition.description, readerTitle, edition.file].join(" ")
      });
    }
  }
  return items;
}

function otherTopicSearchItems(): SearchItem[] {
  return visibleResourceTopics()
    .filter((topic) => topic.slug !== QUNSHU_TOPIC_SLUG)
    .flatMap((topic) =>
      LOCALES.map((locale) => ({
        locale,
        type: "Resource" as const,
        title: topic.title[locale],
        description: topic.summary[locale] || libraryHubCopy[locale].comingSoon,
        url: topicHref(locale, topic.slug),
        search: topicSearchBlob(locale, topic)
      }))
    );
}

export const searchIndex: SearchItem[] = [...pageItems, ...qunshuSearchItems(), ...otherTopicSearchItems()];
