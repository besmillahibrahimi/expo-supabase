export const Locales = ["en", "fa"] as const;
export const DefaultLocale = "en";

export type Locale = (typeof Locales)[number];
