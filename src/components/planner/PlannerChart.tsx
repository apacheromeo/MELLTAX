/**
 * PlannerChart component
 * Phase 4: Recharts bar chart visualizing tax amounts by invoice
 * Premium design with empty state
 */

'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '@/components/common/Card';
import { PlannerItem } from '@/types/planner';

interface PlannerChartProps {
  items: PlannerItem[];
  locale: 'th' | 'en';
  translations: {
    title: string;
    gross: string;
    tax: string;
    net: string;
    emptyChart: string;
  };
}

export function PlannerChart({
  items,
  locale,
  translations,
}: PlannerChartProps) {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat(locale === 'th' ? 'th-TH' : 'en-US', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString(
      locale === 'th' ? 'th-TH' : 'en-US',
      {
        month: 'short',
        day: 'numeric',
      }
    );
  };

  // Prepare chart data
  const chartData = items.map((item) => ({
    name: formatDate(item.invoiceDate),
    [translations.gross]: item.gross,
    [translations.tax]: item.tax,
    [translations.net]: item.net,
  }));

  // Empty state
  if (items.length === 0) {
    return (
      <Card variant="dashboard" padding="lg">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-brand-primary dark:text-brand-text-dark mb-1 tracking-tight">
            {translations.title}
          </h2>
        </div>
        <div className="py-16 text-center">
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-brand-text dark:text-brand-text-dark mb-2">
            {translations.emptyChart}
          </h3>
          <p className="text-brand-text-light dark:text-brand-text-dark-light">
            {locale === 'th'
              ? 'เพิ่มรายการเพื่อดูกราฟแสดงภาพรวมภาษี'
              : 'Add items to see tax visualization chart'}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="dashboard" padding="lg">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-brand-primary dark:text-brand-text-dark mb-1 tracking-tight">
          {translations.title}
        </h2>
        <p className="text-sm text-brand-text-light dark:text-brand-text-dark-light">
          {locale === 'th'
            ? 'แสดงภาพรวมภาษีแต่ละรายการ'
            : 'Tax overview for each invoice'}
        </p>
      </div>

      <div className="mt-6">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              className="dark:opacity-20"
            />
            <XAxis
              dataKey="name"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              stroke="#9ca3af"
              className="dark:opacity-60"
            />
            <YAxis
              tick={{ fill: '#6b7280', fontSize: 12 }}
              stroke="#9ca3af"
              className="dark:opacity-60"
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value: number) => formatCurrency(value)}
            />
            <Legend
              wrapperStyle={{
                paddingTop: '20px',
              }}
            />
            <Bar
              dataKey={translations.gross}
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey={translations.tax}
              fill="#ef4444"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey={translations.net}
              fill="#22c55e"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
