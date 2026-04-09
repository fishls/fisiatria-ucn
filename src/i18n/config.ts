export type Locale = "es" | "en";

export const defaultLocale: Locale = "es";

export const locales: Locale[] = ["es", "en"];

export const localeLabels: Record<Locale, string> = {
  es: "Español",
  en: "English",
};
