/**
 * Tax-related type definitions for MELLTAX
 * Phase 3: Withholding tax calculation types
 */

// Calculation mode: Gross to Net or Net to Gross
export type CalculationMode = 'gross_to_net' | 'net_to_gross';

// Payment category configuration
export interface PaymentCategory {
  id: string;           // e.g. 'service', 'ads', 'rent'
  labelTh: string;
  labelEn: string;
  defaultRate: number;  // percentage, e.g. 3 = 3%
  descriptionTh?: string;
  descriptionEn?: string;
}

// Input for withholding tax calculation
export interface WithholdingInput {
  mode: CalculationMode;
  paymentCategory: string;
  taxRate: number;      // percentage, e.g. 3 = 3%
  amount: number;       // gross or net depending on mode
}

// Result of withholding tax calculation
export interface WithholdingResult {
  gross: number;
  net: number;
  tax: number;
  taxRate: number;      // same % used for calculation
}

// Legacy types (keep for backward compatibility with other calculators)
export type PaymentCategoryLegacy =
  | 'service_general'       // บริการทั่วไป
  | 'advertising'           // ค่าโฆษณา
  | 'rent'                  // ค่าเช่า
  | 'professional_service'  // บริการวิชาชีพ (กฎหมาย, บัญชี, ฯลฯ)
  | 'transport'             // ค่าขนส่ง
  | 'royalty'               // ค่าลิขสิทธิ์
  | 'commission'            // ค่านายหน้า
  | 'prize'                 // เงินรางวัล
  | 'other';                // อื่นๆ

export type CalculationModeLegacy = 'grossToNet' | 'netToGross';

export interface TaxRateConfig {
  category: PaymentCategoryLegacy;
  rate: number;
  nameTh: string;
  nameEn: string;
  descriptionTh?: string;
  descriptionEn?: string;
}

export interface TaxCalculationInput {
  category: PaymentCategoryLegacy;
  mode: CalculationModeLegacy;
  amount: number;
  customRate?: number;
}

export interface TaxCalculationResult {
  grossAmount: number;
  netAmount: number;
  taxAmount: number;
  taxRate: number;
  category: PaymentCategoryLegacy;
  mode: CalculationModeLegacy;
}
