/**
 * Theme Toggle component - Premium Animation
 * Sun/Moon icon with smooth rotation animation
 * Dribbble HR dashboard aesthetic
 */

'use client';

import { useTheme } from '@/hooks/useTheme';
import { clsx } from 'clsx';
import { SunIcon, MoonIcon } from '@/components/icons';

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        'relative inline-flex h-10 w-10 items-center justify-center rounded-full',
        'bg-brand-light-surface dark:bg-brand-dark-surface',
        'border border-brand-light-border dark:border-brand-dark-border',
        'hover:bg-brand-light-hover dark:hover:bg-brand-dark-hover',
        'hover:border-brand-primary-300 dark:hover:border-brand-accent',
        'shadow-sm hover:shadow-md',
        'transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2',
        'group'
      )}
      aria-label="Toggle theme"
      title={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Sun icon (Light Mode) - rotates out when switching to dark */}
      <div
        className={clsx(
          'absolute inset-0 flex items-center justify-center',
          'transition-all duration-500 ease-in-out',
          resolvedTheme === 'dark'
            ? 'rotate-90 scale-0 opacity-0'
            : 'rotate-0 scale-100 opacity-100'
        )}
      >
        <SunIcon className="text-brand-primary group-hover:text-brand-accent transition-colors duration-300" size={20} />
      </div>

      {/* Moon icon (Dark Mode) - rotates in when switching to dark */}
      <div
        className={clsx(
          'absolute inset-0 flex items-center justify-center',
          'transition-all duration-500 ease-in-out',
          resolvedTheme === 'dark'
            ? 'rotate-0 scale-100 opacity-100'
            : '-rotate-90 scale-0 opacity-0'
        )}
      >
        <MoonIcon className="text-brand-accent group-hover:text-brand-primary transition-colors duration-300" size={20} />
      </div>
    </button>
  );
}
