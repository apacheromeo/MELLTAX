/**
 * TaxScenarioExamples component
 * Phase 3: Example scenarios with common tax calculations
 * Shows real-world examples for freelancers, agencies, and landlords
 */

import { Card } from '@/components/common/Card';

interface TaxScenarioExamplesProps {
  locale: 'th' | 'en';
  translations: {
    exampleTitle: string;
    example1Title: string;
    example1Desc: string;
    example2Title: string;
    example2Desc: string;
    example3Title: string;
    example3Desc: string;
    example4Title: string;
    example4Desc: string;
  };
}

const scenarios = [
  {
    icon: '💼',
    titleTh: 'Freelance Designer',
    titleEn: 'Freelance Designer',
    descTh: 'รับงานออกแบบ 10,000 บาท หักภาษี 3% = ภาษี 300 บาท รับสุทธิ 9,700 บาท',
    descEn: 'Design work ฿10,000, 3% tax = ฿300 tax, net ฿9,700',
    bgColor: 'from-blue-500/10 to-indigo-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    icon: '📱',
    titleTh: 'Marketing Agency',
    titleEn: 'Marketing Agency',
    descTh: 'ค่าโฆษณา 50,000 บาท หักภาษี 2% = ภาษี 1,000 บาท รับสุทธิ 49,000 บาท',
    descEn: 'Advertising ฿50,000, 2% tax = ฿1,000 tax, net ฿49,000',
    bgColor: 'from-purple-500/10 to-pink-500/10',
    borderColor: 'border-purple-500/20',
  },
  {
    icon: '🏢',
    titleTh: 'Landlord',
    titleEn: 'Landlord',
    descTh: 'ค่าเช่าพื้นที่ 20,000 บาท หักภาษี 5% = ภาษี 1,000 บาท รับสุทธิ 19,000 บาท',
    descEn: 'Rental ฿20,000, 5% tax = ฿1,000 tax, net ฿19,000',
    bgColor: 'from-emerald-500/10 to-teal-500/10',
    borderColor: 'border-emerald-500/20',
  },
  {
    icon: '⚖️',
    titleTh: 'Legal Consultant',
    titleEn: 'Legal Consultant',
    descTh: 'ค่าที่ปรึกษา 15,000 บาท หักภาษี 3% = ภาษี 450 บาท รับสุทธิ 14,550 บาท',
    descEn: 'Consulting ฿15,000, 3% tax = ฿450 tax, net ฿14,550',
    bgColor: 'from-amber-500/10 to-orange-500/10',
    borderColor: 'border-amber-500/20',
  },
];

export function TaxScenarioExamples({
  locale,
  translations,
}: TaxScenarioExamplesProps) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-brand-primary dark:text-brand-text-dark mb-2 tracking-tight">
          {translations.exampleTitle}
        </h3>
        <p className="text-brand-text-light dark:text-brand-text-dark-light">
          {locale === 'th'
            ? 'ตัวอย่างการคำนวณภาษีหัก ณ ที่จ่ายในกรณีต่างๆ'
            : 'Common withholding tax calculation examples'}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {scenarios.map((scenario, index) => (
          <Card
            key={index}
            variant="default"
            padding="lg"
            className={`bg-gradient-to-br ${scenario.bgColor} border-2 ${scenario.borderColor} hover:shadow-md transition-all duration-200`}
          >
            <div className="text-center">
              <div className="text-4xl mb-3">{scenario.icon}</div>
              <h4 className="font-semibold text-brand-text dark:text-brand-text-dark mb-2">
                {locale === 'th' ? scenario.titleTh : scenario.titleEn}
              </h4>
              <p className="text-sm text-brand-text-light dark:text-brand-text-dark-light leading-relaxed">
                {locale === 'th' ? scenario.descTh : scenario.descEn}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
