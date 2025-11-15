# MELLTAX - Thai Withholding Tax Calculator

A production-ready web app for calculating withholding tax (ภาษีหัก ณ ที่จ่าย) in Thailand. Built with Next.js 14, TypeScript, and TailwindCSS. Supports Thai and English languages.

---

## Features

- **Withholding Tax Calculator**: Calculate tax on a single invoice with Gross→Net and Net→Gross modes
- **Multi-Invoice Tax Planner**: Plan taxes across multiple invoices with charts
- **Bilingual Support**: Thai and English interface (TH/EN toggle)
- **Dark/Light Mode**: Theme toggle for better user experience
- **Google AdSense Integration**: Monetization ready
- **Responsive Design**: Works on desktop, tablet, and mobile
- **SEO Optimized**: Sitemap, robots.txt, and proper meta tags

---

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS** (styling)
- **next-intl** (internationalization)
- **Recharts** (charts in planner)
- **Supabase** (optional - for auth & data saving)

---

## Quick Start (For Non-Coders)

### Prerequisites

You need to have these installed on your computer:

1. **Node.js** (version 18 or higher)
   - Download from: https://nodejs.org/
   - To check if installed, open Terminal/Command Prompt and type: `node --version`

2. **npm** (comes with Node.js)
   - To check: `npm --version`

### Step 1: Setup

1. **Open Terminal** (Mac/Linux) or **Command Prompt** (Windows)

2. **Navigate to the project folder**:
   ```bash
   cd MELLTAX
   ```

3. **Install dependencies** (this downloads all the code libraries needed):
   ```bash
   npm install
   ```
   This will take 2-3 minutes. Don't worry if you see some warnings - that's normal!

4. **Create your environment file**:
   ```bash
   cp .env.example .env.local
   ```

   Then open `.env.local` in a text editor and fill in your details:
   ```
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
   ```

### Step 2: Run the Development Server

1. **Start the server**:
   ```bash
   npm run dev
   ```

2. **Open your browser** and go to:
   ```
   http://localhost:3000
   ```

3. You should see the MELLTAX homepage!

4. To stop the server, press `Ctrl+C` in the terminal.

---

## Deploying to Vercel (Production)

### Prerequisites

1. Create a free account at: https://vercel.com
2. Install Vercel CLI (optional but helpful):
   ```bash
   npm install -g vercel
   ```

### Method 1: Deploy via Vercel Dashboard (Easiest)

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Connect your GitHub account and select your MELLTAX repository
4. Click "Import"
5. In "Environment Variables" section, add:
   - `NEXT_PUBLIC_SITE_URL`: Your production URL (e.g., `https://melltax.com`)
   - `NEXT_PUBLIC_ADSENSE_CLIENT_ID`: Your AdSense ID (e.g., `ca-pub-1234567890`)
6. Click "Deploy"
7. Wait 2-3 minutes, and your app is live!

### Method 2: Deploy via CLI

1. Login to Vercel:
   ```bash
   vercel login
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

3. Follow the prompts and add your environment variables when asked.

---

## Setting Up Google AdSense

### Step 1: Sign up for AdSense

1. Go to https://www.google.com/adsense
2. Sign in with your Google account
3. Add your website URL
4. Wait for approval (can take 1-2 weeks)

### Step 2: Get Your AdSense Client ID

1. Once approved, go to AdSense dashboard
2. Click "Ads" → "Overview"
3. Look for your publisher ID that looks like: `ca-pub-1234567890123456`
4. Copy this ID

### Step 3: Add to Your App

1. Open `.env.local` file
2. Replace `NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX` with your actual ID
3. Restart your development server

**Note**: Ads won't show in development mode (localhost). They only appear in production (after deploying to Vercel).

---

## Setting Up Supabase (Optional - For User Authentication)

Supabase is only needed if you want users to:
- Log in with Google
- Save their calculation history
- Save their tax plans

If you don't need these features, you can skip this section!

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign up for a free account
3. Click "New Project"
4. Fill in:
   - Project name: `melltax`
   - Database password: (make a strong password)
   - Region: Choose closest to Thailand (Singapore)
5. Click "Create Project" (takes 2-3 minutes)

### Step 2: Get Your API Keys

1. In Supabase dashboard, click "Settings" (gear icon)
2. Click "API" in the sidebar
3. Copy these values:
   - `Project URL` → This is your `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 3: Add to Your App

1. Open `.env.local`
2. Add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```
3. Restart your server

### Step 4: Enable Google Auth (Optional)

1. In Supabase dashboard, go to "Authentication" → "Providers"
2. Enable "Google"
3. Follow Supabase's guide to set up Google OAuth

---

## Project Structure (Simple Explanation)

```
MELLTAX/
├── src/
│   ├── app/                    # Pages of your website
│   │   ├── [locale]/          # Thai/English versions
│   │   │   ├── page.tsx       # Home page (calculator)
│   │   │   ├── planner/       # Tax planner page
│   │   │   └── about/         # About page
│   │   ├── globals.css        # Global styles
│   │   └── layout.tsx         # Main layout wrapper
│   │
│   ├── components/            # Reusable UI pieces
│   │   ├── calculator/        # Calculator components
│   │   ├── planner/          # Planner components
│   │   ├── layout/           # Navbar, Footer
│   │   ├── ads/              # AdSense components
│   │   └── common/           # Buttons, Inputs, Cards
│   │
│   ├── lib/                   # Core logic
│   │   ├── tax/              # Tax calculation formulas
│   │   ├── i18n/             # Translations (TH/EN)
│   │   └── supabaseClient.ts # Database connection
│   │
│   └── types/                # TypeScript type definitions
│
├── public/                    # Static files (images, logos)
├── .env.local                # Your secret configuration
├── package.json              # Project dependencies
└── README.md                 # This file!
```

---

## Common Commands

### Development
```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Build for production (test before deploying)
npm run start        # Run production build locally
npm run lint         # Check code for errors
```

### Vercel Deployment
```bash
vercel               # Deploy to preview
vercel --prod        # Deploy to production
```

---

## Customization Guide

### Changing Colors

1. Open `tailwind.config.ts`
2. Find the `colors` section
3. Change the `primary` and `secondary` color values
4. Save and refresh your browser

### Editing Translations

1. **Thai**: Edit `src/lib/i18n/messages.th.json`
2. **English**: Edit `src/lib/i18n/messages.en.json`
3. Find the text you want to change and update it
4. Save and refresh

### Adding New Tax Categories

1. Open `src/lib/tax/withholdingRates.ts`
2. Add a new entry to the `TAX_RATES` object:
   ```typescript
   my_new_category: {
     category: 'my_new_category',
     rate: 5,  // Tax rate percentage
     nameTh: 'หมวดหมู่ใหม่',
     nameEn: 'New Category',
   },
   ```
3. Save and it will appear in the dropdown!

---

## Troubleshooting

### "npm: command not found"
- You need to install Node.js first: https://nodejs.org/

### "Port 3000 is already in use"
- Another app is using port 3000. Either:
  - Stop the other app
  - Or change the port: `PORT=3001 npm run dev`

### Ads not showing
- Ads only show in production (after deploying)
- Make sure you've added your real AdSense client ID
- Wait 24-48 hours after deploying for ads to appear

### Changes not appearing
1. Stop the server (`Ctrl+C`)
2. Delete `.next` folder
3. Run `npm run dev` again

### Build errors
1. Run: `npm run lint` to see what's wrong
2. Fix the errors shown
3. Try building again: `npm run build`

---

## Support & Resources

### Documentation
- **Next.js**: https://nextjs.org/docs
- **TailwindCSS**: https://tailwindcss.com/docs
- **Vercel**: https://vercel.com/docs
- **Supabase**: https://supabase.com/docs

### Getting Help
- Open an issue on GitHub
- Check Next.js Discord: https://discord.gg/nextjs
- Stack Overflow: Tag `nextjs` and `typescript`

---

## License

MIT License - Feel free to use this project for your own purposes!

---

## Credits

Built with:
- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [next-intl](https://next-intl-docs.vercel.app/)

Made with ❤️ for Thai freelancers and SMEs
