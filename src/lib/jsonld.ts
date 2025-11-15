/**
 * JSON-LD Structured Data for MELLTAX
 * Helps search engines understand the app
 */

export interface JsonLdWebApplication {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem: string;
  offers?: {
    '@type': string;
    price: string;
    priceCurrency: string;
  };
  inLanguage: string[];
  potentialAction?: {
    '@type': string;
    target: string;
  };
}

/**
 * Generate WebApplication JSON-LD schema
 */
export function getWebApplicationSchema(locale: 'th' | 'en' = 'th'): JsonLdWebApplication {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://melltax.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'MELLTAX',
    description:
      locale === 'th'
        ? 'เครื่องมือคำนวณภาษีหัก ณ ที่จ่ายตามกฎหมายไทย ฟรี ใช้งานง่าย รองรับภาษาไทยและอังกฤษ'
        : 'Free Thai withholding tax calculator. Easy to use, supports Thai and English. For freelancers and SMEs.',
    url: siteUrl,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'THB',
    },
    inLanguage: ['th', 'en'],
    potentialAction: {
      '@type': 'UseAction',
      target: `${siteUrl}/`,
    },
  };
}

/**
 * Generate Organization JSON-LD schema
 */
export function getOrganizationSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://melltax.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MELLTAX',
    url: siteUrl,
    logo: `${siteUrl}/logo-melltax-full.svg`,
    description: 'Thai Withholding Tax Calculator',
    sameAs: [],
  };
}

/**
 * Generate BreadcrumbList JSON-LD schema
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate HowTo JSON-LD schema for calculator page
 */
export function getHowToCalculateSchema(locale: 'th' | 'en' = 'th') {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://melltax.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: locale === 'th' ? 'วิธีคำนวณภาษีหัก ณ ที่จ่าย' : 'How to Calculate Withholding Tax',
    description:
      locale === 'th'
        ? 'คำแนะนำทีละขั้นตอนในการคำนวณภาษีหัก ณ ที่จ่ายด้วย MELLTAX'
        : 'Step-by-step guide to calculate withholding tax with MELLTAX',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: locale === 'th' ? 'เลือกประเภทการจ่าย' : 'Select payment type',
        text:
          locale === 'th'
            ? 'เลือกประเภทการจ่ายเงิน เช่น บริการทั่วไป, ค่าโฆษณา, ค่าเช่า'
            : 'Select payment type such as general services, advertising, rent',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: locale === 'th' ? 'เลือกโหมดการคำนวณ' : 'Select calculation mode',
        text:
          locale === 'th'
            ? 'เลือก Gross → Net หรือ Net → Gross'
            : 'Choose Gross → Net or Net → Gross',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: locale === 'th' ? 'กรอกจำนวนเงิน' : 'Enter amount',
        text: locale === 'th' ? 'กรอกจำนวนเงินที่ต้องการคำนวณ' : 'Enter the amount to calculate',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: locale === 'th' ? 'คลิกคำนวณ' : 'Click calculate',
        text:
          locale === 'th'
            ? 'กดปุ่มคำนวณเพื่อดูผลลัพธ์'
            : 'Click the calculate button to see results',
      },
    ],
    totalTime: 'PT1M',
    tool: [
      {
        '@type': 'HowToTool',
        name: 'MELLTAX Calculator',
        url: siteUrl,
      },
    ],
  };
}
