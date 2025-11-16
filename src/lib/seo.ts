/**
 * SEO Helper Functions
 * Phase 5: Centralized metadata generation for pages
 */

export interface PageMeta {
  title: string;
  description: string;
  url: string;
}

export function generatePageMeta({ title, description, url }: PageMeta) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website' as const,
      images: ['/og-image.png'],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}
