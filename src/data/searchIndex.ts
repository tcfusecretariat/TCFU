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
  { locale: "zh", type: "Page", title: "組織治理", description: "基金會主席、副主席與組織架構。", url: "/zh/governance/" },
  { locale: "zh", type: "Page", title: "支持我們", description: "支持愛的教育、國際論壇與經典翻譯。", url: "/zh/support/" },
  { locale: "zh", type: "Resource", title: "群書治要三六〇 中文版", description: "線上閱讀與 PDF 下載。", url: "/zh/library/#qunshu-zhiyao-360-zh" },
  { locale: "zh", type: "Resource", title: "西班牙文群書治要", description: "Los Principios de Gobierno de la Antigua China。", url: "/zh/library/#qunshu-zhiyao-es" },
  { locale: "zh", type: "Resource", title: "群書治要 日文版 第三冊", description: "日文版《群書治要》第三冊。", url: "/zh/library/#qunshu-zhiyao-ja-vol3" },
  { locale: "zh", type: "Resource", title: "Principes de Gouvernance de la Chine Ancienne 第一冊（中法對照）", description: "法文版《群書治要360》第一冊中法對照本。", url: "/zh/library/#qunshu-zhiyao-fr-vol1" },
  { locale: "en", type: "Page", title: "About Us", description: "Foundation mission and vision.", url: "/en/about/" },
  { locale: "en", type: "Page", title: "Governance", description: "Foundation leadership and governance.", url: "/en/governance/" },
  { locale: "en", type: "Page", title: "Support Us", description: "Support Love Education, international forums, and classical translation.", url: "/en/support/" },
  { locale: "en", type: "Resource", title: "The Governing Principles of Ancient China 360 Chinese Edition", description: "Online reading and PDF download.", url: "/en/library/#qunshu-zhiyao-360-zh" },
  { locale: "en", type: "Resource", title: "Los Principios de Gobierno de la Antigua China", description: "Spanish edition online reading and PDF download.", url: "/en/library/#qunshu-zhiyao-es" },
  { locale: "en", type: "Resource", title: "The Governing Principles of Ancient China Japanese Edition Volume 3", description: "Japanese edition volume 3 online reading and PDF download.", url: "/en/library/#qunshu-zhiyao-ja-vol3" },
  { locale: "en", type: "Resource", title: "Principes de Gouvernance de la Chine Ancienne Volume 1 (Chinese–French)", description: "Bilingual Chinese–French edition volume 1 online reading and PDF download.", url: "/en/library/#qunshu-zhiyao-fr-vol1" },
  { locale: "fr", type: "Page", title: "Nous connaître", description: "Mission et vision de la Fondation.", url: "/fr/about/" },
  { locale: "fr", type: "Page", title: "Gouvernance", description: "Direction et gouvernance de la Fondation.", url: "/fr/governance/" },
  { locale: "fr", type: "Resource", title: "Les principes de gouvernance de la chine ancienne", description: "Lecture en ligne et téléchargement PDF.", url: "/fr/library/#qunshu-zhiyao-360-zh" },
  { locale: "fr", type: "Resource", title: "Los Principios de Gobierno de la Antigua China", description: "Édition espagnole — lecture en ligne et téléchargement PDF.", url: "/fr/library/#qunshu-zhiyao-es" },
  { locale: "fr", type: "Resource", title: "Les Principes de Gouvernance de la Chine Ancienne édition japonaise volume 3", description: "Volume 3 de l’édition japonaise.", url: "/fr/library/#qunshu-zhiyao-ja-vol3" },
  { locale: "fr", type: "Resource", title: "Principes de Gouvernance de la Chine Ancienne volume 1 (bilingue chinois–français)", description: "Volume 1 bilingue chinois–français.", url: "/fr/library/#qunshu-zhiyao-fr-vol1" }
];
