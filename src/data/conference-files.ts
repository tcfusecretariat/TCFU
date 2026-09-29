import type { Locale } from "./site";

export const CONFERENCE_PROGRAMME_PDF: Record<
  Locale,
  { url: string; size: number; filename: string }
> = {
  en: {
    url: "/assets/live/programme-2026-en.pdf",
    size: 317112,
    filename: "International-Conference-on-Peace-2026-Programme-EN.pdf"
  },
  zh: {
    url: "/assets/live/programme-2026-zh.pdf",
    size: 441079,
    filename: "世界和平論壇-2026-活動日程.pdf"
  },
  fr: {
    url: "/assets/live/programme-2026-fr.pdf",
    size: 348628,
    filename: "Conference-internationale-pour-la-paix-2026-Programme-FR.pdf"
  }
};

export function getConferenceProgrammePdf(locale: Locale) {
  return CONFERENCE_PROGRAMME_PDF[locale];
}
