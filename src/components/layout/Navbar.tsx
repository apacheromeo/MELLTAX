/**
 * Navbar Component
 * Premium top navigation bar with Tools dropdown
 * Dribbble-inspired SaaS design with Supabase authentication
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoIcon } from '@/components/icons/LogoIcon';
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon';
import { MenuIcon } from '@/components/icons/MenuIcon';
import { ToolsDropdown } from './ToolsDropdown';
import { MobileMenu } from './MobileMenu';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useSupabaseUser } from '@/hooks/useSupabaseUser';
import { supabaseBrowser } from '@/lib/supabase/client';

interface NavbarProps {
  locale: 'th' | 'en';
  onLocaleChange?: (locale: 'th' | 'en') => void;
}

export function Navbar({ locale, onLocaleChange }: NavbarProps) {
  const pathname = usePathname();
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // Supabase authentication
  const { user, loading } = useSupabaseUser();

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useOnClickOutside(dropdownRef, () => setIsToolsOpen(false));

  // Close dropdown on navigation
  useEffect(() => {
    setIsToolsOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close dropdown on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsToolsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLocaleChange = (newLocale: 'th' | 'en') => {
    if (onLocaleChange) {
      onLocaleChange(newLocale);
    }
    // Navigate to new locale
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    window.location.href = newPath;
  };

  // Supabase authentication handlers
  const handleSignIn = async () => {
    try {
      const { error } = await supabaseBrowser.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error('Error signing in:', error.message);
      }
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabaseBrowser.auth.signOut();
      
      if (error) {
        console.error('Error signing out:', error.message);
      }
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleAuth = () => {
    if (user) {
      handleSignOut();
    } else {
      handleSignIn();
    }
  };

  const navLinks = [
    { href: `/${locale}/planner`, labelTh: 'วางแผนภาษี', labelEn: 'Planner' },
    { href: `/${locale}/history`, labelTh: 'ประวัติ', labelEn: 'History' },
    { href: `/${locale}/about`, labelTh: 'เกี่ยวกับ', labelEn: 'About' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-30 h-[72px] bg-white dark:bg-[#0F172A] border-b border-gray-200/50 dark:border-slate-700/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] rounded-b-2xl">
        <div className="max-w-7xl mx-auto px-6 h-full">
          <div className="flex items-center justify-between h-full gap-8">
            {/* Left: Logo */}
            <Link
              href={`/${locale}`}
              className="flex items-center gap-3 group"
            >
              <LogoIcon
                size={32}
                className="text-[#00B894] group-hover:scale-110 transition-transform duration-200"
              />
              <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                MELLTAX
              </span>
            </Link>

            {/* Center: Tools dropdown + Nav links (Desktop) */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Tools Dropdown */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setIsToolsOpen(!isToolsOpen)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-medium transition-colors group"
                  aria-expanded={isToolsOpen}
                  aria-haspopup="menu"
                >
                  <span>{locale === 'th' ? 'เครื่องมือ' : 'Tools'}</span>
                  <ChevronDownIcon
                    size={16}
                    className={`transition-transform duration-200 ${
                      isToolsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <ToolsDropdown
                  isOpen={isToolsOpen}
                  onClose={() => setIsToolsOpen(false)}
                  locale={locale}
                />
              </div>

              {/* Nav Links */}
              {navLinks.map((link) => {
                const label = locale === 'th' ? link.labelTh : link.labelEn;
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-1 py-2 font-medium transition-colors ${
                      isActive
                        ? 'text-gray-900 dark:text-white font-semibold'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#00B894] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right: Language, Theme, Auth (Desktop) */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Language Switcher */}
              <div className="flex gap-1 bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
                <button
                  onClick={() => handleLocaleChange('th')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-150 ${
                    locale === 'th'
                      ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  TH
                </button>
                <button
                  onClick={() => handleLocaleChange('en')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-150 ${
                    locale === 'en'
                      ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={handleThemeToggle}
                className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Toggle theme"
              >
                <span className="text-lg">
                  {theme === 'light' ? '☀️' : '🌙'}
                </span>
              </button>

              {/* Auth Button */}
              {loading ? (
                <div className="w-24 h-10 bg-gray-100 dark:bg-slate-800 rounded-lg animate-pulse" />
              ) : user ? (
                <button
                  onClick={handleAuth}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-700 font-semibold rounded-lg transition-all duration-150"
                >
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt={user.user_metadata?.full_name || 'User'}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#00B894] flex items-center justify-center text-white text-xs font-bold">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  <span className="text-sm max-w-[100px] truncate">
                    {user.user_metadata?.full_name || user.email?.split('@')[0] || locale === 'th' ? 'บัญชี' : 'Account'}
                  </span>
                </button>
              ) : (
                <button
                  onClick={handleAuth}
                  className="px-4 py-2 bg-[#00B894] hover:bg-[#00A080] text-white font-semibold rounded-lg transition-all duration-150 shadow-sm"
                >
                  <span className="text-sm">
                    {locale === 'th' ? 'เข้าสู่ระบบ' : 'Sign in'}
                  </span>
                </button>
              )}
            </div>

            {/* Mobile: Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Open menu"
            >
              <MenuIcon size={24} className="text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        locale={locale}
        onLocaleChange={handleLocaleChange}
        onThemeToggle={handleThemeToggle}
        theme={theme}
        isSignedIn={!!user}
        onAuth={handleAuth}
      />
    </>
  );
}
