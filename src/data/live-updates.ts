import type { Locale } from "./site";

export type LivePhotoDay = 1 | 2;
export type LivePhotoFilter = "all" | "day1" | "day2" | "highlights";

export type LivePhoto = {
  id: string;
  takenAt: string;
  day: LivePhotoDay;
  highlight?: boolean;
  alt: Record<Locale, string>;
  caption: Record<Locale, string>;
  images: {
    thumbAvif?: string;
    thumbWebp?: string;
    thumbJpg: string;
    fullWebp?: string;
    fullJpg: string;
    width: number;
    height: number;
  };
};

/**
 * Add photos here when they are uploaded. Keep list thumbnails separate from
 * full-resolution files. Newest photos should have the latest `takenAt`.
 */
export const livePhotos: LivePhoto[] = [];

export function getLivePhotos(): LivePhoto[] {
  return [...livePhotos].sort((a, b) => Date.parse(b.takenAt) - Date.parse(a.takenAt));
}

export function formatLivePhotoTime(iso: string, locale: Locale) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-Hant" : locale, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).format(date);
}
