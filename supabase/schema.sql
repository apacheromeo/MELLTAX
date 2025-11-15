-- ====================================
-- MELLTAX Database Schema for Supabase
-- ====================================
-- Run this SQL in your Supabase SQL Editor
-- Order matters: run from top to bottom

-- ====================================
-- 1. PROFILES TABLE
-- ====================================
-- Stores user profile information
-- Links to Supabase auth.users via foreign key

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  preferred_language TEXT CHECK (preferred_language IN ('th', 'en')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- ====================================
-- 2. TAX_CALCULATIONS TABLE
-- ====================================
-- Stores individual tax calculations
-- Can be anonymous (user_id NULL) or linked to a user

CREATE TABLE IF NOT EXISTS public.tax_calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  calculation_mode TEXT NOT NULL CHECK (calculation_mode IN ('gross_to_net', 'net_to_gross')),
  payment_category TEXT NOT NULL,
  tax_rate NUMERIC(5,2) NOT NULL,
  gross_amount NUMERIC(18,2),
  net_amount NUMERIC(18,2),
  tax_amount NUMERIC(18,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'THB',
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_tax_calculations_user_created
  ON public.tax_calculations (user_id, created_at DESC);

-- Add Row Level Security
ALTER TABLE public.tax_calculations ENABLE ROW LEVEL SECURITY;

-- Users can view their own calculations
CREATE POLICY "Users can view own calculations"
  ON public.tax_calculations
  FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Users can insert their own calculations
CREATE POLICY "Users can insert own calculations"
  ON public.tax_calculations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Users can delete their own calculations
CREATE POLICY "Users can delete own calculations"
  ON public.tax_calculations
  FOR DELETE
  USING (auth.uid() = user_id);

-- ====================================
-- 3. TAX_PLANS TABLE
-- ====================================
-- Stores tax planning periods

CREATE TABLE IF NOT EXISTS public.tax_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  period_start DATE,
  period_end DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_tax_plans_user_created
  ON public.tax_plans (user_id, created_at DESC);

-- Add Row Level Security
ALTER TABLE public.tax_plans ENABLE ROW LEVEL SECURITY;

-- Users can view their own plans
CREATE POLICY "Users can view own plans"
  ON public.tax_plans
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own plans
CREATE POLICY "Users can insert own plans"
  ON public.tax_plans
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own plans
CREATE POLICY "Users can update own plans"
  ON public.tax_plans
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own plans
CREATE POLICY "Users can delete own plans"
  ON public.tax_plans
  FOR DELETE
  USING (auth.uid() = user_id);

-- ====================================
-- 4. TAX_PLAN_ITEMS TABLE
-- ====================================
-- Stores individual invoices within a tax plan

CREATE TABLE IF NOT EXISTS public.tax_plan_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID NOT NULL REFERENCES public.tax_plans(id) ON DELETE CASCADE,
  invoice_date DATE,
  payment_category TEXT NOT NULL,
  description TEXT,
  gross_amount NUMERIC(18,2) NOT NULL,
  tax_rate NUMERIC(5,2) NOT NULL,
  tax_amount NUMERIC(18,2) NOT NULL,
  net_amount NUMERIC(18,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_tax_plan_items_plan
  ON public.tax_plan_items (plan_id);

-- Add Row Level Security
ALTER TABLE public.tax_plan_items ENABLE ROW LEVEL SECURITY;

-- Users can view items of their own plans
CREATE POLICY "Users can view own plan items"
  ON public.tax_plan_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.tax_plans
      WHERE tax_plans.id = tax_plan_items.plan_id
        AND tax_plans.user_id = auth.uid()
    )
  );

-- Users can insert items into their own plans
CREATE POLICY "Users can insert own plan items"
  ON public.tax_plan_items
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.tax_plans
      WHERE tax_plans.id = tax_plan_items.plan_id
        AND tax_plans.user_id = auth.uid()
    )
  );

-- Users can update items in their own plans
CREATE POLICY "Users can update own plan items"
  ON public.tax_plan_items
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.tax_plans
      WHERE tax_plans.id = tax_plan_items.plan_id
        AND tax_plans.user_id = auth.uid()
    )
  );

-- Users can delete items from their own plans
CREATE POLICY "Users can delete own plan items"
  ON public.tax_plan_items
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.tax_plans
      WHERE tax_plans.id = tax_plan_items.plan_id
        AND tax_plans.user_id = auth.uid()
    )
  );

-- ====================================
-- HELPER FUNCTIONS (Optional)
-- ====================================

-- Function to create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, preferred_language)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'th'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ====================================
-- SAMPLE DATA (Optional - for testing)
-- ====================================
-- Uncomment to insert test data

-- INSERT INTO public.tax_calculations (
--   calculation_mode,
--   payment_category,
--   tax_rate,
--   gross_amount,
--   net_amount,
--   tax_amount
-- ) VALUES (
--   'gross_to_net',
--   'service_general',
--   3.00,
--   10000.00,
--   9700.00,
--   300.00
-- );

-- ====================================
-- GRANTS (If needed)
-- ====================================
-- Grant usage on schema to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- ====================================
-- NOTES
-- ====================================
-- 1. Run this SQL in Supabase SQL Editor
-- 2. Make sure RLS is enabled for security
-- 3. Test with authenticated users
-- 4. Adjust policies as needed for your use case
-- 5. The handle_new_user() function auto-creates profiles
