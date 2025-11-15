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
    profit: string;
    about: string;
    login: string;
  };
}

export function Navbar({ locale, translations }: NavbarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: translations.calculator, href: '/', exact: true, icon: '🧮' },
    { label: translations.planner, href: '/planner', exact: false, icon: '📊' },
    { label: translations.profit, href: '/profit', exact: false, icon: '💰' },
    { label: translations.about, href: '/about', exact: false, icon: 'ℹ️' },
  ];

  const isActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href || pathname === `/${locale}`;
    }
    return pathname.includes(href);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-neutral-900/80 border-b border-neutral-200/50 dark:border-neutral-700/50 shadow-lg shadow-neutral-200/50 dark:shadow-neutral-900/50">
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
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2',
                  isActive(item.href, item.exact)
                    ? 'bg-gradient-to-r from-brand-primary to-accent-600 text-white shadow-lg shadow-brand-primary/30 scale-105'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-gradient-to-r hover:from-neutral-100 hover:to-neutral-50 dark:hover:from-neutral-800 dark:hover:to-neutral-700 hover:shadow-md hover:scale-105'
                )}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
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
        <div className="md:hidden pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2',
                isActive(item.href, item.exact)
                  ? 'bg-gradient-to-r from-brand-primary to-accent-600 text-white shadow-lg'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:shadow-md'
              )}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
