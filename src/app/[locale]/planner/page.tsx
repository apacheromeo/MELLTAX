/**
 * Tax Planner Page
 * Phase 4: Multi-invoice tax planning with premium dashboard design
 * Auto-calculate tax, show summary, table, and chart
 */

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { PlannerAddForm } from '@/components/planner/PlannerAddForm';
import { PlannerTable } from '@/components/planner/PlannerTable';
import { PlannerSummaryCard } from '@/components/planner/PlannerSummaryCard';
import { PlannerChart } from '@/components/planner/PlannerChart';
import { AdBanner } from '@/components/ads/AdBanner';
import { AdInContent } from '@/components/ads/AdInContent';
import { PlannerItem } from '@/types/planner';
import { Locale } from '@/lib/i18n/config';

export default function PlannerPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'th';

  const t = useTranslations('common');
  const tPlanner = useTranslations('planner');

  // State: planner items
  const [items, setItems] = useState<PlannerItem[]>([]);

  // Add item handler
  const handleAddItem = (item: PlannerItem) => {
    setItems([...items, item]);
  };

  // Delete item handler
  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-brand-light dark:bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 space-y-10">
        {/* Hero Section - Premium SaaS Aesthetic */}
        <div className="relative rounded-3xl bg-gradient-to-br from-brand-light-surface to-brand-light-hover dark:from-brand-dark-surface dark:to-brand-dark-hover border border-brand-light-border dark:border-brand-dark-border shadow-dashboard overflow-hidden">
          <div className="relative p-8 md:p-12 min-h-[200px]">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-brand-accent/10 dark:bg-brand-accent/20 rounded-full border border-brand-accent/20">
              <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              <span className="text-sm font-semibold text-brand-accent">
                {locale === 'th' ? 'วางแผนภาษีอัจฉริยะ' : 'Smart Tax Planning'}
              </span>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-4xl md:text-[42px] font-semibold text-brand-primary dark:text-brand-text-dark mb-4 tracking-tight leading-tight">
                {tPlanner('title')}
              </h1>
              <p className="text-base md:text-lg text-brand-text-light dark:text-brand-text-dark-light leading-relaxed opacity-90 max-w-2xl">
                {tPlanner('subtitle')}
              </p>
            </div>

            {/* Decorative gradient orb */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-brand-accent/10 to-brand-primary/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>

        {/* Top Ad Banner */}
        <AdBanner />

        {/* Add Form + Summary Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Add Form */}
          <PlannerAddForm
            locale={locale}
            translations={{
              title: tPlanner('addFormTitle'),
              date: tPlanner('date'),
              category: tPlanner('category'),
              selectCategory: tPlanner('selectCategory'),
              gross: tPlanner('gross'),
              enterGross: tPlanner('enterGross'),
              taxRate: tPlanner('taxRate'),
              description: tPlanner('description'),
              enterDescription: tPlanner('enterDescription'),
              addButton: tPlanner('addButton'),
            }}
            onAdd={handleAddItem}
          />

          {/* Right: Summary Card */}
          <PlannerSummaryCard
            items={items}
            locale={locale}
            translations={{
              title: tPlanner('summaryTitle'),
              totalGross: tPlanner('totalGross'),
              totalTax: tPlanner('totalTax'),
              totalNet: tPlanner('totalNet'),
              effectiveRate: tPlanner('effectiveRate'),
              itemCount: tPlanner('itemCount'),
            }}
          />
        </div>

        {/* Planner Table */}
        <div>
          <PlannerTable
            items={items}
            locale={locale}
            translations={{
              date: tPlanner('tableDate'),
              category: tPlanner('tableCategory'),
              gross: tPlanner('tableGross'),
              taxRate: tPlanner('tableTaxRate'),
              tax: tPlanner('tableTax'),
              net: tPlanner('tableNet'),
              delete: tPlanner('tableDelete'),
              noItems: tPlanner('tableNoItems'),
            }}
            onDelete={handleDeleteItem}
          />
        </div>

        {/* In-Content Ad */}
        {items.length > 0 && <AdInContent />}

        {/* Planner Chart */}
        <div>
          <PlannerChart
            items={items}
            locale={locale}
            translations={{
              title: tPlanner('chartTitle'),
              gross: tPlanner('chartGross'),
              tax: tPlanner('chartTax'),
              net: tPlanner('chartNet'),
              emptyChart: tPlanner('emptyChart'),
            }}
          />
        </div>
      </div>
    </div>
  );
}
