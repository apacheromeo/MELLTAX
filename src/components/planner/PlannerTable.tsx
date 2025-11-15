/**
 * PlannerTable component
 * Table displaying list of invoices in the tax planner
 */

'use client';

import { Invoice } from '@/types/planner';
import { formatCurrency } from '@/lib/tax/calculateWithholding';
import { getTaxRate } from '@/lib/tax/withholdingRates';
import { Button } from '@/components/common/Button';

interface PlannerTableProps {
  invoices: Invoice[];
  locale: 'th' | 'en';
  translations: {
    invoiceDate: string;
    category: string;
    grossAmount: string;
    taxRate: string;
    taxAmount: string;
    netAmount: string;
    actions: string;
    noInvoices: string;
    deleteConfirm: string;
  };
  onDelete: (id: string) => void;
}

export function PlannerTable({
  invoices,
  locale,
  translations,
  onDelete,
}: PlannerTableProps) {
  const handleDelete = (id: string) => {
    if (confirm(translations.deleteConfirm)) {
      onDelete(id);
    }
  };

  if (invoices.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
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
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          {translations.noInvoices}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-200 dark:border-gray-700">
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              {translations.invoiceDate}
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              {translations.category}
            </th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              {translations.grossAmount}
            </th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              {translations.taxRate}
            </th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              {translations.taxAmount}
            </th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              {translations.netAmount}
            </th>
            <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              {translations.actions}
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => {
            const categoryConfig = getTaxRate(invoice.category);
            const categoryName = locale === 'th' ? categoryConfig.nameTh : categoryConfig.nameEn;

            return (
              <tr
                key={invoice.id}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                  {new Date(invoice.date).toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                  {categoryName}
                </td>
                <td className="py-3 px-4 text-sm text-right tabular-nums text-gray-900 dark:text-gray-100">
                  {formatCurrency(invoice.grossAmount, locale)}
                </td>
                <td className="py-3 px-4 text-sm text-right tabular-nums text-gray-900 dark:text-gray-100">
                  {invoice.taxRate}%
                </td>
                <td className="py-3 px-4 text-sm text-right tabular-nums font-medium text-primary-600 dark:text-primary-400">
                  {formatCurrency(invoice.taxAmount, locale)}
                </td>
                <td className="py-3 px-4 text-sm text-right tabular-nums font-medium text-gray-900 dark:text-gray-100">
                  {formatCurrency(invoice.netAmount, locale)}
                </td>
                <td className="py-3 px-4 text-center">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(invoice.id)}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
