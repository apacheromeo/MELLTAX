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
        // Minimal brand colors
        brand: {
          primary: '#1a1a1a',
          accent: '#0066FF',
          'light-bg': '#ffffff',
          'dark-bg': '#000000',
        },
      },

      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Inter',
          'SF Pro Display',
          'Segoe UI',
          'system-ui',
          'sans-serif',
        ],
        thai: [
          'IBM Plex Sans Thai',
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
      },

      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.04)',
        'DEFAULT': '0 1px 3px rgba(0, 0, 0, 0.06)',
        'md': '0 2px 4px rgba(0, 0, 0, 0.06)',
        'lg': '0 4px 6px rgba(0, 0, 0, 0.04)',
        'xl': '0 8px 12px rgba(0, 0, 0, 0.06)',
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
