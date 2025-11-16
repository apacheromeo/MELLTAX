/**
 * Navbar component - Minimal Design
 * Clean navigation bar with minimal styling
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
    profit: string;
    incomeTax: string;
    vat: string;
    socialSecurity: string;
    dashboard: string;
    about: string;
    login: string;
  };
}

export function Navbar({ locale, translations }: NavbarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: translations.dashboard, href: '/dashboard', exact: false },
    { label: translations.calculator, href: '/', exact: true },
    { label: translations.incomeTax, href: '/income-tax', exact: false },
    { label: translations.vat, href: '/vat', exact: false },
    { label: translations.socialSecurity, href: '/social-security', exact: false },
    { label: translations.planner, href: '/planner', exact: false },
    { label: translations.profit, href: '/profit', exact: false },
    { label: translations.about, href: '/about', exact: false },
  ];

  const isActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href || pathname === `/${locale}`;
    }
    return pathname.includes(href);
  };

  return (
    <nav className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black">
      <div className="container-responsive">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-semibold text-neutral-900 dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            MELLTAX
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                  isActive(item.href, item.exact)
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-black'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900'
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
        <div className="md:hidden pb-2 flex gap-1 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors',
                isActive(item.href, item.exact)
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-black'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900'
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
