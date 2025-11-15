import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // MELLTAX Brand Colors
        brand: {
          primary: '#2C3E6F',      // Indigo-blue (main brand color)
          accent: '#00B894',        // Emerald (success, checkmarks, highlights)
          'light-bg': '#F5F7FB',    // Light background
          'dark-bg': '#0B1220',     // Dark background
          'text-primary': '#111827', // Primary text color
        },

        // Primary palette (indigo-blue)
        primary: {
          50: '#F0F3F9',
          100: '#D9E2F0',
          200: '#B3C5E1',
          300: '#8DA8D2',
          400: '#5A7BB4',
          500: '#2C3E6F',  // Brand primary
          600: '#253459',
          700: '#1E2A43',
          800: '#16202D',
          900: '#0B1220',  // Brand dark-bg
        },

        // Accent palette (emerald)
        accent: {
          50: '#E6F9F4',
          100: '#B3EFE0',
          200: '#80E5CC',
          300: '#4DDBB8',
          400: '#1AD1A4',
          500: '#00B894',  // Brand accent
          600: '#009975',
          700: '#007A5E',
          800: '#005B46',
          900: '#003C2F',
        },

        // Secondary (keeping old green for backward compatibility)
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },

        // Neutral palette
        neutral: {
          50: '#F5F7FB',   // Brand light-bg
          100: '#E5E9F2',
          200: '#CBD2E0',
          300: '#9CA5B8',
          400: '#6D7890',
          500: '#4B5563',
          600: '#374151',
          700: '#1F2937',
          800: '#111827',  // Brand text-primary
          900: '#0B1220',  // Brand dark-bg
        },
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        thai: ['Prompt', 'Sarabun', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        // Custom typography scale
        'display-1': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-2': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-3': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
      },

      boxShadow: {
        'brand': '0 4px 6px -1px rgba(44, 62, 111, 0.1), 0 2px 4px -1px rgba(44, 62, 111, 0.06)',
        'brand-lg': '0 10px 15px -3px rgba(44, 62, 111, 0.1), 0 4px 6px -2px rgba(44, 62, 111, 0.05)',
      },

      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #2C3E6F 0%, #00B894 100%)',
        'gradient-brand-subtle': 'linear-gradient(135deg, #F0F3F9 0%, #E6F9F4 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
