/**
 * Tax planner type definitions for MELLTAX
 * Phase 4: Premium tax planner with multiple invoices
 */

import { PaymentCategoryLegacy } from './tax';

// Phase 4: A single planner item (invoice/payment)
export interface PlannerItem {
  id: string;
  invoiceDate: string; // ISO date string
  categoryId: string; // Payment category ID
  description?: string;
  gross: number;
  taxRate: number; // percentage
  tax: number;
  net: number;
}

// Phase 4: Planner state
export interface PlannerState {
  items: PlannerItem[];
}

// Legacy: Keep for backward compatibility
export interface Invoice {
  id: string;
  date: string; // ISO date string
  category: PaymentCategoryLegacy;
  grossAmount: number;
  taxRate: number; // percentage
  taxAmount: number;
  netAmount: number;
  notes?: string;
}

// Summary of all invoices in the planner
export interface PlannerSummary {
  totalGross: number;
  totalTax: number;
  totalNet: number;
  effectiveTaxRate: number; // weighted average
  invoiceCount: number;
}

// Chart data point for visualization
export interface ChartDataPoint {
  name: string; // invoice identifier or date
  gross: number;
  tax: number;
  net: number;
}
