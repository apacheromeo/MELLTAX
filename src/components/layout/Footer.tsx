/**
 * Footer component
 * Site footer with links and disclaimer
 */

import Link from 'next/link';

interface FooterProps {
  translations: {
    disclaimer: string;
    privacy: string;
    about: string;
    madeWith: string;
  };
}

export function Footer({ translations }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <div className="container-responsive py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left side - Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link
              href="/about"
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {translations.about}
            </Link>
            <Link
              href="/about#privacy"
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {translations.privacy}
            </Link>
          </div>

          {/* Right side - Copyright */}
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} MELLTAX. {translations.madeWith}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {translations.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
