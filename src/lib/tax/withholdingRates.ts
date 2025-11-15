/**
 * Thai Withholding Tax Rates Configuration
 * Reference: Thai Revenue Code
 */

import { PaymentCategory, TaxRateConfig } from '@/types/tax';

// Standard withholding tax rates for different payment categories
export const TAX_RATES: Record<PaymentCategory, TaxRateConfig> = {
  service_general: {
    category: 'service_general',
    rate: 3,
    nameTh: 'บริการทั่วไป',
    nameEn: 'General Services',
    descriptionTh: 'ค่าบริการทั่วไป เช่น ค่าที่ปรึกษา ค่าออกแบบ ค่าซ่อมแซม',
    descriptionEn: 'General services such as consulting, design, repair',
  },

  advertising: {
    category: 'advertising',
    rate: 2,
    nameTh: 'ค่าโฆษณา',
    nameEn: 'Advertising',
    descriptionTh: 'ค่าโฆษณาและประชาสัมพันธ์',
    descriptionEn: 'Advertising and PR services',
  },

  rent: {
    category: 'rent',
    rate: 5,
    nameTh: 'ค่าเช่า',
    nameEn: 'Rent',
    descriptionTh: 'ค่าเช่าทรัพย์สิน เช่น ที่ดิน อาคาร อุปกรณ์',
    descriptionEn: 'Property rent such as land, buildings, equipment',
  },

  professional_service: {
    category: 'professional_service',
    rate: 3,
    nameTh: 'บริการวิชาชีพ',
    nameEn: 'Professional Services',
    descriptionTh: 'บริการทางวิชาชีพ เช่น กฎหมาย บัญชี สถาปัตย์ วิศวกร',
    descriptionEn: 'Professional services such as legal, accounting, architecture, engineering',
  },

  transport: {
    category: 'transport',
    rate: 1,
    nameTh: 'ค่าขนส่ง',
    nameEn: 'Transportation',
    descriptionTh: 'ค่าขนส่งสินค้าหรือบุคคล',
    descriptionEn: 'Transportation of goods or persons',
  },

  royalty: {
    category: 'royalty',
    rate: 3,
    nameTh: 'ค่าลิขสิทธิ์',
    nameEn: 'Royalty',
    descriptionTh: 'ค่าลิขสิทธิ์ ค่าแฟรนไชส์ ค่าสิทธิต่างๆ',
    descriptionEn: 'Royalties, franchise fees, usage rights',
  },

  commission: {
    category: 'commission',
    rate: 3,
    nameTh: 'ค่านายหน้า/คอมมิชชั่น',
    nameEn: 'Commission',
    descriptionTh: 'ค่านายหน้าและค่าคอมมิชชั่น',
    descriptionEn: 'Brokerage and commission fees',
  },

  prize: {
    category: 'prize',
    rate: 5,
    nameTh: 'เงินรางวัล',
    nameEn: 'Prize/Award',
    descriptionTh: 'เงินรางวัลจากการประกวด แข่งขัน',
    descriptionEn: 'Prize money from competitions',
  },

  other: {
    category: 'other',
    rate: 3,
    nameTh: 'อื่นๆ',
    nameEn: 'Other',
    descriptionTh: 'ประเภทอื่นๆ ที่ไม่ระบุ',
    descriptionEn: 'Other unspecified categories',
  },
};

/**
 * Get tax rate configuration for a specific category
 */
export function getTaxRate(category: PaymentCategory): TaxRateConfig {
  return TAX_RATES[category];
}

/**
 * Get all available payment categories
 */
export function getAllCategories(): TaxRateConfig[] {
  return Object.values(TAX_RATES);
}

/**
 * Get category options for select dropdown
 */
export function getCategoryOptions(locale: 'th' | 'en' = 'th'): Array<{ value: PaymentCategory; label: string }> {
  return getAllCategories().map(config => ({
    value: config.category,
    label: locale === 'th' ? config.nameTh : config.nameEn,
  }));
}
