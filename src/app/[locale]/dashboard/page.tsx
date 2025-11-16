/**
 * Tax Dashboard Page
 * Overview of tax deadlines and quick actions
 */

'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { AdBanner } from '@/components/ads/AdBanner';
import { AdInContent } from '@/components/ads/AdInContent';
import { Locale } from '@/lib/i18n/config';
import {
  getUpcomingDeadlines,
  getTodayDeadlines,
  getDaysUntilDeadline,
  getDeadlinesForMonth,
  type TaxDeadline,
} from '@/lib/tax/taxCalendar';
import { getDaysUntilVATRateChange } from '@/lib/tax/vatCalculator';

export default function DashboardPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'th';

  const t = useTranslations('common');
  const tDash = useTranslations('dashboard');

  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const upcomingDeadlines = getUpcomingDeadlines(10);
  const todayDeadlines = getTodayDeadlines();
  const thisMonthDeadlines = getDeadlinesForMonth(currentMonth, currentYear);
  const daysUntilVATChange = getDaysUntilVATRateChange();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300';
      case 'low':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300';
      default:
        return 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'personal':
        return 'text-blue-600 dark:text-blue-400';
      case 'corporate':
        return 'text-purple-600 dark:text-purple-400';
      case 'vat':
        return 'text-green-600 dark:text-green-400';
      case 'social-security':
        return 'text-orange-600 dark:text-orange-400';
      default:
        return 'text-neutral-600 dark:text-neutral-400';
    }
  };

  const formatDate = (deadline: TaxDeadline) => {
    if (deadline.month) {
      return `${deadline.day}/${deadline.month}`;
    }
    return `${deadline.day} ${locale === 'th' ? 'ของทุกเดือน' : 'of each month'}`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="container-responsive py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-white mb-3 tracking-tight">
            {tDash('title')}
          </h1>
          <p className="text-base text-neutral-600 dark:text-neutral-400">
            {tDash('description')}
          </p>
        </div>

        {/* Top Ad */}
        <AdBanner className="mb-8" />

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            {tDash('quickActions')}
          </h2>

          <div className="grid md:grid-cols-4 gap-3">
            <Link href="/income-tax">
              <Button variant="outline" size="md" className="w-full">
                {tDash('calculateIncomeTax')}
              </Button>
            </Link>

            <Link href="/vat">
              <Button variant="outline" size="md" className="w-full">
                {tDash('calculateVAT')}
              </Button>
            </Link>

            <Link href="/social-security">
              <Button variant="outline" size="md" className="w-full">
                {tDash('calculateSocialSecurity')}
              </Button>
            </Link>

            <Link href="/">
              <Button variant="outline" size="md" className="w-full">
                {t('withholdingTax')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Important Alerts */}
        {daysUntilVATChange > 0 && daysUntilVATChange < 90 && (
          <div className="mb-8">
            <Card variant="bordered" padding="lg">
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                <h3 className="text-sm font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                  {locale === 'th' ? 'แจ้งเตือนสำคัญ' : 'Important Notice'}
                </h3>
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  {locale === 'th'
                    ? `อัตรา VAT 7% จะสิ้นสุดในอีก ${daysUntilVATChange} วัน (30 กันยายน 2568)`
                    : `VAT rate 7% will expire in ${daysUntilVATChange} days (September 30, 2025)`}
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* Today's Deadlines */}
        {todayDeadlines.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
              {tDash('todayDeadlines')}
            </h2>

            <Card variant="elevated" padding="lg">
              <div className="space-y-3">
                {todayDeadlines.map((deadline) => (
                  <div
                    key={deadline.id}
                    className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-red-900 dark:text-red-100 mb-1">
                          {locale === 'th' ? deadline.titleTh : deadline.title}
                        </h3>
                        <p className="text-sm text-red-700 dark:text-red-300">
                          {locale === 'th' ? deadline.descriptionTh : deadline.description}
                        </p>
                        {deadline.penalty && (
                          <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                            {tDash('penalty')}:{' '}
                            {locale === 'th' ? deadline.penaltyTh : deadline.penalty}
                          </p>
                        )}
                      </div>
                      <span className="text-xs font-medium text-red-700 dark:text-red-300 whitespace-nowrap ml-4">
                        {tDash('dueToday')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Upcoming Deadlines */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            {tDash('upcomingDeadlines')}
          </h2>

          <Card variant="bordered" padding="lg">
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline) => {
                const daysUntil = getDaysUntilDeadline(deadline);
                const isUrgent = daysUntil <= 7;

                return (
                  <div
                    key={deadline.id}
                    className={`p-4 border rounded-md ${
                      isUrgent
                        ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
                        : 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className={`font-semibold ${
                              isUrgent
                                ? 'text-orange-900 dark:text-orange-100'
                                : 'text-neutral-900 dark:text-white'
                            }`}
                          >
                            {locale === 'th' ? deadline.titleTh : deadline.title}
                          </h3>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full border ${getPriorityColor(
                              deadline.priority
                            )}`}
                          >
                            {tDash(deadline.priority)}
                          </span>
                        </div>

                        <p
                          className={`text-sm ${
                            isUrgent
                              ? 'text-orange-700 dark:text-orange-300'
                              : 'text-neutral-600 dark:text-neutral-400'
                          }`}
                        >
                          {locale === 'th' ? deadline.descriptionTh : deadline.description}
                        </p>

                        <div className="flex gap-4 mt-2 text-xs">
                          <span className={getTypeColor(deadline.type)}>
                            {tDash(deadline.type)}
                          </span>
                          <span className="text-neutral-500 dark:text-neutral-500">
                            {formatDate(deadline)}
                          </span>
                        </div>

                        {deadline.penalty && (
                          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
                            {tDash('penalty')}:{' '}
                            {locale === 'th' ? deadline.penaltyTh : deadline.penalty}
                          </p>
                        )}
                      </div>

                      <div className="text-right">
                        <span
                          className={`text-sm font-medium ${
                            isUrgent
                              ? 'text-orange-700 dark:text-orange-300'
                              : 'text-neutral-700 dark:text-neutral-300'
                          }`}
                        >
                          {daysUntil === 0
                            ? tDash('dueToday')
                            : tDash('daysUntil').replace('{days}', daysUntil.toString())}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* In-Content Ad */}
        <AdInContent className="mb-8" />

        {/* This Month's Deadlines */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            {tDash('thisMonth')}
          </h2>

          <Card variant="bordered" padding="lg">
            <div className="space-y-2">
              {thisMonthDeadlines.map((deadline) => (
                <div
                  key={deadline.id}
                  className="flex items-center justify-between py-3 border-b border-neutral-100 dark:border-neutral-900 last:border-0"
                >
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900 dark:text-white">
                      {locale === 'th' ? deadline.titleTh : deadline.title}
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                      {locale === 'th' ? deadline.descriptionTh : deadline.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">
                      {formatDate(deadline)}
                    </span>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                      {tDash(deadline.frequency)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
