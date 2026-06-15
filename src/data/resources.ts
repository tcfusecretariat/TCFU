import type { Locale } from "./site";

export type LibraryResource = {
  slug: string;
  title: string;
  language: string;
  description: string;
  file: string;
};

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
    }
  ],
  en: [
    {
      slug: "qunshu-zhiyao-360-zh",
      title: "Qunshu Zhiyao 360 Chinese Edition",
      language: "中文",
      description: "A concise selection from Qunshu Zhiyao for reading, study, and public sharing.",
      file: "/assets/resources/qunshu-zhiyao-360-zh.pdf"
    },
    {
      slug: "qunshu-zhiyao-es",
      title: "Los Principios de Gobierno de la Antigua China",
      language: "Español",
      description: "The Spanish edition of Qunshu Zhiyao for international study and dissemination.",
      file: "/assets/resources/qunshu-zhiyao-es.pdf"
    }
  ],
  fr: [
    {
      slug: "qunshu-zhiyao-360-zh",
      title: "Qunshu Zhiyao 360 édition chinoise",
      language: "中文",
      description: "Une sélection concise de Qunshu Zhiyao pour la lecture, l’étude et le partage.",
      file: "/assets/resources/qunshu-zhiyao-360-zh.pdf"
    },
    {
      slug: "qunshu-zhiyao-es",
      title: "Los Principios de Gobierno de la Antigua China",
      language: "Español",
      description: "Édition espagnole de Qunshu Zhiyao destinée à l’étude et à la diffusion internationale.",
      file: "/assets/resources/qunshu-zhiyao-es.pdf"
    }
  ]
};
