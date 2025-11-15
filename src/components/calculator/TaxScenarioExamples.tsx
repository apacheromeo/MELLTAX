/**
 * TaxScenarioExamples component
 * Example scenarios and FAQ for SEO and user guidance
 */

import { Card } from '@/components/common/Card';

interface TaxScenarioExamplesProps {
  locale: 'th' | 'en';
  translations: {
    exampleTitle: string;
    exampleDesc1: string;
    exampleDesc2: string;
  };
}

export function TaxScenarioExamples({
  locale,
  translations,
}: TaxScenarioExamplesProps) {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {translations.exampleTitle}
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Example 1: Gross to Net */}
        <Card variant="bordered" padding="md">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-primary-600 dark:text-primary-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                {locale === 'th' ? 'กรณีรับเงินรวมภาษี (Gross)' : 'Gross Amount Case'}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {translations.exampleDesc1}
              </p>
            </div>
          </div>
        </Card>

        {/* Example 2: Net to Gross */}
        <Card variant="bordered" padding="md">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-secondary-600 dark:text-secondary-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                {locale === 'th' ? 'กรณีรับเงินสุทธิ (Net)' : 'Net Amount Case'}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {translations.exampleDesc2}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
