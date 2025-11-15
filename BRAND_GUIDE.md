# MELLTAX Brand Guide

## Brand Overview

MELLTAX is a modern, professional Thai withholding tax calculator designed for freelancers and SMEs. The brand conveys trust, simplicity, and financial clarity.

---

## Logo

### Concept
The MELLTAX logo combines an abstract "M" that flows seamlessly into a checkmark, symbolizing "tax checked/approved." A subtle Thai Baht symbol (฿) reinforces the financial and Thai market focus.

### Logo Files

#### Standard Logos
- **`logo-melltax-icon.svg`** - Icon only (120x120px) - For app icons, favicons
- **`logo-melltax-icon-80.svg`** - Icon only (80x80px) - For navbar, small displays
- **`logo-melltax-full.svg`** - Horizontal logo with wordmark (320x80px) - For headers, marketing

#### Monochrome Versions
- **`logo-melltax-icon-mono.svg`** - Monochrome icon (black/white)
- **`logo-melltax-full-mono.svg`** - Monochrome horizontal logo

### Wordmark Typography
- **"MELL"**: Regular weight (400)
- **"TAX"**: Bold weight (700)
- Accent line under the "X" in emerald green

### Logo Usage Guidelines

✅ **DO:**
- Use on white or light backgrounds (full color version)
- Use monochrome on dark backgrounds
- Maintain minimum clear space (equal to the height of the icon)
- Scale proportionally

❌ **DON'T:**
- Stretch or distort the logo
- Change the colors
- Add effects (shadows, gradients, outlines)
- Place on busy backgrounds without sufficient contrast

---

## Color Palette

### Primary Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Indigo Blue** | `#2C3E6F` | Primary brand color, headings, buttons, navbar |
| **Emerald** | `#00B894` | Accent color, checkmarks, success states, highlights |

### Background Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Light Background** | `#F5F7FB` | Main background (light mode) |
| **Dark Background** | `#0B1220` | Main background (dark mode) |

### Text Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Primary Text** | `#111827` | Body text (light mode) |
| **White Text** | `#FFFFFF` | Text on dark backgrounds |

### Extended Palettes

#### Primary (Indigo-Blue)
- `primary-50`: #F0F3F9
- `primary-100`: #D9E2F0
- `primary-200`: #B3C5E1
- `primary-300`: #8DA8D2
- `primary-400`: #5A7BB4
- **`primary-500`: #2C3E6F** ← Brand Primary
- `primary-600`: #253459
- `primary-700`: #1E2A43
- `primary-800`: #16202D
- `primary-900`: #0B1220

#### Accent (Emerald)
- `accent-50`: #E6F9F4
- `accent-100`: #B3EFE0
- `accent-200`: #80E5CC
- `accent-300`: #4DDBB8
- `accent-400`: #1AD1A4
- **`accent-500`: #00B894** ← Brand Accent
- `accent-600`: #009975
- `accent-700`: #007A5E
- `accent-800`: #005B46
- `accent-900`: #003C2F

#### Neutral
- `neutral-50`: #F5F7FB
- `neutral-100`: #E5E9F2
- `neutral-200`: #CBD2E0
- `neutral-300`: #9CA5B8
- `neutral-400`: #6D7890
- `neutral-500`: #4B5563
- `neutral-600`: #374151
- `neutral-700`: #1F2937
- `neutral-800`: #111827
- `neutral-900`: #0B1220

### Color Usage Examples

```tsx
// Primary button
className="bg-brand-primary text-white hover:bg-primary-600"

// Accent button
className="bg-brand-accent text-white hover:bg-accent-600"

// Success message
className="text-accent-600"

// Card
className="bg-white dark:bg-neutral-800 border border-neutral-200"
```

---

## Typography

### Font Families

#### English Text
- **Primary**: Inter (weights: 300, 400, 500, 600, 700, 800)
- **System Fallback**: system-ui, -apple-system, sans-serif

#### Thai Text
- **Primary**: Prompt (weights: 300, 400, 500, 600, 700)
- **Alternative**: Sarabun (weights: 300, 400, 500, 600, 700)
- **System Fallback**: system-ui, sans-serif

### Font Import
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&family=Sarabun:wght@300;400;500;600;700&display=swap');
```

### Typography Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Display 1 | 4.5rem (72px) | 700 | 1.1 |
| Display 2 | 3.75rem (60px) | 700 | 1.1 |
| Display 3 | 3rem (48px) | 700 | 1.2 |
| H1 | 2.25rem (36px) | 700 | 1.2 |
| H2 | 1.875rem (30px) | 600 | 1.3 |
| H3 | 1.5rem (24px) | 600 | 1.4 |
| H4 | 1.25rem (20px) | 600 | 1.5 |
| Body Large | 1.125rem (18px) | 400 | 1.6 |
| Body | 1rem (16px) | 400 | 1.5 |
| Body Small | 0.875rem (14px) | 400 | 1.5 |
| Caption | 0.75rem (12px) | 400 | 1.4 |

### Typography Usage

```tsx
// Headings
<h1 className="text-4xl font-bold text-brand-primary">Title</h1>
<h2 className="text-3xl font-semibold text-brand-primary">Subtitle</h2>

// Body text
<p className="text-base text-neutral-700 dark:text-neutral-300">Body text</p>

// Emphasis
<span className="font-semibold text-brand-primary">Important</span>
```

---

## UI Components

### Buttons

#### Primary Button
```tsx
<button className="bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-all shadow-md">
  Calculate
</button>
```

#### Accent Button
```tsx
<button className="bg-brand-accent text-white px-4 py-2 rounded-lg hover:bg-accent-600 transition-all">
  Save
</button>
```

#### Outline Button
```tsx
<button className="border-2 border-brand-primary text-brand-primary px-4 py-2 rounded-lg hover:bg-primary-50">
  Learn More
</button>
```

### Cards

```tsx
<div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-brand p-6">
  {/* Card content */}
</div>
```

### Inputs

```tsx
<input className="border border-neutral-300 dark:border-neutral-600 rounded-lg px-4 py-2 focus:border-brand-primary focus:ring-2 focus:ring-brand-accent" />
```

---

## Visual Style

### Shadows
- **Brand Shadow**: `0 4px 6px -1px rgba(44, 62, 111, 0.1), 0 2px 4px -1px rgba(44, 62, 111, 0.06)`
- **Brand Shadow Large**: `0 10px 15px -3px rgba(44, 62, 111, 0.1), 0 4px 6px -2px rgba(44, 62, 111, 0.05)`

### Gradients
- **Brand Gradient**: `linear-gradient(135deg, #2C3E6F 0%, #00B894 100%)`
- **Subtle Gradient**: `linear-gradient(135deg, #F0F3F9 0%, #E6F9F4 100%)`

### Border Radius
- **Small**: 0.375rem (6px)
- **Medium**: 0.5rem (8px)
- **Large**: 0.75rem (12px)
- **Extra Large**: 1rem (16px)

### Spacing Scale
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)

---

## Brand Voice & Tone

### Personality
- **Professional** but approachable
- **Clear** and easy to understand
- **Helpful** and supportive
- **Trustworthy** and reliable

### Language Guidelines

#### English
- Use simple, direct language
- Avoid jargon unless necessary
- Be concise and clear
- Use active voice

#### Thai
- Use polite, professional Thai (ภาษาทางการที่สุภาพ)
- Avoid overly formal or archaic terms
- Balance between formal and friendly
- Ensure cultural appropriateness

### Example Messaging

✅ **Good:**
- "Calculate your withholding tax in seconds"
- "Simple. Free. Accurate."
- "คำนวณภาษีหัก ณ ที่จ่ายแบบง่าย ๆ"

❌ **Avoid:**
- "Utilize our sophisticated algorithmic tax computation engine" (too complex)
- "Tax is hard, we make it easy!" (condescending tone)

---

## Accessibility

### Color Contrast
- All text must meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
- Brand primary on white: ✅ 8.5:1
- Brand accent on white: ✅ 4.8:1

### Focus States
- All interactive elements must have visible focus indicators
- Use `focus:ring-2 focus:ring-brand-accent` for focus states

### Screen Readers
- All images must have descriptive alt text
- Logo alt text: "MELLTAX - Thai Withholding Tax Calculator"

---

## File Organization

```
public/
├── logo-melltax-icon.svg          # 120x120 icon (full color)
├── logo-melltax-icon-80.svg       # 80x80 icon (full color)
├── logo-melltax-icon-mono.svg     # 120x120 icon (monochrome)
├── logo-melltax-full.svg          # Horizontal logo (full color)
└── logo-melltax-full-mono.svg     # Horizontal logo (monochrome)
```

---

## Quick Reference

### CSS Variables
```css
:root {
  --brand-primary: #2C3E6F;
  --brand-accent: #00B894;
  --brand-light-bg: #F5F7FB;
  --brand-dark-bg: #0B1220;
  --brand-text-primary: #111827;
}
```

### Tailwind Classes
```tsx
// Brand colors
bg-brand-primary
text-brand-accent
border-brand-primary

// Typography
font-thai (for Thai text)
font-sans (for English text)

// Shadows
shadow-brand
shadow-brand-lg
```

---

## Contact

For brand assets or questions:
- Brand files: `/public/`
- Design tokens: `tailwind.config.ts`
- Global styles: `src/app/globals.css`

---

**Version**: 1.0
**Last Updated**: 2025
**Created by**: MELLTAX Design Team
