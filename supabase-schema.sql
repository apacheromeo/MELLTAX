/**
 * MELLTAX Database Schema
 * Phase 6: Complete database setup with tables, indexes, and Row-Level Security
 * 
 * Instructions:
 * 1. Go to your Supabase Dashboard
 * 2. Navigate to "SQL Editor" in the left sidebar
 * 3. Click "New Query"
 * 4. Paste this entire file
 * 5. Click "Run" button
 * 6. Verify all tables appear in "Table Editor"
 */

-- Enable UUID extension for ID generation
create extension if not exists "pgcrypto";

-- =====================================================
-- TABLE: profiles
-- Stores user profile information
-- =====================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  preferred_language text check (preferred_language in ('th', 'en')),
  created_at timestamptz default timezone('utc'::text, now()),
  updated_at timestamptz default timezone('utc'::text, now())
);

comment on table public.profiles is 'User profiles linked to auth.users';

-- =====================================================
-- TABLE: tax_calculations
-- Stores individual withholding tax calculations
-- =====================================================
create table if not exists public.tax_calculations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  calculation_mode text not null check (calculation_mode in ('gross_to_net', 'net_to_gross')),
  payment_category text not null,
  tax_rate numeric(5,2) not null,
  gross_amount numeric(18,2),
  net_amount numeric(18,2),
  tax_amount numeric(18,2) not null,
  currency text not null default 'THB',
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default timezone('utc'::text, now())
);

comment on table public.tax_calculations is 'Saved withholding tax calculations';

create index if not exists idx_tax_calculations_user_created
  on public.tax_calculations (user_id, created_at desc);

-- =====================================================
-- TABLE: tax_plans
-- Stores tax planning sessions with multiple invoices
-- =====================================================
create table if not exists public.tax_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  name text not null,
  period_start date,
  period_end date,
  created_at timestamptz default timezone('utc'::text, now()),
  updated_at timestamptz default timezone('utc'::text, now())
);

comment on table public.tax_plans is 'Tax planning sessions';

create index if not exists idx_tax_plans_user_created
  on public.tax_plans (user_id, created_at desc);

-- =====================================================
-- TABLE: tax_plan_items
-- Stores individual items/invoices within a tax plan
-- =====================================================
create table if not exists public.tax_plan_items (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.tax_plans(id) on delete cascade,
  invoice_date date,
  payment_category text not null,
  description text,
  gross_amount numeric(18,2) not null,
  tax_rate numeric(5,2) not null,
  tax_amount numeric(18,2) not null,
  net_amount numeric(18,2) not null,
  created_at timestamptz default timezone('utc'::text, now())
);

comment on table public.tax_plan_items is 'Items within tax plans';

create index if not exists idx_tax_plan_items_plan
  on public.tax_plan_items (plan_id);

-- =====================================================
-- ROW-LEVEL SECURITY (RLS) POLICIES
-- Protect data so users can only see their own records
-- =====================================================

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.tax_calculations enable row level security;
alter table public.tax_plans enable row level security;
alter table public.tax_plan_items enable row level security;

-- -----------------------------------------------------
-- PROFILES: Users can only see and update their own profile
-- -----------------------------------------------------
create policy "Users can view own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles
  for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles
  for insert
  with check (auth.uid() = id);

-- -----------------------------------------------------
-- TAX_CALCULATIONS: Users can view and insert their own calculations
-- -----------------------------------------------------
create policy "Users can view own calculations"
  on public.tax_calculations
  for select
  using (auth.uid() = user_id);

create policy "Users can insert own calculations"
  on public.tax_calculations
  for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own calculations"
  on public.tax_calculations
  for delete
  using (auth.uid() = user_id);

-- -----------------------------------------------------
-- TAX_PLANS: Users can manage their own plans
-- -----------------------------------------------------
create policy "Users can view own plans"
  on public.tax_plans
  for select
  using (auth.uid() = user_id);

create policy "Users can insert own plans"
  on public.tax_plans
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update own plans"
  on public.tax_plans
  for update
  using (auth.uid() = user_id);

create policy "Users can delete own plans"
  on public.tax_plans
  for delete
  using (auth.uid() = user_id);

-- -----------------------------------------------------
-- TAX_PLAN_ITEMS: Users can manage items in their own plans
-- -----------------------------------------------------
create policy "Users can view items in own plans"
  on public.tax_plan_items
  for select
  using (
    exists (
      select 1 from public.tax_plans
      where tax_plans.id = tax_plan_items.plan_id
      and tax_plans.user_id = auth.uid()
    )
  );

create policy "Users can insert items in own plans"
  on public.tax_plan_items
  for insert
  with check (
    exists (
      select 1 from public.tax_plans
      where tax_plans.id = tax_plan_items.plan_id
      and tax_plans.user_id = auth.uid()
    )
  );

create policy "Users can update items in own plans"
  on public.tax_plan_items
  for update
  using (
    exists (
      select 1 from public.tax_plans
      where tax_plans.id = tax_plan_items.plan_id
      and tax_plans.user_id = auth.uid()
    )
  );

create policy "Users can delete items in own plans"
  on public.tax_plan_items
  for delete
  using (
    exists (
      select 1 from public.tax_plans
      where tax_plans.id = tax_plan_items.plan_id
      and tax_plans.user_id = auth.uid()
    )
  );

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- Auto-update timestamps
-- =====================================================

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Trigger for profiles
create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

-- Trigger for tax_plans
create trigger handle_tax_plans_updated_at
  before update on public.tax_plans
  for each row
  execute function public.handle_updated_at();

-- =====================================================
-- INITIAL SETUP COMPLETE
-- =====================================================

-- You can verify the setup by running:
-- SELECT tablename FROM pg_tables WHERE schemaname = 'public';
