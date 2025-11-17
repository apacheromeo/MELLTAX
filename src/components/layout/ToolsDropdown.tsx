/**
 * ToolsDropdown Component
 * Premium dropdown menu for tax calculator tools
 * Dribbble-inspired design with smooth animations
 */

'use client';

import Link from 'next/link';
import { CalculatorIcon } from '@/components/icons/CalculatorIcon';
import { ProfitIcon } from '@/components/icons/ProfitIcon';
import { VatIcon } from '@/components/icons/VatIcon';
import { SalaryIcon } from '@/components/icons/SalaryIcon';
import { ExpenseIcon } from '@/components/icons/ExpenseIcon';

interface ToolsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  locale: 'th' | 'en';
}

const getTools = (locale: string) => [
  {
    id: 'withholding-tax',
    href: `/${locale}/tools/withholding-tax`,
    icon: CalculatorIcon,
    labelTh: 'คำนวณภาษีหัก ณ ที่จ่าย',
    labelEn: 'Withholding Tax Calculator',
  },
  {
    id: 'profit',
    href: `/${locale}/tools/profit`,
    icon: ProfitIcon,
    labelTh: 'คำนวณกำไร',
    labelEn: 'Profit Calculator',
  },
  {
    id: 'vat',
    href: `/${locale}/tools/vat`,
    icon: VatIcon,
    labelTh: 'คำนวณภาษีมูลค่าเพิ่ม',
    labelEn: 'VAT Calculator',
  },
  {
    id: 'salary',
    href: `/${locale}/tools/salary`,
    icon: SalaryIcon,
    labelTh: 'คำนวณเงินเดือน',
    labelEn: 'Salary Calculator',
  },
  {
    id: 'expense',
    href: `/${locale}/tools/expense`,
    icon: ExpenseIcon,
    labelTh: 'คำนวณค่าใช้จ่ายรายเดือน',
    labelEn: 'Monthly Expense Calculator',
  },
];

export function ToolsDropdown({ isOpen, onClose, locale }: ToolsDropdownProps) {
  if (!isOpen) return null;

  const tools = getTools(locale);

  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] border border-gray-200/50 dark:border-slate-700/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50"
      role="menu"
      aria-orientation="vertical"
    >
      {/* Tools List */}
      <div className="py-2">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const label = locale === 'th' ? tool.labelTh : tool.labelEn;

          return (
            <Link
              key={tool.id}
              href={tool.href}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors duration-150"
              role="menuitem"
            >
              <Icon size={20} className="text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium">{label}</span>
            </Link>
          );
        })}
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-slate-700" />

      {/* View All Tools */}
      <div className="py-2">
        <Link
          href={`/${locale}/tools`}
          onClick={onClose}
          className="flex items-center justify-center px-4 py-3 text-sm font-semibold text-[#00B894] hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors duration-150"
          role="menuitem"
        >
          {locale === 'th' ? 'ดูเครื่องมือทั้งหมด' : 'View All Tools'} →
        </Link>
      </div>
    </div>
  );
}
