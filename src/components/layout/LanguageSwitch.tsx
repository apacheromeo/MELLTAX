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

    // Navigate to new locale
    const newPath = locale === 'th' ? pathWithoutLocale : `/${locale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-1 rounded-lg border border-gray-300 dark:border-gray-600 p-1">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLanguage(locale)}
          className={clsx(
            'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
            currentLocale === locale
              ? 'bg-primary-600 text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          )}
          aria-label={`Switch to ${locale === 'th' ? 'Thai' : 'English'}`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
