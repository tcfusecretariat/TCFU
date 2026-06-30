import type { Locale } from "./site";

export type LibraryResource = {
  slug: string;
  title: string;
  language: string;
  description: string;
  file: string;
};

export type LibraryResourceWithReader = LibraryResource & {
  readerTitle: string;
};

/** Slugs hidden site-wide even if present in Sanity CMS. */
export const EXCLUDED_RESOURCE_SLUGS = ["qunshu-zhiyao-ru-vol1"] as const;

export function isExcludedResource(slug: string): boolean {
  return (
    (EXCLUDED_RESOURCE_SLUGS as readonly string[]).includes(slug) || slug.startsWith("qunshu-zhiyao-ru")
  );
}

/** Native-language work title shown beside each PDF reader (same on all locales). */
export const resourceReaderTitles: Record<string, string> = {
  "qunshu-zhiyao-360-zh": "群書治要",
  "qunshu-zhiyao-es": "Los Principios de Gobierno de la Antigua China",
  "qunshu-zhiyao-ja-vol3": "群書治要",
  "qunshu-zhiyao-fr-vol1": "Les principes de gouvernance de la Chine ancienne"
};

export function getResourceReaderTitle(slug: string, fallbackTitle = ""): string {
  return resourceReaderTitles[slug] ?? fallbackTitle;
}

export const fallbackResources: Record<Locale, LibraryResource[]> = {
  zh: [
    {
      slug: "qunshu-zhiyao-360-zh",
      title: "群書治要三六〇 中文版",
      language: "中文",
      description: "以精簡篇章呈現《群書治要》的治理智慧與修身理念，適合大眾閱讀、研習與分享。",
      file: "/assets/resources/qunshu-zhiyao-360-zh.pdf"
    },
    {
      slug: "qunshu-zhiyao-es",
      title: "Los Principios de Gobierno de la Antigua China",
      language: "Español",
      description: "Versión en español de la sabiduría clásica de 《群書治要》, preparada para facilitar el estudio y la difusión internacional.",
      file: "/assets/resources/qunshu-zhiyao-es.pdf"
    },
    {
      slug: "qunshu-zhiyao-ja-vol3",
      title: "群書治要 日文版 第三冊",
      language: "日本語",
      description: "日文版《群書治要》第三冊，方便日本讀者研讀與分享古典治理智慧。",
      file: "/assets/resources/qunshu-zhiyao-ja-vol3.pdf"
    },
    {
      slug: "qunshu-zhiyao-fr-vol1",
      title: "Principes de Gouvernance de la Chine Ancienne 第一冊（中法對照）",
      language: "Français",
      description: "法文版《群書治要360》第一冊中法對照本，便於研讀與國際交流。",
      file: "/assets/resources/qunshu-zhiyao-fr-vol1.pdf"
    }
  ],
  en: [
    {
      slug: "qunshu-zhiyao-360-zh",
      title: "The Governing Principles of Ancient China 360 Chinese Edition",
      language: "中文",
      description: "A concise selection from The Governing Principles of Ancient China for reading, study, and public sharing.",
      file: "/assets/resources/qunshu-zhiyao-360-zh.pdf"
    },
    {
      slug: "qunshu-zhiyao-es",
      title: "Los Principios de Gobierno de la Antigua China",
      language: "Español",
      description: "The Spanish edition of The Governing Principles of Ancient China for international study and dissemination.",
      file: "/assets/resources/qunshu-zhiyao-es.pdf"
    },
    {
      slug: "qunshu-zhiyao-ja-vol3",
      title: "The Governing Principles of Ancient China Japanese Edition Volume 3",
      language: "日本語",
      description: "Volume 3 of the Japanese edition for study and sharing of classical governance wisdom.",
      file: "/assets/resources/qunshu-zhiyao-ja-vol3.pdf"
    },
    {
      slug: "qunshu-zhiyao-fr-vol1",
      title: "Principes de Gouvernance de la Chine Ancienne Volume 1 (Chinese–French)",
      language: "Français",
      description: "Volume 1 of the bilingual Chinese–French edition of The Governing Principles of Ancient China 360.",
      file: "/assets/resources/qunshu-zhiyao-fr-vol1.pdf"
    }
  ],
  fr: [
    {
      slug: "qunshu-zhiyao-360-zh",
      title: "Les principes de gouvernance de la chine ancienne 360 édition chinoise",
      language: "中文",
      description: "Une sélection concise des principes de gouvernance de la chine ancienne pour la lecture, l’étude et le partage.",
      file: "/assets/resources/qunshu-zhiyao-360-zh.pdf"
    },
    {
      slug: "qunshu-zhiyao-es",
      title: "Los Principios de Gobierno de la Antigua China",
      language: "Español",
      description: "Édition espagnole des principes de gouvernance de la chine ancienne destinée à l’étude et à la diffusion internationale.",
      file: "/assets/resources/qunshu-zhiyao-es.pdf"
    },
    {
      slug: "qunshu-zhiyao-ja-vol3",
      title: "Les Principes de Gouvernance de la Chine Ancienne édition japonaise volume 3",
      language: "日本語",
      description: "Volume 3 de l’édition japonaise pour l’étude et le partage de la sagesse classique de gouvernance.",
      file: "/assets/resources/qunshu-zhiyao-ja-vol3.pdf"
    },
    {
      slug: "qunshu-zhiyao-fr-vol1",
      title: "Principes de Gouvernance de la Chine Ancienne volume 1 (bilingue chinois–français)",
      language: "Français",
      description: "Volume 1 de l’édition bilingue chinois–français des Principes de Gouvernance de la Chine Ancienne 360.",
      file: "/assets/resources/qunshu-zhiyao-fr-vol1.pdf"
    }
  ]
};
