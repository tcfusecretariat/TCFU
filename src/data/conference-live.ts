import type { Locale } from "./site";
import { fallbackNews } from "./news-articles";

export const LIVE_PAGE_SLUG = "live";

/**
 * PLACEHOLDER — replace with the official UNESCO livestream URL when provided.
 * Do not invent a URL.
 */
export const UNESCO_LIVESTREAM_URL = "#PLACEHOLDER_UNESCO_LIVESTREAM_URL";

export const CONFERENCE_LIVE_ASSETS = {
  heroImage: "/assets/live/unesco-headquarters-conference-hall.jpg",
  conceptNotePdfUrl: "/assets/news/international-conference-on-peace-2026-concept-note.pdf",
  agendaPdfUrl: "/assets/news/international-conference-on-peace-2026-agenda.pdf"
} as const;

const CONCEPT_NOTE_SLUG = "international-conference-on-peace-2026-concept-note";

export function getLiveConceptNoteBody(locale: Locale) {
  return fallbackNews[locale].find((article) => article.slug === CONCEPT_NOTE_SLUG)?.body ?? [];
}

export type LivePageCopy = {
  metaTitle: string;
  metaDescription: string;
  navLabel: string;
  title: string;
  subtitle: string;
  eventInfo: string;
  heroAlt: string;
  hostedBy: string;
  watchLive: string;
  newTabHint: string;
  aboutTitle: string;
  about: string;
  resourcesTitle: string;
  downloadConceptNote: string;
  downloadAgenda: string;
  conceptNoteTitle: string;
};

export const livePageCopy: Record<Locale, LivePageCopy> = {
  en: {
    metaTitle: "Live",
    metaDescription:
      "Live coverage of the International Conference on Peace, 1–2 October 2026, UNESCO Headquarters, Room IV. Watch on UNESCO.",
    navLabel: "Live",
    title: "International Conference on Peace",
    subtitle: "Igniting the Vital Spark of the Heart through Education of Traditional Culture for Youth",
    eventInfo: "1–2 October 2026 · UNESCO Headquarters · Room IV",
    heroAlt:
      "Delegates seated in the UNESCO plenary hall during a conference, with the UNESCO emblem and national flags on stage.",
    hostedBy: "Live coverage is hosted by UNESCO.",
    watchLive: "Watch Live on UNESCO",
    newTabHint: "The livestream will open in a new tab.",
    aboutTitle: "About the Conference",
    about:
      "This international conference brings together educators, cultural practitioners and youth advocates to explore how traditional culture can inspire inner peace and a more compassionate world.",
    resourcesTitle: "Event Resources",
    downloadConceptNote: "Download Concept Note",
    downloadAgenda: "Download Programme",
    conceptNoteTitle: "Concept Note"
  },
  zh: {
    metaTitle: "直播",
    metaDescription: "2026 年 10 月 1–2 日，巴黎聯合國教科文組織總部第四會議室「世界和平論壇」直播。請至 UNESCO 觀看。",
    navLabel: "直播",
    title: "世界和平論壇",
    subtitle: "以傳統文化教育啟動青少年核心源動力",
    eventInfo: "2026 年 10 月 1–2 日 · 聯合國教科文組織總部 · 第四會議室",
    heroAlt: "聯合國教科文組織大會堂會議現場，講台上可見 UNESCO 標誌與各國國旗。",
    hostedBy: "直播由 UNESCO 提供。",
    watchLive: "於 UNESCO 觀看直播",
    newTabHint: "直播將於新分頁開啟。",
    aboutTitle: "關於會議",
    about:
      "本次國際會議匯聚教育工作者、文化實踐者與青年倡議者，探討傳統文化如何啟發內在和平，並成就一個更有關懷的世界。",
    resourcesTitle: "活動資料",
    downloadConceptNote: "下載概念說明",
    downloadAgenda: "下載活動日程",
    conceptNoteTitle: "概念說明"
  },
  fr: {
    metaTitle: "En direct",
    metaDescription:
      "Couverture en direct de la Conférence internationale pour la paix, 1–2 octobre 2026, siège de l'UNESCO, Salle IV. À suivre sur l'UNESCO.",
    navLabel: "En direct",
    title: "Conférence internationale pour la paix",
    subtitle: "Réveiller l'élan vital du cœur par l'éducation des jeunes à la culture traditionnelle",
    eventInfo: "1–2 octobre 2026 · Siège de l'UNESCO · Salle IV",
    heroAlt:
      "Salle plénière de l'UNESCO pendant une conférence, avec l'emblème de l'UNESCO et les drapeaux nationaux sur scène.",
    hostedBy: "La couverture en direct est assurée par l'UNESCO.",
    watchLive: "Regarder en direct sur l'UNESCO",
    newTabHint: "La diffusion s'ouvrira dans un nouvel onglet.",
    aboutTitle: "À propos de la conférence",
    about:
      "Cette conférence internationale réunit éducateurs, praticiens culturels et défenseurs de la jeunesse pour explorer comment la culture traditionnelle peut inspirer la paix intérieure et un monde plus compatissant.",
    resourcesTitle: "Ressources",
    downloadConceptNote: "Télécharger la note conceptuelle",
    downloadAgenda: "Télécharger le programme",
    conceptNoteTitle: "Note conceptuelle"
  }
};
