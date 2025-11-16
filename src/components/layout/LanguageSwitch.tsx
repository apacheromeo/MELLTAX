/**
 * Language Switch component - Minimal Design
 * Clean toggle between Thai and English
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
    <div className="flex items-center gap-0.5 rounded-md border border-neutral-200 dark:border-neutral-800 p-0.5 bg-neutral-100 dark:bg-neutral-900">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLanguage(locale)}
          className={clsx(
            'px-2.5 py-1 text-xs font-medium rounded transition-colors',
            currentLocale === locale
              ? 'bg-white text-black dark:bg-black dark:text-white shadow-sm'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
          )}
          aria-label={`Switch to ${locale === 'th' ? 'Thai' : 'English'}`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
