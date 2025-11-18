/**
 * Profit Calculator Page
 * Help users calculate selling price based on cost and profit margin
 */

import { getTranslations } from 'next-intl/server';
import { ProfitCalculatorForm } from '@/components/profit/ProfitCalculatorForm';
// import AdBanner from '@/components/ads/AdBanner';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'seo' });

  return {
    title: t('profitTitle'),
    description: t('profitDescription'),
  };
}

export default async function ProfitPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('profit');

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light-bg via-white to-accent-50 dark:from-brand-dark-bg dark:via-neutral-900 dark:to-neutral-800">
      <div className="container-responsive py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-accent-600 to-brand-primary mb-4 animate-in slide-in-from-top-4 duration-700">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto animate-in slide-in-from-top-6 duration-700">
            {t('description')}
          </p>
        </div>

        {/* AdSense Banner */}
        <div className="mb-8">
          <AdBanner slotId="profit-top" /> */}
        </div>

        {/* Calculator Form */}
        <div className="max-w-4xl mx-auto">
          <ProfitCalculatorForm />
        </div>

        {/* How It Works Section */}
        <div className="mt-12 max-w-4xl mx-auto bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-700 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-brand-primary dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">📖</span>
            How to Use
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-brand-primary to-accent-600 text-white flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">Enter Cost Price</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  Input your product or service cost (the amount you spend to create/acquire it)
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-brand-primary to-accent-600 text-white flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">Set Profit Margin</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  Choose your desired profit percentage (e.g., 30% = earning 30 baht per 100 baht cost)
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-brand-primary to-accent-600 text-white flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">Include Tax (Optional)</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  If you need to account for withholding tax, check the box and select the tax category
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-brand-primary to-accent-600 text-white flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">Get Results</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  View your optimal selling price, profit amount, and final amount received after tax
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
            <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Pricing Strategy Tip
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Consider market rates and competitor pricing. A 20-40% profit margin is common for services, while products may vary from 10-100% depending on industry.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-700">
            <h3 className="font-bold text-green-900 dark:text-green-300 mb-2 flex items-center gap-2">
              <span className="text-2xl">📊</span>
              Withholding Tax Note
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              If you're invoicing a company, they may withhold tax from your payment. Factor this into your pricing to ensure you receive your target amount.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
