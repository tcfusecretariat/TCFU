export const languages = {
  en: { label: "English", path: "/en/", lang: "en" },
  zh: { label: "正體中文", path: "/zh/", lang: "zh-Hant" },
  fr: { label: "Français", path: "/fr/", lang: "fr" }
} as const;

export type Locale = keyof typeof languages;

export const defaultLocale: Locale = "en";

export const siteSettings = {
  name: "Traditional Culture Foundation at UNESCO",
  email: "office@tcfunesco.org",
  helloAssoUrl: "https://www.helloasso.com/associations/traditional-culture-foundation-at-unesco",
  logo: "/assets/tcf-logo.png",
  logoMark: "/assets/tcf-logo-mark.png",
  calligraphy: "/assets/calligraphy-original.png",
  heroArabicTagline: "/assets/hero-arabic-tagline.png",
  heroArabicTaglineAlt: "أشعل الشرارة في القلب",
  defaultOgImage: "/assets/events/international-peace-conference-2025-poster.jpg"
};
