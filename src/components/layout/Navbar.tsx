/**
 * Navbar component
 * Main navigation bar for the app
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
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
    <nav className="sticky top-0 z-50 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 shadow-sm backdrop-blur-sm bg-white/95 dark:bg-neutral-900/95">
      <div className="container-responsive">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 transition-transform group-hover:scale-105">
              <Image
                src="/logo-melltax-icon-80.svg"
                alt="MELLTAX"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-bold leading-none">
                <span className="text-brand-primary dark:text-white">MELL</span>
                <span className="text-brand-primary dark:text-white font-extrabold">TAX</span>
              </span>
              <span className="text-[10px] text-accent-600 dark:text-accent-400 font-medium tracking-wide">
                Tax Calculator
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  isActive(item.href, item.exact)
                    ? 'bg-brand-primary text-white shadow-md'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
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
                'px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap',
                isActive(item.href, item.exact)
                  ? 'bg-brand-primary text-white shadow-md'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
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
