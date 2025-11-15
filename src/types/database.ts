/**
 * Database types for MELLTAX Supabase schema
 * Auto-generated from database schema
 */

// ====================================
// DATABASE TABLE TYPES
// ====================================

export interface Profile {
  id: string; // UUID
  display_name: string | null;
  preferred_language: 'th' | 'en' | null;
  created_at: string; // ISO timestamp
}

export interface TaxCalculation {
  id: string; // UUID
  user_id: string | null; // UUID or null for anonymous
  calculation_mode: 'gross_to_net' | 'net_to_gross';
  payment_category: string;
  tax_rate: number; // NUMERIC(5,2)
  gross_amount: number | null; // NUMERIC(18,2)
  net_amount: number | null; // NUMERIC(18,2)
  tax_amount: number; // NUMERIC(18,2)
  currency: string; // Default 'THB'
  metadata: Record<string, any>; // JSONB
  created_at: string; // ISO timestamp
}

export interface TaxPlan {
  id: string; // UUID
  user_id: string; // UUID
  name: string;
  period_start: string | null; // ISO date string
  period_end: string | null; // ISO date string
  created_at: string; // ISO timestamp
}

export interface TaxPlanItem {
  id: string; // UUID
  plan_id: string; // UUID
  invoice_date: string | null; // ISO date string
  payment_category: string;
  description: string | null;
  gross_amount: number; // NUMERIC(18,2)
  tax_rate: number; // NUMERIC(5,2)
  tax_amount: number; // NUMERIC(18,2)
  net_amount: number; // NUMERIC(18,2)
  created_at: string; // ISO timestamp
}

// ====================================
// INSERT TYPES (for creating new records)
// ====================================

export type ProfileInsert = Omit<Profile, 'created_at'>;

export type TaxCalculationInsert = Omit<TaxCalculation, 'id' | 'created_at'> & {
  id?: string;
};

export type TaxPlanInsert = Omit<TaxPlan, 'id' | 'created_at'> & {
  id?: string;
};

export type TaxPlanItemInsert = Omit<TaxPlanItem, 'id' | 'created_at'> & {
  id?: string;
};

// ====================================
// UPDATE TYPES (for updating records)
// ====================================

export type ProfileUpdate = Partial<Omit<Profile, 'id' | 'created_at'>>;

export type TaxCalculationUpdate = Partial<Omit<TaxCalculation, 'id' | 'created_at'>>;

export type TaxPlanUpdate = Partial<Omit<TaxPlan, 'id' | 'user_id' | 'created_at'>>;

export type TaxPlanItemUpdate = Partial<Omit<TaxPlanItem, 'id' | 'plan_id' | 'created_at'>>;

// ====================================
// QUERY RESULT TYPES (with joins)
// ====================================

export interface TaxPlanWithItems extends TaxPlan {
  items: TaxPlanItem[];
}

export interface TaxPlanSummary {
  plan: TaxPlan;
  total_gross: number;
  total_tax: number;
  total_net: number;
  item_count: number;
}
