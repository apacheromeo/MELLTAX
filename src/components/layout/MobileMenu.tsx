/**
 * MobileMenu Component
 * Slide-out drawer menu for mobile devices
 * Premium design with smooth animations and Supabase auth
 */

'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { CalculatorIcon } from '@/components/icons/CalculatorIcon';
import { ProfitIcon } from '@/components/icons/ProfitIcon';
import { VatIcon } from '@/components/icons/VatIcon';
import { SalaryIcon } from '@/components/icons/SalaryIcon';
import { ExpenseIcon } from '@/components/icons/ExpenseIcon';
import { useSupabaseUser } from '@/hooks/useSupabaseUser';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  locale: 'th' | 'en';
  onLocaleChange: (locale: 'th' | 'en') => void;
  onThemeToggle: () => void;
  theme: 'light' | 'dark';
  isSignedIn: boolean;
  onAuth: () => void;
}

const tools = [
  {
    id: 'withholding-tax',
    href: '/tools/withholding-tax',
    icon: CalculatorIcon,
    labelTh: 'คำนวณภาษีหัก ณ ที่จ่าย',
    labelEn: 'Withholding Tax',
  },
  {
    id: 'profit',
    href: '/tools/profit',
    icon: ProfitIcon,
    labelTh: 'คำนวณกำไร',
    labelEn: 'Profit Calculator',
  },
  {
    id: 'vat',
    href: '/tools/vat',
    icon: VatIcon,
    labelTh: 'VAT',
    labelEn: 'VAT Calculator',
  },
  {
    id: 'salary',
    href: '/tools/salary',
    icon: SalaryIcon,
    labelTh: 'เงินเดือน',
    labelEn: 'Salary Calculator',
  },
  {
    id: 'expense',
    href: '/tools/expense',
    icon: ExpenseIcon,
    labelTh: 'ค่าใช้จ่าย',
    labelEn: 'Expense Calculator',
  },
];

const navLinks = [
  { href: '/planner', labelTh: 'วางแผนภาษี', labelEn: 'Planner' },
  { href: '/history', labelTh: 'ประวัติ', labelEn: 'History' },
  { href: '/about', labelTh: 'เกี่ยวกับ', labelEn: 'About' },
];

export function MobileMenu({
  isOpen,
  onClose,
  locale,
  onLocaleChange,
  onThemeToggle,
  theme,
  isSignedIn,
  onAuth,
}: MobileMenuProps) {
  const { user } = useSupabaseUser();

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-200"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white dark:bg-slate-900 shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close menu"
            >
              <CloseIcon size={20} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Tools Section */}
          <div className="px-6 py-4">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              {locale === 'th' ? 'เครื่องมือ' : 'Tools'}
            </h3>
            <div className="space-y-1">
              {tools.map((tool) => {
                const Icon = tool.icon;
                const label = locale === 'th' ? tool.labelTh : tool.labelEn;

                return (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Icon size={18} className="text-gray-500 dark:text-gray-400" />
                    <span className="text-sm font-medium">{label}</span>
                  </Link>
                );
              })}
              
              <Link
                href="/tools"
                onClick={onClose}
                className="flex items-center justify-center px-3 py-2.5 mt-2 text-sm font-semibold text-[#00B894] hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                {locale === 'th' ? 'ดูทั้งหมด' : 'View All'} →
              </Link>
            </div>
          </div>

          <div className="h-px bg-gray-200 dark:bg-slate-700 mx-6" />

          {/* Navigation Links */}
          <div className="px-6 py-4">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const label = locale === 'th' ? link.labelTh : link.labelEn;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="block px-3 py-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg transition-colors font-medium"
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="h-px bg-gray-200 dark:bg-slate-700 mx-6" />

          {/* Settings */}
          <div className="px-6 py-4 space-y-3">
            {/* Language Switcher */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {locale === 'th' ? 'ภาษา' : 'Language'}
              </span>
              <div className="flex gap-1 bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
                <button
                  onClick={() => onLocaleChange('th')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    locale === 'th'
                      ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  TH
                </button>
                <button
                  onClick={() => onLocaleChange('en')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    locale === 'en'
                      ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {locale === 'th' ? 'ธีม' : 'Theme'}
              </span>
              <button
                onClick={onThemeToggle}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-slate-800 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              >
                {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
              </button>
            </div>
          </div>

          <div className="h-px bg-gray-200 dark:bg-slate-700 mx-6" />

          {/* User Info (if signed in) */}
          {user && (
            <div className="px-6 py-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                {user.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt={user.user_metadata?.full_name || 'User'}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#00B894] flex items-center justify-center text-white font-bold">
                    {user.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Auth Button */}
          <div className="px-6 py-4 mt-auto">
            <button
              onClick={() => {
                onAuth();
                onClose();
              }}
              className="w-full px-4 py-3 bg-[#00B894] hover:bg-[#00A080] text-white font-semibold rounded-xl transition-colors shadow-sm"
            >
              {user
                ? (locale === 'th' ? 'ออกจากระบบ' : 'Sign Out')
                : (locale === 'th' ? 'เข้าสู่ระบบด้วย Google' : 'Sign in with Google')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
