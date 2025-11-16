/**
 * Footer Component
 * Phase 5: Premium minimal footer with brand consistency
 * Includes: Logo, tagline, links, copyright
 */

'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { MelltaxLogo } from '@/components/icons';
import { Locale } from '@/lib/i18n/config';

export function Footer() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'th';

  const tFooter = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-brand-light-surface dark:bg-brand-dark-surface border-t border-brand-light-border dark:border-brand-dark-border rounded-t-2xl">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side: Logo + Tagline + Copyright */}
          <div className="space-y-6">
            {/* Logo */}
            <Link href={`/${locale}`} className="inline-flex items-center gap-2 group">
              <MelltaxLogo size={32} className="text-brand-primary dark:text-brand-accent transition-transform duration-200 group-hover:scale-110" />
              <span className="text-xl font-bold text-brand-primary dark:text-brand-text-dark">
                MELLTAX
              </span>
            </Link>

            {/* Tagline */}
            <p className="text-sm text-brand-text-light dark:text-brand-text-dark-light max-w-md leading-relaxed">
              {tFooter('tagline')}
            </p>

            {/* Copyright */}
            <div className="pt-4 border-t border-brand-light-border dark:border-brand-dark-border">
              <p className="text-xs text-brand-text-lighter dark:text-brand-text-dark-lighter">
                © {currentYear} MELLTAX. {tFooter('madeWith')}
              </p>
            </div>
          </div>

          {/* Right Side: Links */}
          <div className="grid grid-cols-2 gap-8">
            {/* Column 1: Main Pages */}
            <div>
              <h3 className="text-sm font-semibold text-brand-primary dark:text-brand-text-dark mb-4 uppercase tracking-wide">
                {locale === 'th' ? 'เมนูหลัก' : 'Main Menu'}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href={`/${locale}`}
                    className="text-sm text-brand-text-light dark:text-brand-text-dark-light hover:text-brand-accent dark:hover:text-brand-accent transition-colors duration-150"
                  >
                    {tFooter('linksCalculator')}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/planner`}
                    className="text-sm text-brand-text-light dark:text-brand-text-dark-light hover:text-brand-accent dark:hover:text-brand-accent transition-colors duration-150"
                  >
                    {tFooter('linksPlanner')}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/about`}
                    className="text-sm text-brand-text-light dark:text-brand-text-dark-light hover:text-brand-accent dark:hover:text-brand-accent transition-colors duration-150"
                  >
                    {tFooter('linksAbout')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Legal */}
            <div>
              <h3 className="text-sm font-semibold text-brand-primary dark:text-brand-text-dark mb-4 uppercase tracking-wide">
                {locale === 'th' ? 'ข้อมูลทางกฎหมาย' : 'Legal'}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href={`/${locale}/about#privacy`}
                    className="text-sm text-brand-text-light dark:text-brand-text-dark-light hover:text-brand-accent dark:hover:text-brand-accent transition-colors duration-150"
                  >
                    {tFooter('linksPrivacy')}
                  </Link>
                </li>
                <li>
                  <span className="text-sm text-brand-text-lighter dark:text-brand-text-dark-lighter cursor-not-allowed">
                    {tFooter('linksTerms')} {locale === 'th' ? '(เร็วๆ นี้)' : '(Coming Soon)'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-8 border-t border-brand-light-border dark:border-brand-dark-border">
          <p className="text-xs text-center text-brand-text-lighter dark:text-brand-text-dark-lighter">
            {tFooter('disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
}
