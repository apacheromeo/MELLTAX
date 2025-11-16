/**
 * Tax Planner Page
 * Multi-invoice tax planning with charts
 */

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { PlannerTable } from '@/components/planner/PlannerTable';
import { PlannerSummaryCard } from '@/components/planner/PlannerSummaryCard';
import { PlannerChart } from '@/components/planner/PlannerChart';
import { AdBanner } from '@/components/ads/AdBanner';
import { AdInContent } from '@/components/ads/AdInContent';
import { Invoice, PlannerSummary, ChartDataPoint } from '@/types/planner';
import { PaymentCategoryLegacy } from '@/types/tax';
import { TAX_RATES } from '@/lib/tax/withholdingRates';
import { Locale } from '@/lib/i18n/config';

export default function PlannerPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'th';

  const t = useTranslations('common');
  const tPlanner = useTranslations('planner');

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [newInvoice, setNewInvoice] = useState({
    date: new Date().toISOString().split('T')[0],
    category: 'service_general' as PaymentCategoryLegacy,
    grossAmount: '',
    taxRate: '3',
  });

  const categoryOptions = Object.entries(TAX_RATES).map(([key, cat]) => ({
    value: key,
    label: locale === 'th' ? cat.nameTh : cat.nameEn,
  }));

  // Calculate summary
  const calculateSummary = (): PlannerSummary => {
    if (invoices.length === 0) {
      return {
        totalGross: 0,
        totalTax: 0,
        totalNet: 0,
        effectiveTaxRate: 0,
        invoiceCount: 0,
      };
    }

    const totalGross = invoices.reduce((sum, inv) => sum + inv.grossAmount, 0);
    const totalTax = invoices.reduce((sum, inv) => sum + inv.taxAmount, 0);
    const totalNet = invoices.reduce((sum, inv) => sum + inv.netAmount, 0);
    const effectiveTaxRate = totalGross > 0 ? (totalTax / totalGross) * 100 : 0;

    return {
      totalGross,
      totalTax,
      totalNet,
      effectiveTaxRate,
      invoiceCount: invoices.length,
    };
  };

  // Prepare chart data
  const prepareChartData = (): ChartDataPoint[] => {
    return invoices.map((inv, index) => ({
      name: `#${index + 1}`,
      gross: inv.grossAmount,
      tax: inv.taxAmount,
      net: inv.netAmount,
    }));
  };

  const handleAddInvoice = () => {
    const grossAmount = parseFloat(newInvoice.grossAmount);
    const taxRate = parseFloat(newInvoice.taxRate);

    if (!grossAmount || grossAmount <= 0 || !taxRate) {
      alert(locale === 'th' ? 'กรุณากรอกข้อมูลให้ครบถ้วน' : 'Please fill in all fields');
      return;
    }

    const taxAmount = grossAmount * (taxRate / 100);
    const netAmount = grossAmount - taxAmount;

    const invoice: Invoice = {
      id: Date.now().toString(),
      date: newInvoice.date,
      category: newInvoice.category,
      grossAmount,
      taxRate,
      taxAmount,
      netAmount,
    };

    setInvoices([...invoices, invoice]);

    // Reset form
    setNewInvoice({
      date: new Date().toISOString().split('T')[0],
      category: 'service_general',
      grossAmount: '',
      taxRate: '3',
    });
  };

  const handleDeleteInvoice = (id: string) => {
    setInvoices(invoices.filter((inv) => inv.id !== id));
  };

  // Auto-update tax rate when category changes
  const handleCategoryChange = (category: PaymentCategoryLegacy) => {
    const categoryConfig = TAX_RATES[category];
    if (categoryConfig) {
      setNewInvoice({
        ...newInvoice,
        category,
        taxRate: categoryConfig.rate.toString(),
      });
    }
  };

  const summary = calculateSummary();
  const chartData = prepareChartData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light-bg via-white to-accent-50 dark:from-brand-dark-bg dark:via-neutral-900 dark:to-neutral-800">
      <div className="container-responsive py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 md:mb-12 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-accent-600 to-brand-primary mb-4 animate-in slide-in-from-top-4 duration-700">
            {tPlanner('title')}
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto animate-in slide-in-from-top-6 duration-700">
            {tPlanner('description')}
          </p>
        </div>

        {/* Top Ad */}
        <AdBanner className="mb-8" />

      {/* Add Invoice Form */}
      <Card variant="elevated" padding="lg" className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {tPlanner('addInvoice')}
        </h2>

        <div className="grid md:grid-cols-4 gap-4">
          <Input
            label={tPlanner('invoiceDate')}
            type="date"
            value={newInvoice.date}
            onChange={(e) =>
              setNewInvoice({ ...newInvoice, date: e.target.value })
            }
          />

          <Select
            label={tPlanner('category')}
            value={newInvoice.category}
            onChange={(e) =>
              handleCategoryChange(e.target.value as PaymentCategoryLegacy)
            }
            options={categoryOptions}
          />

          <Input
            label={tPlanner('grossAmount')}
            type="number"
            step="0.01"
            value={newInvoice.grossAmount}
            onChange={(e) =>
              setNewInvoice({ ...newInvoice, grossAmount: e.target.value })
            }
            placeholder="10000"
            rightIcon={<span className="text-sm">฿</span>}
          />

          <Input
            label={tPlanner('taxRate')}
            type="number"
            step="0.1"
            value={newInvoice.taxRate}
            onChange={(e) =>
              setNewInvoice({ ...newInvoice, taxRate: e.target.value })
            }
            placeholder="3.0"
            rightIcon={<span className="text-sm">%</span>}
          />
        </div>

        <div className="mt-4">
          <Button variant="primary" size="lg" onClick={handleAddInvoice}>
            {t('add')}
          </Button>
        </div>
      </Card>

      {/* Summary */}
      {invoices.length > 0 && (
        <div className="mb-8">
          <PlannerSummaryCard
            summary={summary}
            locale={locale}
            translations={{
              summary: tPlanner('summary'),
              totalGross: tPlanner('totalGross'),
              totalTax: tPlanner('totalTax'),
              totalNet: tPlanner('totalNet'),
              effectiveTaxRate: tPlanner('effectiveTaxRate'),
              invoiceCount: tPlanner('invoiceCount'),
            }}
          />
        </div>
      )}

      {/* Invoices Table */}
      <Card variant="bordered" padding="lg" className="mb-8">
        <PlannerTable
          invoices={invoices}
          locale={locale}
          translations={{
            invoiceDate: tPlanner('invoiceDate'),
            category: tPlanner('category'),
            grossAmount: tPlanner('grossAmount'),
            taxRate: tPlanner('taxRate'),
            taxAmount: tPlanner('taxAmount'),
            netAmount: tPlanner('netAmount'),
            actions: tPlanner('actions'),
            noInvoices: tPlanner('noInvoices'),
            deleteConfirm: tPlanner('deleteConfirm'),
          }}
          onDelete={handleDeleteInvoice}
        />
      </Card>

        {/* In-Content Ad */}
        {invoices.length > 0 && <AdInContent className="mb-8" />}

        {/* Chart */}
        {invoices.length > 0 && (
          <PlannerChart
            data={chartData}
            locale={locale}
            translations={{
              chartTitle: tPlanner('chartTitle'),
              grossAmount: tPlanner('grossAmount'),
              taxAmount: tPlanner('taxAmount'),
              netAmount: tPlanner('netAmount'),
            }}
          />
        )}
      </div>
    </div>
  );
}
