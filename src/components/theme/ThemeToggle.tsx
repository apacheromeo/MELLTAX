/**
 * Theme Toggle component
 * Button to toggle between light and dark mode
 */

'use client';

import { useTheme } from '@/hooks/useTheme';
import { clsx } from 'clsx';

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        'relative inline-flex h-10 w-10 items-center justify-center rounded-lg',
        'bg-brand-light-surface dark:bg-brand-dark-surface',
        'border border-brand-light-border dark:border-brand-dark-border',
        'hover:bg-brand-light-hover dark:hover:bg-brand-dark-hover',
        'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2'
      )}
      aria-label="Toggle theme"
      title={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Sun icon for light mode */}
      <svg
        className={clsx(
          'h-5 w-5 transition-all',
          resolvedTheme === 'dark'
            ? 'rotate-0 scale-100'
            : 'rotate-90 scale-0 absolute'
        )}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* Moon icon for dark mode */}
      <svg
        className={clsx(
          'h-5 w-5 transition-all',
          resolvedTheme === 'dark'
            ? 'rotate-90 scale-0 absolute'
            : 'rotate-0 scale-100'
        )}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
}
