/**
 * Withholding Tax Rates Configuration
 * Common Thai payment categories with default withholding tax rates
 * Based on Thai Revenue Department regulations (Section 3 Trisadee)
 * Phase 3: Updated for new PaymentCategory interface
 */

import { PaymentCategory } from '@/types/tax';

/**
 * Common payment categories with default withholding tax rates
 * Rates are based on Thai tax law
 */
export const PAYMENT_CATEGORIES: PaymentCategory[] = [
  {
    id: 'service',
    labelTh: 'บริการทั่วไป',
    labelEn: 'General Services',
    defaultRate: 3,
    descriptionTh: 'ค่าจ้างทำของ ค่าโฆษณา ค่าขนส่ง ค่าประกันภัย และบริการอื่นๆ',
    descriptionEn: 'Professional services, consulting, freelance work, and general services',
  },
  {
    id: 'advertising',
    labelTh: 'ค่าโฆษณา',
    labelEn: 'Advertising',
    defaultRate: 2,
    descriptionTh: 'ค่าโฆษณาสินค้าหรือบริการ ค่าประชาสัมพันธ์',
    descriptionEn: 'Advertising and promotional services',
  },
  {
    id: 'rent',
    labelTh: 'ค่าเช่า',
    labelEn: 'Rental',
    defaultRate: 5,
    descriptionTh: 'ค่าเช่าทรัพย์สิน อาคาร ที่ดิน หรืออุปกรณ์',
    descriptionEn: 'Property, building, land, or equipment rental',
  },
  {
    id: 'professional',
    labelTh: 'บริการวิชาชีพ',
    labelEn: 'Professional Services',
    defaultRate: 3,
    descriptionTh: 'ค่าบริการทางกฎหมาย บัญชี วิศวกร สถาปนิก หรือวิชาชีพอื่นๆ',
    descriptionEn: 'Legal, accounting, engineering, architectural, and other professional services',
  },
  {
    id: 'transport',
    labelTh: 'ค่าขนส่ง',
    labelEn: 'Transportation',
    defaultRate: 1,
    descriptionTh: 'ค่าบริการขนส่งสินค้าหรือผู้โดยสาร',
    descriptionEn: 'Freight and passenger transportation services',
  },
  {
    id: 'royalty',
    labelTh: 'ค่าลิขสิทธิ์',
    labelEn: 'Royalties',
    defaultRate: 3,
    descriptionTh: 'ค่าสิทธิ์ในการใช้ทรัพย์สินทางปัญญา เครื่องหมายการค้า ลิขสิทธิ์',
    descriptionEn: 'Intellectual property, trademark, copyright, and patent royalties',
  },
  {
    id: 'commission',
    labelTh: 'ค่านายหน้า/คอมมิชชั่น',
    labelEn: 'Commission',
    defaultRate: 3,
    descriptionTh: 'ค่านายหน้า ค่าหัวคิว ค่าคอมมิชชั่น',
    descriptionEn: 'Brokerage, finder\'s fee, and commission payments',
  },
  {
    id: 'prize',
    labelTh: 'เงินรางวัล',
    labelEn: 'Prize/Award',
    defaultRate: 5,
    descriptionTh: 'เงินรางวัลจากการประกวด แข่งขัน หรือโชคลาภ',
    descriptionEn: 'Contest prizes, competition awards, and lottery winnings',
  },
  {
    id: 'interest',
    labelTh: 'ดอกเบี้ย',
    labelEn: 'Interest',
    defaultRate: 1,
    descriptionTh: 'ดอกเบี้ยเงินกู้ ดอกเบี้ยเงินฝาก',
    descriptionEn: 'Loan interest and deposit interest',
  },
  {
    id: 'other',
    labelTh: 'อื่นๆ',
    labelEn: 'Other',
    defaultRate: 3,
    descriptionTh: 'รายจ่ายอื่นๆ ที่ต้องหักภาษี ณ ที่จ่าย',
    descriptionEn: 'Other payments subject to withholding tax',
  },
];

/**
 * Get payment category by ID
 */
export function getCategoryById(id: string): PaymentCategory | undefined {
  return PAYMENT_CATEGORIES.find((cat) => cat.id === id);
}

/**
 * Get default tax rate for a payment category
 */
export function getDefaultTaxRateForCategory(id: string): number {
  const category = getCategoryById(id);
  return category?.defaultRate ?? 3; // Default to 3% if category not found
}

/**
 * Get all available payment categories
 */
export function getAllCategories(): PaymentCategory[] {
  return PAYMENT_CATEGORIES;
}

// Legacy exports for backward compatibility with existing components
import type { PaymentCategoryLegacy, TaxRateConfig } from '@/types/tax';

export const TAX_RATES: Record<PaymentCategoryLegacy, TaxRateConfig> = {
  service_general: {
    category: 'service_general',
    rate: 3,
    nameTh: 'บริการทั่วไป',
    nameEn: 'General Services',
    descriptionTh: 'ค่าบริการทั่วไป',
    descriptionEn: 'General services',
  },
  advertising: {
    category: 'advertising',
    rate: 2,
    nameTh: 'ค่าโฆษณา',
    nameEn: 'Advertising',
  },
  rent: {
    category: 'rent',
    rate: 5,
    nameTh: 'ค่าเช่า',
    nameEn: 'Rental',
  },
  professional_service: {
    category: 'professional_service',
    rate: 3,
    nameTh: 'บริการวิชาชีพ',
    nameEn: 'Professional Services',
  },
  transport: {
    category: 'transport',
    rate: 1,
    nameTh: 'ค่าขนส่ง',
    nameEn: 'Transportation',
  },
  royalty: {
    category: 'royalty',
    rate: 3,
    nameTh: 'ค่าลิขสิทธิ์',
    nameEn: 'Royalties',
  },
  commission: {
    category: 'commission',
    rate: 3,
    nameTh: 'ค่านายหน้า',
    nameEn: 'Commission',
  },
  prize: {
    category: 'prize',
    rate: 5,
    nameTh: 'เงินรางวัล',
    nameEn: 'Prize',
  },
  other: {
    category: 'other',
    rate: 3,
    nameTh: 'อื่นๆ',
    nameEn: 'Other',
  },
};

export function getTaxRate(category: PaymentCategoryLegacy): TaxRateConfig {
  return TAX_RATES[category];
}
