/**
 * Navbar component - Dashboard Design
 * Professional navigation bar with HR dashboard aesthetic
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
    <nav className="border-b border-brand-light-border dark:border-brand-dark-border bg-brand-light-surface dark:bg-brand-dark-surface shadow-sm">
      <div className="container-responsive">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-brand-primary dark:text-brand-text-dark hover:text-brand-primary-600 dark:hover:text-brand-text-dark-light transition-colors"
          >
            MELLTAX
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive(item.href, item.exact)
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'text-brand-text-light dark:text-brand-text-dark-light hover:text-brand-primary dark:hover:text-brand-accent hover:bg-brand-light-hover dark:hover:bg-brand-dark-hover'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            <LanguageSwitch currentLocale={locale} />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200',
                isActive(item.href, item.exact)
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'text-brand-text-light dark:text-brand-text-dark-light hover:bg-brand-light-hover dark:hover:bg-brand-dark-hover'
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
