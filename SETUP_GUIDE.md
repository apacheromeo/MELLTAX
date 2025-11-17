# MELLTAX - Supabase & Vercel Setup Guide

Complete step-by-step guide to deploy MELLTAX with authentication.

---

## Part 1: Supabase Setup (15 minutes)

### Step 1: Create Supabase Project

1. **Go to Supabase**: https://supabase.com
2. **Sign up/Login** with GitHub or email
3. **Click "New Project"**
   - Organization: Select or create one
   - Project name: `melltax-production`
   - Database password: Generate a strong password (save it somewhere safe!)
   - Region: Choose closest to your users (e.g., Singapore for Thailand)
   - Pricing plan: Start with **Free tier**
4. **Wait 2-3 minutes** for project to be created

### Step 2: Get Supabase Credentials

1. **In your Supabase dashboard**, click on your project
2. **Go to Settings** (gear icon on left sidebar) → **API**
3. **Copy these values**:
   ```
   Project URL: https://xxxxxxxxxxxxx.supabase.co
   anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
4. **Keep this tab open** - you'll need these soon

### Step 3: Set Up Database Schema

1. **Go to SQL Editor** (left sidebar)
2. **Click "New Query"**
3. **Paste this SQL** and click **Run**:

```sql
-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create profiles table (if not exists)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  display_name TEXT,
  preferred_language TEXT DEFAULT 'th',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies: Users can read and update their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

4. **Verify**: Go to **Table Editor** → you should see `profiles` table

### Step 4: Configure Google OAuth

1. **Go to Google Cloud Console**: https://console.cloud.google.com
2. **Create a new project** (or select existing):
   - Project name: `MELLTAX`
   - Click **Create**

3. **Enable Google+ API**:
   - Go to **APIs & Services** → **Library**
   - Search for "Google+ API"
   - Click **Enable**

4. **Create OAuth Credentials**:
   - Go to **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **OAuth client ID**
   - Configure consent screen if prompted:
     - User Type: **External**
     - App name: **MELLTAX**
     - User support email: Your email
     - Developer contact: Your email
     - Click **Save and Continue** → **Save and Continue** → **Back to Dashboard**

5. **Create OAuth Client ID**:
   - Application type: **Web application**
   - Name: `MELLTAX Production`
   - Authorized redirect URIs: `https://xxxxxxxxxxxxx.supabase.co/auth/v1/callback`
     (Replace with YOUR Supabase Project URL from Step 2)
   - Click **Create**
   - **Copy** Client ID and Client Secret

6. **Configure in Supabase**:
   - Go back to **Supabase Dashboard**
   - Go to **Authentication** → **Providers**
   - Find **Google** and toggle it **ON**
   - Paste:
     - Client ID: (from Google Cloud Console)
     - Client Secret: (from Google Cloud Console)
   - Click **Save**

---

## Part 2: Vercel Deployment (10 minutes)

### Step 5: Deploy to Vercel

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Login** with GitHub
3. **Click "Add New Project"**
4. **Import Git Repository**:
   - Connect your GitHub account if needed
   - Find and select: `apacheromeo/MELLTAX`
   - Click **Import**

5. **Configure Project**:
   - Framework Preset: **Next.js** (should auto-detect)
   - Root Directory: `./` (leave as is)
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `.next` (auto-filled)

6. **Add Environment Variables**:
   Click **Environment Variables** and add these:

   ```env
   NEXT_PUBLIC_SITE_URL = https://your-app.vercel.app
   NEXT_PUBLIC_SUPABASE_URL = https://xxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

   **Important**: Use the values from Supabase Step 2!
   - For `NEXT_PUBLIC_SITE_URL`, use your Vercel deployment URL (you'll update this after first deploy)

7. **Click "Deploy"**
   - Wait 2-3 minutes for deployment to complete
   - You'll get a URL like: `https://melltax-xxxxx.vercel.app`

### Step 6: Update Site URL

1. **Copy your Vercel deployment URL**: `https://melltax-xxxxx.vercel.app`
2. **Go to Vercel** → Your project → **Settings** → **Environment Variables**
3. **Edit** `NEXT_PUBLIC_SITE_URL`:
   - Change from temporary URL to your actual Vercel URL
   - Click **Save**
4. **Redeploy**:
   - Go to **Deployments** tab
   - Click **...** on latest deployment → **Redeploy**

### Step 7: Configure Supabase Redirect URLs

1. **Go to Supabase Dashboard**
2. **Authentication** → **URL Configuration**
3. **Add these URLs**:
   - Site URL: `https://melltax-xxxxx.vercel.app`
   - Redirect URLs:
     ```
     https://melltax-xxxxx.vercel.app/auth/callback
     http://localhost:3000/auth/callback
     ```
4. **Click Save**

### Step 8: Update Google OAuth Redirect

1. **Go back to Google Cloud Console**
2. **APIs & Services** → **Credentials**
3. **Edit your OAuth 2.0 Client ID**
4. **Add Authorized redirect URI**:
   ```
   https://xxxxxxxxxxxxx.supabase.co/auth/v1/callback
   ```
   (Your Supabase URL - should already be there, verify it)
5. **Click Save**

---

## Part 3: Test Everything (5 minutes)

### Step 9: Test Authentication

1. **Visit your deployed site**: `https://melltax-xxxxx.vercel.app`
2. **Click "Sign in"** in the navigation bar
3. **Select your Google account**
4. **Grant permissions**
5. **You should be redirected back** with your profile showing in the navbar

### Step 10: Test on Mobile

1. **Open on mobile device**: Use the same URL
2. **Tap hamburger menu** (☰)
3. **Sign in with Google**
4. **Verify your profile appears** in the drawer menu

---

## Part 4: Optional Enhancements

### Custom Domain (Optional)

1. **In Vercel** → Your project → **Settings** → **Domains**
2. **Add your domain**: e.g., `melltax.com`
3. **Follow DNS configuration instructions**
4. **Update environment variables**:
   - `NEXT_PUBLIC_SITE_URL = https://melltax.com`
5. **Update Supabase redirect URLs** with your custom domain

### Google AdSense (Optional)

1. **Apply for AdSense**: https://www.google.com/adsense
2. **Get your publisher ID**: `ca-pub-XXXXXXXXXXXXXXXX`
3. **Add to Vercel environment variables**:
   ```
   NEXT_PUBLIC_ADSENSE_CLIENT_ID = ca-pub-XXXXXXXXXXXXXXXX
   ```
4. **Redeploy**

### Google Analytics (Optional)

1. **Create GA4 property**: https://analytics.google.com
2. **Get Measurement ID**: `G-XXXXXXXXXX`
3. **Add to Vercel environment variables**:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID = G-XXXXXXXXXX
   ```
4. **Redeploy**

---

## Troubleshooting

### Authentication Not Working

**Issue**: "Sign in" button doesn't work
- **Check**: Browser console for errors
- **Verify**: Supabase credentials in Vercel environment variables
- **Verify**: Google OAuth redirect URLs include your Supabase URL

**Issue**: Redirect after sign-in fails
- **Check**: Supabase redirect URLs include your Vercel deployment URL
- **Check**: Google OAuth client has correct redirect URI

### Build Failures

**Issue**: Vercel build fails
- **Check**: All environment variables are set
- **Check**: `npm run build` works locally
- **Try**: Clear build cache in Vercel → **Settings** → **Clear Build Cache**

### Database Errors

**Issue**: "relation profiles does not exist"
- **Solution**: Run the SQL schema from Step 3 again
- **Verify**: Check Table Editor in Supabase

---

## Environment Variables Summary

Here's a complete list of all environment variables you need:

### Required:
```env
NEXT_PUBLIC_SITE_URL=https://your-vercel-url.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Optional:
```env
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## Quick Command Reference

### Local Development:
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Test production build locally
npm run build
npm start
```

### Deployment:
```bash
# Commit and push changes
git add .
git commit -m "Your commit message"
git push

# Vercel auto-deploys on push to main branch
# Or manually redeploy in Vercel dashboard
```

---

## Support

- **Supabase Docs**: https://supabase.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

## Checklist

Use this checklist to track your setup progress:

- [ ] Supabase project created
- [ ] Supabase credentials copied
- [ ] Database schema created (profiles table)
- [ ] Google Cloud project created
- [ ] Google OAuth credentials created
- [ ] Google OAuth configured in Supabase
- [ ] Vercel account created
- [ ] GitHub repository connected to Vercel
- [ ] Environment variables added to Vercel
- [ ] First deployment successful
- [ ] Site URL updated in environment variables
- [ ] Supabase redirect URLs configured
- [ ] Google OAuth redirect verified
- [ ] Authentication tested on desktop
- [ ] Authentication tested on mobile
- [ ] Custom domain configured (optional)
- [ ] Google AdSense added (optional)
- [ ] Google Analytics added (optional)

---

**Estimated Total Time**: 30-40 minutes

**You're done!** 🎉 Your MELLTAX app is now live with full authentication.
