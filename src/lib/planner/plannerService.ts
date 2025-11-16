/**
 * Planner Service
 * Phase 6: Persist tax plans and items to Supabase
 * 
 * This service:
 * - Saves tax plans with multiple invoice items
 * - Loads recent plans for current user
 * - Handles CRUD operations for plans and items
 */

import { supabaseBrowser } from '@/lib/supabase/client';
import { PlannerItem } from '@/types/planner';

export interface PlannerPlan {
  id: string;
  name: string;
  periodStart: string | null;
  periodEnd: string | null;
  items: PlannerItem[];
  createdAt: string;
}

export interface SavePlanResult {
  success: boolean;
  error?: string;
  planId?: string;
}

/**
 * Create a new tax plan with items
 * @param name - Plan name (e.g., "Q1 2025 Tax Plan")
 * @param periodStart - Start date of the planning period
 * @param periodEnd - End date of the planning period
 * @param items - Array of planner items (invoices)
 * @returns Success status and plan ID
 */
export async function createPlan(
  name: string,
  periodStart: string | null,
  periodEnd: string | null,
  items: PlannerItem[]
): Promise<SavePlanResult> {
  try {
    // Check authentication
    const { data: { user }, error: authError } = await supabaseBrowser.auth.getUser();
    
    if (authError || !user) {
      return {
        success: false,
        error: 'not_authenticated',
      };
    }

    // Insert plan
    const { data: plan, error: planError } = await supabaseBrowser
      .from('tax_plans')
      .insert({
        user_id: user.id,
        name,
        period_start: periodStart,
        period_end: periodEnd,
      } as any)
      .select('id')
      .single();

    if (planError || !plan) {
      console.error('Error creating plan:', planError);
      return {
        success: false,
        error: 'database_error',
      };
    }

    // Insert plan items
    if (items.length > 0) {
      const planItems = items.map((item) => ({
        plan_id: (plan as any).id,
        invoice_date: item.invoiceDate,
        payment_category: item.categoryId,
        description: item.description || null,
        gross_amount: item.gross,
        tax_rate: item.taxRate,
        tax_amount: item.tax,
        net_amount: item.net,
      }));

      const { error: itemsError } = await supabaseBrowser
        .from('tax_plan_items')
        .insert(planItems as any);

      if (itemsError) {
        console.error('Error creating plan items:', itemsError);
        // Note: Plan is already created, but items failed
        // You might want to delete the plan here for consistency
        return {
          success: false,
          error: 'items_error',
          planId: (plan as any).id,
        };
      }
    }

    return {
      success: true,
      planId: (plan as any).id,
    };
  } catch (error) {
    console.error('Unexpected error creating plan:', error);
    return {
      success: false,
      error: 'unexpected_error',
    };
  }
}

/**
 * Load recent plans for current user
 * @param limit - Maximum number of plans to fetch
 * @returns Array of plans with their items
 */
export async function loadRecentPlans(
  limit = 10
): Promise<{ success: boolean; plans: PlannerPlan[]; error?: string }> {
  try {
    // Check authentication
    const { data: { user }, error: authError } = await supabaseBrowser.auth.getUser();
    
    if (authError || !user) {
      return {
        success: false,
        error: 'not_authenticated',
        plans: [],
      };
    }

    // Fetch plans
    const { data: plans, error: plansError } = await supabaseBrowser
      .from('tax_plans')
      .select('id, name, period_start, period_end, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (plansError) {
      console.error('Error loading plans:', plansError);
      return {
        success: false,
        error: 'database_error',
        plans: [],
      };
    }

    if (!plans || plans.length === 0) {
      return {
        success: true,
        plans: [],
      };
    }

    // Fetch items for each plan
    const plansWithItems: PlannerPlan[] = await Promise.all(
      plans.map(async (plan) => {
        const { data: items, error: itemsError } = await supabaseBrowser
          .from('tax_plan_items')
          .select('*')
          .eq('plan_id', (plan as any).id)
          .order('invoice_date', { ascending: true });

        if (itemsError) {
          console.error('Error loading plan items:', itemsError);
          return {
            id: (plan as any).id,
            name: (plan as any).name,
            periodStart: (plan as any).period_start,
            periodEnd: (plan as any).period_end,
            items: [],
            createdAt: (plan as any).created_at,
          };
        }

        // Convert database items to PlannerItem format
        const plannerItems: PlannerItem[] = (items || []).map((item: any) => ({
          id: item.id,
          invoiceDate: item.invoice_date || '',
          categoryId: item.payment_category,
          description: item.description || undefined,
          gross: item.gross_amount,
          taxRate: item.tax_rate,
          tax: item.tax_amount,
          net: item.net_amount,
        }));

        return {
          id: (plan as any).id,
          name: (plan as any).name,
          periodStart: (plan as any).period_start,
          periodEnd: (plan as any).period_end,
          items: plannerItems,
          createdAt: (plan as any).created_at,
        };
      })
    );

    return {
      success: true,
      plans: plansWithItems,
    };
  } catch (error) {
    console.error('Unexpected error loading plans:', error);
    return {
      success: false,
      error: 'unexpected_error',
      plans: [],
    };
  }
}

/**
 * Delete a plan and all its items
 * @param planId - The plan ID to delete
 * @returns Success status
 */
export async function deletePlan(
  planId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { data: { user }, error: authError } = await supabaseBrowser.auth.getUser();
    
    if (authError || !user) {
      return {
        success: false,
        error: 'not_authenticated',
      };
    }

    // Delete plan (items will cascade delete due to foreign key)
    const { error } = await supabaseBrowser
      .from('tax_plans')
      .delete()
      .eq('id', planId)
      .eq('user_id', user.id); // Ensure user owns the plan

    if (error) {
      console.error('Error deleting plan:', error);
      return {
        success: false,
        error: 'database_error',
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Unexpected error deleting plan:', error);
    return {
      success: false,
      error: 'unexpected_error',
    };
  }
}
