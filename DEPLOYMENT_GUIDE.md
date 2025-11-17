# MELLTAX Deployment Guide

## Fixes Applied

### 1. Navigation Link Errors (FIXED ✅)
**Problem:** 29 broken links missing locale prefixes caused NotFoundError, HierarchyRequestError, and blank pages.

**Solution:** All links now include locale prefix (e.g., `/${locale}/income-tax`)

### 2. Supabase Environment Variable Errors (FIXED ✅)
**Problem:** "supabaseUrl is required" error when Supabase credentials weren't configured.

**Solution:** Supabase client now uses fallback values and gracefully handles missing configuration.

---

## Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

The `.env.local` file has been created with sensible defaults. You can run the app immediately without configuring Supabase!

**For Basic Features (No Auth Required):**
- Leave Supabase variables commented out
- The app will work perfectly for calculations

**For Authentication Features:**
Uncomment and configure Supabase variables in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Supabase Setup (Optional - Only if you want authentication)

### Step 1: Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new organization (if needed)
4. Create a new project:
   - Name: MELLTAX
   - Database Password: (save this securely)
   - Region: Choose closest to your users

### Step 2: Get API Credentials
1. In your Supabase project, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 3: Configure Google OAuth (for Sign in with Google)
1. In Supabase, go to **Authentication** → **Providers**
2. Enable **Google** provider
3. Follow Supabase instructions to:
   - Create Google OAuth credentials in Google Cloud Console
   - Add authorized redirect URIs:
     - `https://your-project.supabase.co/auth/v1/callback` (production)
     - `http://localhost:3000/auth/callback` (local development)
4. Add Client ID and Client Secret to Supabase

### Step 4: Set Up Database Tables
Run this SQL in Supabase **SQL Editor**:

```sql
-- Create calculations table for saving user calculations
CREATE TABLE IF NOT EXISTS calculations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  input_data JSONB NOT NULL,
  result_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE calculations ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own calculations
CREATE POLICY "Users can view own calculations"
  ON calculations
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own calculations
CREATE POLICY "Users can insert own calculations"
  ON calculations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own calculations
CREATE POLICY "Users can update own calculations"
  ON calculations
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can delete their own calculations
CREATE POLICY "Users can delete own calculations"
  ON calculations
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_calculations_user_id ON calculations(user_id);
CREATE INDEX idx_calculations_created_at ON calculations(created_at DESC);
```

---

## Vercel Deployment

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub** (already done via this branch)

2. **Go to Vercel Dashboard**
   - Visit [https://vercel.com](https://vercel.com)
   - Click "New Project"

3. **Import Git Repository**
   - Select your MELLTAX repository
   - Click "Import"

4. **Configure Project**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

5. **Add Environment Variables**

   **Required for Production:**
   ```
   NEXT_PUBLIC_SITE_URL = https://your-domain.vercel.app
   ```

   **Optional - Supabase (only if you set it up):**
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key-here
   ```

   **Optional - Google AdSense:**
   ```
   NEXT_PUBLIC_ADSENSE_CLIENT_ID = ca-pub-XXXXXXXXXXXXXXXX
   ```

   **Optional - Google Analytics:**
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID = G-XXXXXXXXXX
   ```

6. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Your app will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

---

## Post-Deployment Checklist

### ✅ Required Steps

1. **Update Supabase Redirect URLs** (if using auth)
   - Go to Supabase → Authentication → URL Configuration
   - Add your Vercel domain:
     - Site URL: `https://your-domain.vercel.app`
     - Redirect URLs:
       - `https://your-domain.vercel.app/auth/callback`
       - `https://your-domain.vercel.app/**`

2. **Update Google OAuth** (if using auth)
   - Go to Google Cloud Console
   - Add authorized redirect URI:
     - `https://your-project.supabase.co/auth/v1/callback`
   - Add authorized JavaScript origins:
     - `https://your-domain.vercel.app`

3. **Test Your Deployment**
   - Visit your Vercel URL
   - Test calculator functionality
   - Test language switching (TH/EN)
   - Test theme toggle (Light/Dark)
   - Test authentication (if configured)

### ✅ Optional Steps

4. **Custom Domain** (Recommended)
   - In Vercel Dashboard → Settings → Domains
   - Add your custom domain (e.g., `melltax.com`)
   - Update DNS records as instructed
   - Update `NEXT_PUBLIC_SITE_URL` environment variable

5. **Google AdSense**
   - Apply for AdSense at [https://www.google.com/adsense](https://www.google.com/adsense)
   - Add site verification code to your domain
   - Once approved, add client ID to environment variables
   - Redeploy to activate ads

6. **Google Analytics**
   - Create GA4 property at [https://analytics.google.com](https://analytics.google.com)
   - Get Measurement ID (G-XXXXXXXXXX)
   - Add to environment variables
   - Redeploy to activate tracking

---

## Troubleshooting

### Build Fails with Supabase Errors
**Cause:** Environment variables not set in Vercel

**Fix:**
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Redeploy

### Authentication Not Working
**Causes:**
- Redirect URLs not configured in Supabase
- Google OAuth not set up correctly

**Fix:**
1. Check Supabase → Authentication → URL Configuration
2. Verify Google OAuth credentials in Supabase
3. Check Google Cloud Console redirect URIs

### Blank Page / 404 Errors
**Cause:** Using old deployed version before fixes

**Fix:**
1. Make sure latest code is pushed to GitHub
2. Trigger new deployment in Vercel
3. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

### CSS Not Loading / Styling Issues
**Cause:** Tailwind CSS build issue or caching

**Fix:**
1. Clear build cache in Vercel
2. Trigger new deployment
3. Clear browser cache

---

## Performance Optimization

### Enable Caching
Vercel automatically enables:
- Static asset caching (images, CSS, JS)
- CDN distribution
- Gzip compression

### Image Optimization
Already configured via Next.js Image component. Vercel optimizes:
- Automatic WebP conversion
- Responsive images
- Lazy loading

### Analytics
Monitor performance in Vercel Dashboard:
- Real User Monitoring (RUM)
- Web Vitals (LCP, FID, CLS)
- Deployment analytics

---

## Security Best Practices

### ✅ Implemented
- Row Level Security (RLS) in Supabase
- Environment variables for sensitive data
- HTTPS-only in production
- CORS protection via middleware

### 🔒 Recommendations
1. **Regular Updates**
   ```bash
   npm audit
   npm update
   ```

2. **Rate Limiting** (Optional)
   - Consider adding rate limiting for API routes
   - Use Vercel Edge Middleware for DDoS protection

3. **Content Security Policy** (Optional)
   - Add CSP headers in `next.config.js`

---

## Monitoring & Maintenance

### Check Regularly
- Vercel deployment logs
- Supabase database usage
- Google Analytics traffic
- AdSense earnings

### Update Dependencies
```bash
# Check for updates
npm outdated

# Update packages
npm update

# Update Next.js
npm install next@latest react@latest react-dom@latest
```

---

## Support & Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Need Help?
- Check the SETUP_GUIDE.md for Supabase details
- Review error logs in Vercel Dashboard
- Check browser console for client-side errors
- Review Supabase logs for auth/database issues

---

## Summary

Your app is now:
- ✅ Fixed and ready to deploy
- ✅ Works without Supabase (basic features)
- ✅ Supports authentication (if Supabase configured)
- ✅ Production-ready for Vercel
- ✅ Optimized for performance

**Next Steps:**
1. Deploy to Vercel using the guide above
2. (Optional) Set up Supabase if you want authentication
3. (Optional) Configure Google AdSense for monetization
4. Share your app with users!
