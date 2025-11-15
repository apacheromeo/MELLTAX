# MELLTAX Database Setup Guide

Complete guide to set up the Supabase database for MELLTAX.

---

## Prerequisites

1. **Supabase account** - Sign up at https://supabase.com (free tier available)
2. **MELLTAX project** - Your Next.js app should be set up

---

## Step 1: Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Click **"New Project"**
3. Fill in project details:
   - **Name**: `melltax` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to Thailand (e.g., Singapore - `ap-southeast-1`)
4. Click **"Create new project"**
5. Wait 2-3 minutes for project creation

---

## Step 2: Run Database Migration

### Option A: Using Supabase SQL Editor (Recommended)

1. In your Supabase dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New Query"**
3. Open the file `supabase/schema.sql` from this project
4. **Copy the entire contents** of `schema.sql`
5. **Paste** into the SQL Editor
6. Click **"Run"** (or press `Ctrl/Cmd + Enter`)
7. You should see: ✅ **"Success. No rows returned"**

### Option B: Using Supabase CLI (Advanced)

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Run migration
supabase db push
```

---

## Step 3: Verify Tables Created

1. In Supabase dashboard, click **"Table Editor"** in sidebar
2. You should see 4 tables:
   - ✅ `profiles`
   - ✅ `tax_calculations`
   - ✅ `tax_plans`
   - ✅ `tax_plan_items`

---

## Step 4: Get API Keys

1. In Supabase dashboard, click **"Settings"** (gear icon) in sidebar
2. Click **"API"** in the left menu
3. Copy these two values:

   **Project URL**: `https://xxxxx.supabase.co`
   **anon public key**: `eyJhbGci...` (long JWT token)

---

## Step 5: Add Keys to Your App

1. Open `.env.local` in your MELLTAX project
2. Add your Supabase credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

3. **Save** the file
4. **Restart** your dev server: `npm run dev`

---

## Step 6: Enable Google Authentication (Optional)

If you want users to login with Google:

### 6.1 Get Google OAuth Credentials

1. Go to https://console.cloud.google.com
2. Create a new project (or select existing)
3. Enable **"Google+ API"**
4. Go to **"Credentials"** → **"Create Credentials"** → **"OAuth 2.0 Client ID"**
5. Configure OAuth consent screen
6. Add authorized redirect URI:
   ```
   https://your-project.supabase.co/auth/v1/callback
   ```
7. Copy your **Client ID** and **Client Secret**

### 6.2 Configure in Supabase

1. In Supabase dashboard, go to **"Authentication"** → **"Providers"**
2. Find **"Google"** and toggle it **ON**
3. Paste your:
   - **Client ID**
   - **Client Secret**
4. Click **"Save"**

### 6.3 Test Login

1. Run your app: `npm run dev`
2. Try logging in with Google
3. Check Supabase **"Authentication"** → **"Users"** to see new user

---

## Step 7: Verify Row Level Security (RLS)

All tables have RLS enabled for security. To verify:

1. Go to **"Authentication"** → **"Policies"** in Supabase
2. You should see policies for each table:
   - Users can view own data
   - Users can insert own data
   - Users can update own data
   - Users can delete own data

---

## Database Schema Overview

### Tables

#### 1. `profiles`
Stores user profile information
- Links to Supabase `auth.users`
- Automatically created when user signs up

**Columns:**
- `id` (UUID) - Primary key, references auth.users
- `display_name` (TEXT) - User's display name
- `preferred_language` (TEXT) - 'th' or 'en'
- `created_at` (TIMESTAMPTZ) - Account creation date

#### 2. `tax_calculations`
Stores individual tax calculations
- Can be anonymous (user_id NULL) or linked to user
- Keeps history of calculations

**Columns:**
- `id` (UUID) - Primary key
- `user_id` (UUID) - References profiles (nullable)
- `calculation_mode` (TEXT) - 'gross_to_net' or 'net_to_gross'
- `payment_category` (TEXT) - Type of payment
- `tax_rate` (NUMERIC) - Tax rate percentage
- `gross_amount` (NUMERIC) - Gross amount
- `net_amount` (NUMERIC) - Net amount
- `tax_amount` (NUMERIC) - Tax amount
- `currency` (TEXT) - Default 'THB'
- `metadata` (JSONB) - Additional data
- `created_at` (TIMESTAMPTZ)

#### 3. `tax_plans`
Stores tax planning periods
- Container for multiple invoices
- Tracks planning periods

**Columns:**
- `id` (UUID) - Primary key
- `user_id` (UUID) - References profiles
- `name` (TEXT) - Plan name
- `period_start` (DATE) - Start date
- `period_end` (DATE) - End date
- `created_at` (TIMESTAMPTZ)

#### 4. `tax_plan_items`
Stores invoices within a tax plan
- Links to tax_plans
- Represents individual invoices

**Columns:**
- `id` (UUID) - Primary key
- `plan_id` (UUID) - References tax_plans
- `invoice_date` (DATE) - Invoice date
- `payment_category` (TEXT) - Type of payment
- `description` (TEXT) - Notes
- `gross_amount` (NUMERIC)
- `tax_rate` (NUMERIC)
- `tax_amount` (NUMERIC)
- `net_amount` (NUMERIC)
- `created_at` (TIMESTAMPTZ)

---

## Using the Database in Your App

### Import helpers

```typescript
import { saveCalculation, getCalculations } from '@/lib/database';
import { getCurrentUser } from '@/lib/supabaseClient';
```

### Save a calculation

```typescript
const user = await getCurrentUser();

const calculation = await saveCalculation({
  user_id: user?.id || null,
  calculation_mode: 'gross_to_net',
  payment_category: 'service_general',
  tax_rate: 3.0,
  gross_amount: 10000,
  net_amount: 9700,
  tax_amount: 300,
  currency: 'THB',
  metadata: {},
});
```

### Get user's calculations

```typescript
const user = await getCurrentUser();
if (user) {
  const calculations = await getCalculations(user.id, 10);
  console.log(calculations);
}
```

### Create a tax plan with items

```typescript
import { savePlanWithItems } from '@/lib/database';

const plan = await savePlanWithItems(
  {
    user_id: user.id,
    name: 'Q1 2025 Tax Plan',
    period_start: '2025-01-01',
    period_end: '2025-03-31',
  },
  [
    {
      invoice_date: '2025-01-15',
      payment_category: 'service_general',
      description: 'Consulting services',
      gross_amount: 50000,
      tax_rate: 3.0,
      tax_amount: 1500,
      net_amount: 48500,
    },
    {
      invoice_date: '2025-02-10',
      payment_category: 'advertising',
      description: 'Facebook ads',
      gross_amount: 20000,
      tax_rate: 2.0,
      tax_amount: 400,
      net_amount: 19600,
    },
  ]
);
```

---

## Troubleshooting

### Error: "No rows returned"
✅ This is normal for DDL statements (CREATE TABLE, etc.)

### Error: "relation already exists"
- Tables already created
- Either drop tables first or ignore error

### Error: "permission denied"
- Check RLS policies
- Make sure user is authenticated
- Verify policies in Supabase dashboard

### Error: "Invalid JWT"
- SUPABASE_ANON_KEY is wrong
- Check `.env.local` file
- Restart dev server after changing .env

### Can't see user data
- Check if user is logged in
- Verify `user_id` matches in database
- Check RLS policies are correct

---

## Security Best Practices

1. **Never expose** `SERVICE_ROLE_KEY` in client-side code
2. **Always use** Row Level Security (RLS)
3. **Test policies** with different users
4. **Use** `anon` key for client-side
5. **Validate** all inputs before saving
6. **Backup** your database regularly

---

## Backup & Restore

### Manual Backup

1. Go to Supabase dashboard
2. Click **"Database"** → **"Backups"**
3. Click **"Create backup"**

### Restore from Backup

1. Go to **"Database"** → **"Backups"**
2. Find backup date
3. Click **"Restore"**

---

## Testing the Setup

Run this test in your app:

```typescript
// pages/test-db.tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function TestDB() {
  const [status, setStatus] = useState('Testing...');

  useEffect(() => {
    async function test() {
      if (!supabase) {
        setStatus('❌ Supabase not configured');
        return;
      }

      // Test connection
      const { data, error } = await supabase
        .from('profiles')
        .select('count');

      if (error) {
        setStatus(`❌ Error: ${error.message}`);
      } else {
        setStatus('✅ Database connected successfully!');
      }
    }
    test();
  }, []);

  return (
    <div className="p-8">
      <h1>Database Test</h1>
      <p>{status}</p>
    </div>
  );
}
```

---

## Need Help?

- **Supabase Docs**: https://supabase.com/docs
- **Supabase Discord**: https://discord.supabase.com
- **Database Issues**: Check Supabase logs in dashboard
- **RLS Issues**: https://supabase.com/docs/guides/auth/row-level-security

---

## Next Steps

1. ✅ Database is set up
2. ✅ Tables created with RLS
3. ✅ API keys configured
4. 🚀 Start using the database in your app!

Optional:
- Enable Google auth for users
- Set up email templates in Supabase
- Configure webhooks for events
- Add database backups schedule

---

**Database Setup Complete!** 🎉

Your MELLTAX app is now ready to save user calculations and tax plans!
