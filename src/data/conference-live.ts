import { CONFERENCE_PROGRAMME_PDF } from "./conference-files";
import { fallbackNews } from "./news-articles";
import type { Locale } from "./site";

export const LIVE_PAGE_SLUG = "live";

export const UNESCO_LIVESTREAM_URL = "http://webcast.unesco.org/events/2026-10-WFB/";

export const CONFERENCE_LIVE_ASSETS = {
  heroImage: "/assets/live/unesco-headquarters-conference-hall.jpg",
  conceptNotePdf: {
    en: "/assets/news/international-conference-on-peace-2026-concept-note.pdf",
    zh: "/assets/news/international-conference-on-peace-2026-concept-note.pdf",
    fr: "/assets/news/international-conference-on-peace-2026-concept-note.pdf"
  },
  programmePdf: {
    en: CONFERENCE_PROGRAMME_PDF.en.url,
    zh: CONFERENCE_PROGRAMME_PDF.zh.url,
    fr: CONFERENCE_PROGRAMME_PDF.fr.url
  },
  programmeDownloadName: {
    en: CONFERENCE_PROGRAMME_PDF.en.filename,
    zh: CONFERENCE_PROGRAMME_PDF.zh.filename,
    fr: CONFERENCE_PROGRAMME_PDF.fr.filename
  },
  conceptNoteDownloadName: {
    en: "International-Conference-on-Peace-2026-Concept-Note.pdf",
    zh: "世界和平論壇-2026-概念說明.pdf",
    fr: "Conference-internationale-pour-la-paix-2026-Note-conceptuelle.pdf"
  }
} as const;

const CONCEPT_NOTE_SLUG = "international-conference-on-peace-2026-concept-note";

export function getLiveConceptNoteBody(locale: Locale) {
  return fallbackNews[locale].find((article) => article.slug === CONCEPT_NOTE_SLUG)?.body ?? [];
}

export function getLiveDownloads(locale: Locale) {
  const t = livePageCopy[locale];
  const assets = CONFERENCE_LIVE_ASSETS;
  return [
    {
      href: assets.programmePdf[locale],
      filename: assets.programmeDownloadName[locale],
      name: t.downloadAgenda,
      kind: t.programmeKind
    },
    {
      href: assets.conceptNotePdf[locale],
      filename: assets.conceptNoteDownloadName[locale],
      name: t.downloadConceptNote,
      kind: t.conceptNoteKind
    }
  ];
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
  programmeTitle: string;
  programmeReaderLabel: string;
  programmePrev: string;
  programmeNext: string;
  programmeOpenFallback: string;
  resourcesTitle: string;
  downloadConceptNote: string;
  downloadAgenda: string;
  programmeKind: string;
  conceptNoteKind: string;
  conceptNoteTitle: string;
  readFullConceptNote: string;
  collapseConceptNote: string;
  updatesTitle: string;
  updatesSubtitle: string;
  filterAll: string;
  filterDay1: string;
  filterDay2: string;
  filterHighlights: string;
  day1: string;
  day2: string;
  photosEmpty: string;
  lightboxClose: string;
  lightboxPrevious: string;
  lightboxNext: string;
  lightboxDownload: string;
  lightboxCopyLink: string;
  lightboxCopied: string;
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
    watchLive: "Replay on UNESCO",
    newTabHint: "The livestream will open in a new tab.",
    aboutTitle: "About the Conference",
    about:
      "This international conference brings together educators, cultural practitioners and youth advocates to explore how traditional culture can inspire inner peace and a more compassionate world.",
    programmeTitle: "Programme",
    programmeReaderLabel: "Conference programme",
    programmePrev: "Previous",
    programmeNext: "Next",
    programmeOpenFallback: "Open programme",
    resourcesTitle: "Event Resources",
    downloadConceptNote: "Download Concept Note",
    downloadAgenda: "Download Programme",
    programmeKind: "Programme · PDF",
    conceptNoteKind: "Concept Note · PDF",
    conceptNoteTitle: "Concept Note",
    readFullConceptNote: "Read full Concept Note",
    collapseConceptNote: "Collapse",
    updatesTitle: "Live Updates",
    updatesSubtitle: "Photos from the event, updated throughout the day.",
    filterAll: "All",
    filterDay1: "Day 1",
    filterDay2: "Day 2",
    filterHighlights: "Highlights",
    day1: "Day 1",
    day2: "Day 2",
    photosEmpty: "Live photos will be added throughout the event.",
    lightboxClose: "Close photo",
    lightboxPrevious: "Previous photo",
    lightboxNext: "Next photo",
    lightboxDownload: "Download photo",
    lightboxCopyLink: "Copy photo link",
    lightboxCopied: "Link copied"
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
    watchLive: "教科文組織重播",
    newTabHint: "直播將於新分頁開啟。",
    aboutTitle: "關於會議",
    about:
      "本次國際會議匯聚教育工作者、文化實踐者與青年倡議者，探討傳統文化如何啟發內在和平，並成就一個更有關懷的世界。",
    programmeTitle: "活動日程",
    programmeReaderLabel: "會議活動日程",
    programmePrev: "上一頁",
    programmeNext: "下一頁",
    programmeOpenFallback: "開啟活動日程",
    resourcesTitle: "活動資料",
    downloadConceptNote: "下載概念說明",
    downloadAgenda: "下載活動日程",
    programmeKind: "活動日程 · PDF",
    conceptNoteKind: "概念說明 · PDF",
    conceptNoteTitle: "概念說明",
    readFullConceptNote: "閱讀完整概念說明",
    collapseConceptNote: "收合",
    updatesTitle: "即時更新",
    updatesSubtitle: "活動現場照片將於當日陸續更新。",
    filterAll: "全部",
    filterDay1: "第一天",
    filterDay2: "第二天",
    filterHighlights: "精選",
    day1: "第一天",
    day2: "第二天",
    photosEmpty: "活動照片將於會議期間陸續上傳。",
    lightboxClose: "關閉照片",
    lightboxPrevious: "上一張",
    lightboxNext: "下一張",
    lightboxDownload: "下載照片",
    lightboxCopyLink: "複製分享連結",
    lightboxCopied: "連結已複製"
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
    watchLive: "Rediffusion UNESCO",
    newTabHint: "La diffusion s'ouvrira dans un nouvel onglet.",
    aboutTitle: "À propos de la conférence",
    about:
      "Cette conférence internationale réunit éducateurs, praticiens culturels et défenseurs de la jeunesse pour explorer comment la culture traditionnelle peut inspirer la paix intérieure et un monde plus compatissant.",
    programmeTitle: "Programme",
    programmeReaderLabel: "Programme de la conférence",
    programmePrev: "Page précédente",
    programmeNext: "Page suivante",
    programmeOpenFallback: "Ouvrir le programme",
    resourcesTitle: "Ressources",
    downloadConceptNote: "Télécharger la note conceptuelle",
    downloadAgenda: "Télécharger le programme",
    programmeKind: "Programme · PDF",
    conceptNoteKind: "Note conceptuelle · PDF",
    conceptNoteTitle: "Note conceptuelle",
    readFullConceptNote: "Lire la note conceptuelle complète",
    collapseConceptNote: "Réduire",
    updatesTitle: "Actualités en direct",
    updatesSubtitle: "Photos de l'événement, mises à jour tout au long de la journée.",
    filterAll: "Tout",
    filterDay1: "Jour 1",
    filterDay2: "Jour 2",
    filterHighlights: "Temps forts",
    day1: "Jour 1",
    day2: "Jour 2",
    photosEmpty: "Les photos seront ajoutées tout au long de l'événement.",
    lightboxClose: "Fermer la photo",
    lightboxPrevious: "Photo précédente",
    lightboxNext: "Photo suivante",
    lightboxDownload: "Télécharger la photo",
    lightboxCopyLink: "Copier le lien de partage",
    lightboxCopied: "Lien copié"
  }
};
