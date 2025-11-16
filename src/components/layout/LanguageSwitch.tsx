/**
 * Language Switch component - Premium Pill Design
 * Smooth animated toggle between Thai and English
 * Dribbble HR dashboard aesthetic
 */

'use client';

import { usePathname, useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import { locales, Locale } from '@/lib/i18n/config';

interface LanguageSwitchProps {
  currentLocale: Locale;
}

export function LanguageSwitch({ currentLocale }: LanguageSwitchProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (locale: Locale) => {
    // Remove current locale from pathname if it exists
    const pathWithoutLocale = pathname.replace(/^\/(th|en)/, '') || '/';

    // Navigate to new locale with proper prefix
    const newPath = `/${locale}${pathWithoutLocale}`;
    router.push(newPath);
    router.refresh();
  };

  return (
    <div className="relative flex items-center gap-1 rounded-full border border-brand-light-border dark:border-brand-dark-border p-1 bg-brand-light-surface dark:bg-brand-dark-surface shadow-sm">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLanguage(locale)}
          className={clsx(
            'relative z-10 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-300',
            currentLocale === locale
              ? 'bg-brand-accent text-white shadow-md'
              : 'text-brand-text-light dark:text-brand-text-dark-light hover:text-brand-primary dark:hover:text-brand-accent'
          )}
          aria-label={`Switch to ${locale === 'th' ? 'Thai' : 'English'}`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
