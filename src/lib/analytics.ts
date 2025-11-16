/**
 * Analytics Utilities
 * Phase 8: Simple analytics tracking structure
 *
 * Usage:
 * - Currently logs to console in development
 * - Ready to integrate with Google Analytics 4, Plausible, or other analytics providers
 *
 * To integrate GA4:
 * 1. Add GA4 script to layout.tsx or create GoogleAnalytics component
 * 2. Uncomment the gtag() calls below
 * 3. Set NEXT_PUBLIC_GA_MEASUREMENT_ID in .env.local
 *
 * To integrate Plausible:
 * 1. Add Plausible script to layout.tsx
 * 2. Use window.plausible() in trackEvent()
 */

export interface AnalyticsEvent {
  name: string;
  category?: string;
  label?: string;
  value?: number;
  data?: Record<string, any>;
}

/**
 * Track a custom event
 * @param name - Event name (e.g., 'calculator_submit', 'plan_saved')
 * @param data - Optional event data
 */
export function trackEvent(name: string, data?: Record<string, any>) {
  // Development logging
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', name, data);
  }

  // Google Analytics 4 (uncomment when configured)
  /*
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', name, {
      ...data,
      event_category: data?.category,
      event_label: data?.label,
      value: data?.value,
    });
  }
  */

  // Plausible Analytics (uncomment when configured)
  /*
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible(name, { props: data });
  }
  */

  // Custom analytics endpoint (uncomment if using custom analytics)
  /*
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event: name, data }),
  }).catch(err => console.error('Analytics error:', err));
  */
}

/**
 * Track page view
 * @param url - The page URL
 * @param title - The page title
 */
export function trackPageView(url: string, title?: string) {
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Page View:', url, title);
  }

  // Google Analytics 4
  /*
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: title,
    });
  }
  */

  // Plausible (automatically tracks page views, but you can manually trigger if needed)
  /*
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible('pageview');
  }
  */
}

/**
 * Pre-defined event tracking functions for common actions
 */

export const analytics = {
  // Calculator events
  calculatorSubmit: (paymentType: string, mode: string) => {
    trackEvent('calculator_submit', {
      category: 'calculator',
      payment_type: paymentType,
      calculation_mode: mode,
    });
  },

  calculatorSave: (success: boolean) => {
    trackEvent('calculator_save', {
      category: 'calculator',
      success,
    });
  },

  // Planner events
  plannerAddItem: (category: string) => {
    trackEvent('planner_add_item', {
      category: 'planner',
      item_category: category,
    });
  },

  plannerSavePlan: (itemCount: number, success: boolean) => {
    trackEvent('planner_save_plan', {
      category: 'planner',
      item_count: itemCount,
      success,
    });
  },

  plannerLoadPlan: (itemCount: number) => {
    trackEvent('planner_load_plan', {
      category: 'planner',
      item_count: itemCount,
    });
  },

  plannerDeletePlan: () => {
    trackEvent('planner_delete_plan', {
      category: 'planner',
    });
  },

  // Auth events
  authSignIn: (method: string) => {
    trackEvent('auth_sign_in', {
      category: 'auth',
      method,
    });
  },

  authSignOut: () => {
    trackEvent('auth_sign_out', {
      category: 'auth',
    });
  },

  // Navigation events
  navigationClick: (destination: string) => {
    trackEvent('navigation_click', {
      category: 'navigation',
      destination,
    });
  },

  // Language toggle
  languageChange: (locale: string) => {
    trackEvent('language_change', {
      category: 'settings',
      locale,
    });
  },

  // Theme toggle
  themeChange: (theme: string) => {
    trackEvent('theme_change', {
      category: 'settings',
      theme,
    });
  },
};
