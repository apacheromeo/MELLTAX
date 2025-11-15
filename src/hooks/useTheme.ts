/**
 * Theme hook for dark/light mode toggle
 */

'use client';

import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Get saved theme from localStorage
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) {
      setTheme(saved);
    }

    // Get system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const systemTheme = mediaQuery.matches ? 'dark' : 'light';

    // Set initial resolved theme
    const initialResolved = saved === 'system' || !saved ? systemTheme : saved;
    setResolvedTheme(initialResolved);
    applyTheme(initialResolved);

    // Listen for system theme changes
    const handler = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? 'dark' : 'light';
      if (theme === 'system') {
        setResolvedTheme(newSystemTheme);
        applyTheme(newSystemTheme);
      }
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme]);

  const applyTheme = (t: 'light' | 'dark') => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(t);
  };

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setResolvedTheme(systemTheme);
      applyTheme(systemTheme);
    } else {
      setResolvedTheme(newTheme);
      applyTheme(newTheme);
    }
  };

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    changeTheme(newTheme);
  };

  return {
    theme,
    resolvedTheme,
    setTheme: changeTheme,
    toggleTheme,
  };
}
