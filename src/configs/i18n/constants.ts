export const Locales = ["en", "fa"] as const;
export const DefaultLocale = "fa";

export type Locale = (typeof Locales)[number];
