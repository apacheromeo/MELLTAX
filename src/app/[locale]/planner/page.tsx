/**
 * Tax Planner Page
 * Phase 4: Multi-invoice tax planning with premium dashboard design
 * Auto-calculate tax, show summary, table, and chart
 * Phase 6: Added Save/Load functionality with Supabase
 */

'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { PlannerAddForm } from '@/components/planner/PlannerAddForm';
import { PlannerTable } from '@/components/planner/PlannerTable';
import { PlannerSummaryCard } from '@/components/planner/PlannerSummaryCard';
import { PlannerChart } from '@/components/planner/PlannerChart';
import { AdBanner } from '@/components/ads/AdBanner';
import { AdInContent } from '@/components/ads/AdInContent';
import { Card } from '@/components/common/Card';
import { PlannerItem } from '@/types/planner';
import { Locale } from '@/lib/i18n/config';
import { useSupabaseUser } from '@/hooks/useSupabaseUser';
import { createPlan, loadRecentPlans, deletePlan, type PlannerPlan } from '@/lib/planner/plannerService';

export default function PlannerPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'th';

  const t = useTranslations('common');
  const tPlanner = useTranslations('planner');
  const { user } = useSupabaseUser();

  // State: planner items
  const [items, setItems] = useState<PlannerItem[]>([]);
  const [recentPlans, setRecentPlans] = useState<PlannerPlan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load recent plans on mount
  useEffect(() => {
    if (user) {
      loadPlans();
    }
  }, [user]);

  const loadPlans = async () => {
    setLoadingPlans(true);
    const result = await loadRecentPlans(5);
    if (result.success) {
      setRecentPlans(result.plans);
    }
    setLoadingPlans(false);
  };

  // Add item handler
  const handleAddItem = (item: PlannerItem) => {
    setItems([...items, item]);
  };

  // Delete item handler
  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Save current plan
  const handleSavePlan = async () => {
    if (!user) {
      setSaveMessage({ type: 'error', text: tPlanner('savePlanButton.requireLogin') });
      setTimeout(() => setSaveMessage(null), 3000);
      return;
    }

    if (items.length === 0) {
      setSaveMessage({
        type: 'error',
        text: locale === 'th' ? 'กรุณาเพิ่มรายการก่อนบันทึกแผน' : 'Please add items before saving plan',
      });
      setTimeout(() => setSaveMessage(null), 3000);
      return;
    }

    const planName = prompt(tPlanner('savePlanButton.promptName'));
    if (!planName) return;

    // Get period from items (first and last invoice dates)
    const dates = items.map((item) => item.invoiceDate).filter(Boolean).sort();
    const periodStart = dates.length > 0 ? dates[0] : null;
    const periodEnd = dates.length > 0 ? dates[dates.length - 1] : null;

    setSaving(true);
    setSaveMessage(null);

    const result = await createPlan(planName, periodStart, periodEnd, items);

    if (result.success) {
      setSaveMessage({ type: 'success', text: tPlanner('savePlanButton.success') });
      setTimeout(() => setSaveMessage(null), 3000);
      loadPlans(); // Reload plans list
    } else {
      setSaveMessage({ type: 'error', text: tPlanner('savePlanButton.error') });
      setTimeout(() => setSaveMessage(null), 3000);
    }

    setSaving(false);
  };

  // Load a plan
  const handleLoadPlan = (plan: PlannerPlan) => {
    setItems(plan.items);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete a plan
  const handleDeletePlan = async (planId: string) => {
    if (!confirm(locale === 'th' ? 'คุณแน่ใจหรือไม่ว่าต้องการลบแผนนี้?' : 'Are you sure you want to delete this plan?')) {
      return;
    }

    const result = await deletePlan(planId);
    if (result.success) {
      loadPlans(); // Reload plans list
    }
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

        {/* Save Plan Button & Message */}
        {items.length > 0 && (
          <div className="space-y-4">
            {saveMessage && (
              <div className={`rounded-xl p-4 ${
                saveMessage.type === 'success'
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                  : 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
              }`}>
                <p className={`text-sm font-medium ${
                  saveMessage.type === 'success'
                    ? 'text-green-800 dark:text-green-200'
                    : 'text-amber-800 dark:text-amber-200'
                }`}>
                  {saveMessage.type === 'success' ? '✓' : 'ⓘ'} {saveMessage.text}
                </p>
              </div>
            )}

            <button
              onClick={handleSavePlan}
              disabled={saving || !user}
              className="w-full px-6 py-3 bg-brand-accent dark:bg-brand-accent text-white font-semibold rounded-xl hover:bg-brand-accent/90 dark:hover:bg-brand-accent/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {saving
                ? (locale === 'th' ? 'กำลังบันทึก...' : 'Saving...')
                : tPlanner('savePlanButton.button')}
            </button>

            {!user && (
              <p className="text-xs text-center text-brand-text-light dark:text-brand-text-dark-light">
                {tPlanner('savePlanButton.requireLogin')}
              </p>
            )}
          </div>
        )}

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

        {/* Recent Plans Section */}
        {user && recentPlans.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-brand-primary dark:text-brand-text-dark tracking-tight">
              {tPlanner('recentPlans.title')}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentPlans.map((plan) => {
                const itemCount = plan.items.length;
                const totalGross = plan.items.reduce((sum, item) => sum + item.gross, 0);
                const totalTax = plan.items.reduce((sum, item) => sum + item.tax, 0);

                return (
                  <Card key={plan.id} variant="dashboard" padding="lg">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-brand-text dark:text-brand-text-dark mb-1">
                          {plan.name}
                        </h3>
                        <p className="text-xs text-brand-text-lighter dark:text-brand-text-dark-lighter">
                          {tPlanner('recentPlans.itemCount').replace('{count}', String(itemCount))}
                        </p>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-brand-text-light dark:text-brand-text-dark-light">
                            {tPlanner('totalGross')}
                          </span>
                          <span className="font-semibold text-brand-text dark:text-brand-text-dark">
                            {new Intl.NumberFormat(locale === 'th' ? 'th-TH' : 'en-US', {
                              style: 'currency',
                              currency: 'THB',
                            }).format(totalGross)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-text-light dark:text-brand-text-dark-light">
                            {tPlanner('totalTax')}
                          </span>
                          <span className="font-semibold text-brand-accent">
                            {new Intl.NumberFormat(locale === 'th' ? 'th-TH' : 'en-US', {
                              style: 'currency',
                              currency: 'THB',
                            }).format(totalTax)}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => handleLoadPlan(plan)}
                          className="flex-1 px-4 py-2 bg-brand-accent text-white font-medium rounded-lg hover:bg-brand-accent/90 transition-all duration-200 text-sm"
                        >
                          {tPlanner('recentPlans.loadButton')}
                        </button>
                        <button
                          onClick={() => handleDeletePlan(plan.id)}
                          className="px-4 py-2 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 font-medium rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 text-sm"
                        >
                          {tPlanner('recentPlans.deleteButton')}
                        </button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {user && !loadingPlans && recentPlans.length === 0 && items.length === 0 && (
          <Card variant="dashboard" padding="lg">
            <p className="text-center text-brand-text-light dark:text-brand-text-dark-light py-8">
              {tPlanner('recentPlans.empty')}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
