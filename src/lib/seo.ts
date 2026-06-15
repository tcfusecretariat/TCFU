import { languages, type Locale } from "@data/site";

export function localizedPath(locale: Locale, path = "") {
  const cleanPath = path.replace(/^\/|\/$/g, "");
  return `/${locale}/${cleanPath ? `${cleanPath}/` : ""}`;
}

export function hreflangLinks(path = "") {
  return Object.entries(languages).map(([locale, language]) => ({
    locale,
    lang: language.lang,
    href: localizedPath(locale as Locale, path)
  }));
}
