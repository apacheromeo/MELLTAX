/**
 * Navbar component
 * Main navigation bar for the app
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { LanguageSwitch } from './LanguageSwitch';
import { ThemeToggle } from '../theme/ThemeToggle';
import { Locale } from '@/lib/i18n/config';

interface NavbarProps {
  locale: Locale;
  translations: {
    appName: string;
    calculator: string;
    planner: string;
    about: string;
    login: string;
  };
}

export function Navbar({ locale, translations }: NavbarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: translations.calculator, href: '/', exact: true },
    { label: translations.planner, href: '/planner', exact: false },
    { label: translations.about, href: '/about', exact: false },
  ];

  const isActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href || pathname === `/${locale}`;
    }
    return pathname.includes(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container-responsive">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary-600">
            <div className="flex items-center justify-center h-10 w-10 bg-primary-600 text-white rounded-lg">
              <span className="text-lg">฿</span>
            </div>
            <span>{translations.appName}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive(item.href, item.exact)
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            <LanguageSwitch currentLocale={locale} />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3 flex gap-1 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
                isActive(item.href, item.exact)
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
