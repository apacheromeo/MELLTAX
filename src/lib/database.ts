/**
 * Supabase data access helpers for MELLTAX
 * Simple CRUD operations for each table
 */

import { supabase } from './supabaseClient';
import type {
  Profile,
  ProfileUpdate,
  TaxCalculation,
  TaxCalculationInsert,
  TaxPlan,
  TaxPlanInsert,
  TaxPlanUpdate,
  TaxPlanItem,
  TaxPlanItemInsert,
  TaxPlanItemUpdate,
  TaxPlanWithItems,
} from '@/types/database';

// ====================================
// PROFILES
// ====================================

export async function getProfile(userId: string) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return data as Profile;
}

export async function updateProfile(userId: string, updates: ProfileUpdate) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating profile:', error);
    return null;
  }

  return data as Profile;
}

// ====================================
// TAX CALCULATIONS
// ====================================

export async function saveCalculation(calculation: TaxCalculationInsert) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('tax_calculations')
    .insert(calculation)
    .select()
    .single();

  if (error) {
    console.error('Error saving calculation:', error);
    return null;
  }

  return data as TaxCalculation;
}

export async function getCalculations(userId: string, limit = 10) {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('tax_calculations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching calculations:', error);
    return [];
  }

  return data as TaxCalculation[];
}

export async function deleteCalculation(id: string) {
  if (!supabase) return false;

  const { error } = await supabase
    .from('tax_calculations')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting calculation:', error);
    return false;
  }

  return true;
}

// ====================================
// TAX PLANS
// ====================================

export async function createPlan(plan: TaxPlanInsert) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('tax_plans')
    .insert(plan)
    .select()
    .single();

  if (error) {
    console.error('Error creating plan:', error);
    return null;
  }

  return data as TaxPlan;
}

export async function getPlans(userId: string) {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('tax_plans')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching plans:', error);
    return [];
  }

  return data as TaxPlan[];
}

export async function getPlanWithItems(planId: string): Promise<TaxPlanWithItems | null> {
  if (!supabase) return null;

  // Fetch plan
  const { data: plan, error: planError } = await supabase
    .from('tax_plans')
    .select('*')
    .eq('id', planId)
    .single();

  if (planError) {
    console.error('Error fetching plan:', planError);
    return null;
  }

  // Fetch items
  const { data: items, error: itemsError } = await supabase
    .from('tax_plan_items')
    .select('*')
    .eq('plan_id', planId)
    .order('invoice_date', { ascending: false });

  if (itemsError) {
    console.error('Error fetching plan items:', itemsError);
    return null;
  }

  return {
    ...plan,
    items: items || [],
  } as TaxPlanWithItems;
}

export async function updatePlan(planId: string, updates: TaxPlanUpdate) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('tax_plans')
    .update(updates)
    .eq('id', planId)
    .select()
    .single();

  if (error) {
    console.error('Error updating plan:', error);
    return null;
  }

  return data as TaxPlan;
}

export async function deletePlan(planId: string) {
  if (!supabase) return false;

  const { error } = await supabase
    .from('tax_plans')
    .delete()
    .eq('id', planId);

  if (error) {
    console.error('Error deleting plan:', error);
    return false;
  }

  return true;
}

// ====================================
// TAX PLAN ITEMS
// ====================================

export async function addPlanItem(item: TaxPlanItemInsert) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('tax_plan_items')
    .insert(item)
    .select()
    .single();

  if (error) {
    console.error('Error adding plan item:', error);
    return null;
  }

  return data as TaxPlanItem;
}

export async function updatePlanItem(itemId: string, updates: TaxPlanItemUpdate) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('tax_plan_items')
    .update(updates)
    .eq('id', itemId)
    .select()
    .single();

  if (error) {
    console.error('Error updating plan item:', error);
    return null;
  }

  return data as TaxPlanItem;
}

export async function deletePlanItem(itemId: string) {
  if (!supabase) return false;

  const { error } = await supabase
    .from('tax_plan_items')
    .delete()
    .eq('id', itemId);

  if (error) {
    console.error('Error deleting plan item:', error);
    return false;
  }

  return true;
}

// ====================================
// BATCH OPERATIONS
// ====================================

export async function savePlanWithItems(
  plan: TaxPlanInsert,
  items: Omit<TaxPlanItemInsert, 'plan_id'>[]
) {
  if (!supabase) return null;

  // Create plan first
  const createdPlan = await createPlan(plan);
  if (!createdPlan) return null;

  // Add items
  const itemsWithPlanId = items.map(item => ({
    ...item,
    plan_id: createdPlan.id,
  }));

  const { data, error } = await supabase
    .from('tax_plan_items')
    .insert(itemsWithPlanId)
    .select();

  if (error) {
    console.error('Error adding plan items:', error);
    // Optionally: delete the plan if items fail
    await deletePlan(createdPlan.id);
    return null;
  }

  return {
    ...createdPlan,
    items: data,
  } as TaxPlanWithItems;
}
