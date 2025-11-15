/**
 * PlannerChart component
 * Bar chart visualizing tax amounts by invoice using Recharts
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
import { Card, CardHeader, CardBody } from '@/components/common/Card';
import { ChartDataPoint } from '@/types/planner';

interface PlannerChartProps {
  data: ChartDataPoint[];
  locale: 'th' | 'en';
  translations: {
    chartTitle: string;
    grossAmount: string;
    taxAmount: string;
    netAmount: string;
  };
}

export function PlannerChart({
  data,
  locale,
  translations,
}: PlannerChartProps) {
  if (data.length === 0) {
    return null;
  }

  return (
    <Card variant="bordered" padding="lg">
      <CardHeader>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {translations.chartTitle}
        </h3>
      </CardHeader>

      <CardBody>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              stroke="#9ca3af"
            />
            <YAxis
              tick={{ fill: '#6b7280', fontSize: 12 }}
              stroke="#9ca3af"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
              }}
              formatter={(value: number) =>
                new Intl.NumberFormat(locale === 'th' ? 'th-TH' : 'en-US', {
                  style: 'currency',
                  currency: 'THB',
                }).format(value)
              }
            />
            <Legend />
            <Bar
              dataKey="gross"
              name={translations.grossAmount}
              fill="#3b82f6"
            />
            <Bar
              dataKey="tax"
              name={translations.taxAmount}
              fill="#ef4444"
            />
            <Bar
              dataKey="net"
              name={translations.netAmount}
              fill="#22c55e"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}
