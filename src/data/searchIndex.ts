import type { Locale } from "./site";

export type SearchItem = {
  title: string;
  description: string;
  url: string;
  locale: Locale;
  type: string;
};

export const searchIndex: SearchItem[] = [
  { locale: "zh", type: "Page", title: "認識我們", description: "基金會介紹、使命與願景。", url: "/zh/about/" },
  { locale: "zh", type: "Page", title: "支持我們", description: "支持愛的教育、國際論壇與經典翻譯。", url: "/zh/support/" },
  { locale: "zh", type: "Resource", title: "群書治要三六〇 中文版", description: "線上閱讀與 PDF 下載。", url: "/zh/library/#qunshu-zhiyao-360-zh" },
  { locale: "zh", type: "Resource", title: "西班牙文群書治要", description: "Los Principios de Gobierno de la Antigua China。", url: "/zh/library/#qunshu-zhiyao-es" },
  { locale: "en", type: "Page", title: "About Us", description: "Foundation mission and vision.", url: "/en/about/" },
  { locale: "en", type: "Resource", title: "The Governing Principles of Ancient China 360 Chinese Edition", description: "Online reading and PDF download.", url: "/en/library/#qunshu-zhiyao-360-zh" },
  { locale: "fr", type: "Page", title: "Nous connaître", description: "Mission et vision de la Fondation.", url: "/fr/about/" },
  { locale: "fr", type: "Resource", title: "Les principes de gouvernance de la chine ancienne", description: "Lecture en ligne et téléchargement PDF.", url: "/fr/library/#qunshu-zhiyao-360-zh" }
];
