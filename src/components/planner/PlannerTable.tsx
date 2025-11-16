/**
 * PlannerTable component
 * Phase 4: Premium table displaying list of invoices in the tax planner
 * Zebra striping, premium borders, hover effects
 */

'use client';

import { PlannerItem } from '@/types/planner';
import { getCategoryById } from '@/lib/tax/withholdingRates';

interface PlannerTableProps {
  items: PlannerItem[];
  locale: 'th' | 'en';
  translations: {
    date: string;
    category: string;
    gross: string;
    taxRate: string;
    tax: string;
    net: string;
    delete: string;
    noItems: string;
  };
  onDelete: (id: string) => void;
}

export function PlannerTable({
  items,
  locale,
  translations,
  onDelete,
}: PlannerTableProps) {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat(locale === 'th' ? 'th-TH' : 'en-US', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString(
      locale === 'th' ? 'th-TH' : 'en-US',
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }
    );
  };

  const handleDelete = (id: string) => {
    if (
      confirm(
        locale === 'th'
          ? 'คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?'
          : 'Are you sure you want to delete this item?'
      )
    ) {
      onDelete(id);
    }
  };

  // Empty state
  if (items.length === 0) {
    return (
      <div className="rounded-2xl bg-brand-light-surface dark:bg-brand-dark-surface border-2 border-brand-light-border dark:border-brand-dark-border p-12 text-center">
        <div className="mx-auto w-20 h-20 bg-brand-primary-50 dark:bg-brand-primary-900/20 rounded-2xl flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-brand-primary dark:text-brand-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-brand-text dark:text-brand-text-dark mb-2">
          {translations.noItems}
        </h3>
        <p className="text-brand-text-light dark:text-brand-text-dark-light">
          {locale === 'th'
            ? 'เพิ่มรายการแรกของคุณเพื่อเริ่มต้นวางแผนภาษี'
            : 'Add your first item to start planning your taxes'}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-brand-light-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-surface">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-brand-light-hover dark:bg-brand-dark-hover border-b-2 border-brand-light-border dark:border-brand-dark-border">
              <th className="text-left py-4 px-6 text-sm font-semibold text-brand-primary dark:text-brand-text-dark tracking-wide">
                {translations.date}
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-brand-primary dark:text-brand-text-dark tracking-wide">
                {translations.category}
              </th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-brand-primary dark:text-brand-text-dark tracking-wide">
                {translations.gross}
              </th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-brand-primary dark:text-brand-text-dark tracking-wide">
                {translations.taxRate}
              </th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-brand-primary dark:text-brand-text-dark tracking-wide">
                {translations.tax}
              </th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-brand-primary dark:text-brand-text-dark tracking-wide">
                {translations.net}
              </th>
              <th className="text-center py-4 px-6 text-sm font-semibold text-brand-primary dark:text-brand-text-dark tracking-wide">
                {translations.delete}
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              const category = getCategoryById(item.categoryId);
              const categoryName = category
                ? locale === 'th'
                  ? category.labelTh
                  : category.labelEn
                : item.categoryId;

              return (
                <tr
                  key={item.id}
                  className={`border-b border-brand-light-border dark:border-brand-dark-border hover:bg-brand-light-hover dark:hover:bg-brand-dark-hover transition-colors duration-150 ${
                    index % 2 === 0
                      ? 'bg-white dark:bg-brand-dark-surface'
                      : 'bg-brand-light-surface/30 dark:bg-brand-dark-surface/50'
                  }`}
                >
                  <td className="py-4 px-6 text-sm text-brand-text dark:text-brand-text-dark">
                    {formatDate(item.invoiceDate)}
                  </td>
                  <td className="py-4 px-6 text-sm text-brand-text-light dark:text-brand-text-dark-light">
                    <div>
                      {categoryName}
                      {item.description && (
                        <div className="text-xs text-brand-text-lighter dark:text-brand-text-dark-lighter mt-1">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-right tabular-nums font-medium text-brand-text dark:text-brand-text-dark">
                    {formatCurrency(item.gross)}
                  </td>
                  <td className="py-4 px-6 text-sm text-right tabular-nums text-brand-text dark:text-brand-text-dark">
                    {item.taxRate}%
                  </td>
                  <td className="py-4 px-6 text-sm text-right tabular-nums font-semibold text-brand-accent dark:text-brand-accent">
                    {formatCurrency(item.tax)}
                  </td>
                  <td className="py-4 px-6 text-sm text-right tabular-nums font-semibold text-brand-primary dark:text-brand-text-dark">
                    {formatCurrency(item.net)}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-150"
                      aria-label={translations.delete}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
