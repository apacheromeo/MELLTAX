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
        // HR Dashboard Brand Palette
        brand: {
          // Primary - Deep Blue with full scale
          primary: {
            DEFAULT: '#2C3E6F',
            50: '#F0F2F7',
            100: '#E1E5EF',
            200: '#C3CBE0',
            300: '#A5B1D0',
            400: '#6983A9',
            500: '#2C3E6F',
            600: '#253764',
            700: '#1E2D54',
            800: '#172343',
            900: '#0B1220',
          },
          // Accent - Teal/Green with full scale
          accent: {
            DEFAULT: '#00B894',
            50: '#E6F9F5',
            100: '#CCF3EB',
            200: '#99E7D7',
            300: '#66DBC3',
            400: '#33CFAF',
            500: '#00B894',
            600: '#009376',
            700: '#006E59',
            800: '#004A3B',
            900: '#00251E',
          },
          // Background Colors
          light: {
            DEFAULT: '#F5F7FB',
            surface: '#FFFFFF',
            hover: '#EDF0F5',
            border: '#E5E7EB',
          },
          dark: {
            DEFAULT: '#0B1220',
            surface: '#1A2332',
            hover: '#243042',
            border: '#374151',
          },
          // Text Colors
          text: {
            DEFAULT: '#111827',
            light: '#6B7280',
            lighter: '#9CA3AF',
            dark: '#F9FAFB',
            'dark-light': '#D1D5DB',
            'dark-lighter': '#9CA3AF',
          },
        },
      },

      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'Segoe UI',
          'system-ui',
          'sans-serif',
        ],
        thai: [
          'IBM Plex Sans Thai',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
      },

      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0' }],
        'sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '-0.006em' }],
        'base': ['1rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        'lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        'xl': ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.015em' }],
        '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
      },

      borderRadius: {
        'sm': '0.375rem',
        'DEFAULT': '0.5rem',
        'md': '0.625rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.25rem',
        'card': '0.75rem',
        'dashboard': '1rem',
      },

      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.04)',
        'DEFAULT': '0 1px 3px rgba(0, 0, 0, 0.06)',
        'md': '0 2px 4px rgba(0, 0, 0, 0.06)',
        'lg': '0 4px 6px rgba(0, 0, 0, 0.04)',
        'xl': '0 8px 12px rgba(0, 0, 0, 0.06)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
        'dashboard': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
        'none': 'none',
      },

      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
};

export default config;
