import type { Locale } from "./site";

export type GovernanceCopy = {
  title: string;
  kicker: string;
  intro: string;
  presidentLabel: string;
  president: string;
  vicePresidentLabel: string;
  vicePresident: string;
  vicePresidentNote?: string;
};

export const governanceContent: Record<Locale, GovernanceCopy> = {
  zh: {
    title: "組織治理",
    kicker: "基金會",
    intro: "聯合國教科文組織傳統文化基金會由來自教育、外交、文化及國際合作領域的專業人士共同推動。",
    presidentLabel: "主席（President）：",
    president: "和為貴 女士",
    vicePresidentLabel: "副主席（Vice President）：",
    vicePresident: "Ny Toky Andriamanjato 先生",
    vicePresidentNote: "前馬達加斯加常駐聯合國教科文組織代表"
  },
  en: {
    title: "Governance",
    kicker: "Foundation",
    intro:
      "The Traditional Culture Foundation at UNESCO is guided by professionals with expertise in education, diplomacy, culture, and international cooperation.",
    presidentLabel: "President:",
    president: "Ms. Feifei HE",
    vicePresidentLabel: "Vice President:",
    vicePresident: "Mr. Ny Toky Andriamanjato",
    vicePresidentNote: "Former Permanent Delegate of Madagascar to UNESCO"
  },
  fr: {
    title: "Gouvernance",
    kicker: "Fondation",
    intro:
      "La Traditional Culture Foundation at UNESCO est portée par des professionnels issus des domaines de l'éducation, de la diplomatie, de la culture et de la coopération internationale.",
    presidentLabel: "Présidente :",
    president: "Mme Feifei HE",
    vicePresidentLabel: "Vice-président :",
    vicePresident: "M. Ny Toky Andriamanjato",
    vicePresidentNote: "Ancien Délégué permanent de Madagascar auprès de l'UNESCO"
  }
};
