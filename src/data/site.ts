export const languages = {
  zh: { label: "正體中文", path: "/zh/", lang: "zh-Hant" },
  en: { label: "English", path: "/en/", lang: "en" },
  fr: { label: "Français", path: "/fr/", lang: "fr" }
} as const;

export type Locale = keyof typeof languages;

export const defaultLocale: Locale = "zh";

export const siteSettings = {
  name: "Traditional Culture Foundation at UNESCO",
  email: "office@tcfunesco.org",
  helloAssoUrl: "https://www.helloasso.com/associations/traditional-culture-foundation-at-unesco",
  logo: "/assets/tcf-logo.svg",
  logoMark: "/assets/tcf-logo-mark.png",
  calligraphy: "/assets/calligraphy-original.png",
  defaultOgImage: "/assets/events/international-peace-conference-2025-poster.jpg"
};
