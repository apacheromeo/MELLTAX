/**
 * Language Switch component
 * Toggle between Thai and English
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
    <div className="flex items-center gap-1 rounded-xl bg-neutral-100/80 dark:bg-neutral-800/80 p-1 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 shadow-md">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLanguage(locale)}
          className={clsx(
            'px-4 py-1.5 text-sm font-bold rounded-lg transition-all duration-200',
            currentLocale === locale
              ? 'bg-gradient-to-r from-brand-primary to-accent-600 text-white shadow-lg shadow-brand-primary/30 scale-105'
              : 'text-neutral-600 dark:text-neutral-400 hover:bg-white dark:hover:bg-neutral-700 hover:shadow-sm hover:scale-105'
          )}
          aria-label={`Switch to ${locale === 'th' ? 'Thai' : 'English'}`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
