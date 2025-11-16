/**
 * Navbar component - Premium Dashboard Design
 * HR Management Dashboard aesthetic (Dribbble inspired)
 * 72px height, rounded-b-2xl, soft shadow, elegant spacing
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { LanguageSwitch } from './LanguageSwitch';
import { ThemeToggle } from '../theme/ThemeToggle';
import { MelltaxLogo, CalculatorIcon, PlannerIcon, InfoIcon } from '@/components/icons';
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

  // Premium navigation - only 3 main items as per Dribbble design
  const navItems = [
    {
      label: translations.calculator,
      href: '/',
      exact: true,
      icon: CalculatorIcon
    },
    {
      label: translations.planner,
      href: '/planner',
      exact: false,
      icon: PlannerIcon
    },
    {
      label: translations.about,
      href: '/about',
      exact: false,
      icon: InfoIcon
    },
  ];

  const isActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href || pathname === `/${locale}`;
    }
    return pathname.includes(href);
  };

  return (
    <nav className="bg-brand-light-surface dark:bg-brand-dark-surface border-b border-brand-light-border/60 dark:border-brand-dark-border/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.12)] rounded-b-2xl sticky top-0 z-50 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-[72px] items-center justify-between">
          {/* Logo with Icon */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
          >
            <MelltaxLogo
              className="text-brand-primary dark:text-brand-accent group-hover:text-brand-accent dark:group-hover:text-brand-primary transition-colors duration-300"
              size={32}
            />
            <span className="text-xl font-semibold text-brand-primary dark:text-brand-text-dark tracking-tight group-hover:text-brand-accent dark:group-hover:text-brand-accent transition-colors duration-300">
              MELLTAX
            </span>
          </Link>

          {/* Center Navigation (Desktop) */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href, item.exact);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative group"
                >
                  <div
                    className={clsx(
                      'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300',
                      active
                        ? 'text-brand-primary dark:text-brand-accent'
                        : 'text-brand-text-light dark:text-brand-text-dark-light hover:text-brand-primary dark:hover:text-brand-accent hover:bg-brand-light-hover dark:hover:bg-brand-dark-hover'
                    )}
                  >
                    <Icon size={18} />
                    {item.label}
                  </div>

                  {/* Active underline indicator */}
                  {active && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-brand-accent rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            <LanguageSwitch currentLocale={locale} />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4 flex gap-2 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href, item.exact);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300',
                  active
                    ? 'bg-brand-accent/10 text-brand-accent border border-brand-accent/20'
                    : 'text-brand-text-light dark:text-brand-text-dark-light hover:bg-brand-light-hover dark:hover:bg-brand-dark-hover'
                )}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
