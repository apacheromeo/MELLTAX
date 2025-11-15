/**
 * Internationalization (i18n) configuration for MELLTAX
 * Supports Thai (th) and English (en)
 */

export const locales = ['th', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'th';

export const localeNames: Record<Locale, string> = {
  th: 'ไทย',
  en: 'English',
};

export const localeFlags: Record<Locale, string> = {
  th: '🇹🇭',
  en: '🇬🇧',
};
