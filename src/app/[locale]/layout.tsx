/**
 * Locale-specific layout
 * Wraps all pages with i18n provider and common layout elements
 */

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { SkipToContent } from '@/components/layout/SkipToContent';
import { TopLoadingBar } from '@/components/common/TopLoadingBar';
import { ToastProvider } from '@/components/common/ToastProvider';
import { locales, Locale } from '@/lib/i18n/config';
import { getWebApplicationSchema, getOrganizationSchema } from '@/lib/jsonld';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'seo' });

  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const t = await getTranslations('nav');
  const tCommon = await getTranslations('common');

  // Generate JSON-LD schemas
  const webAppSchema = getWebApplicationSchema(locale as Locale);
  const orgSchema = getOrganizationSchema();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-brand-light dark:bg-brand-dark">
        {/* Skip to Main Content (Accessibility) */}
        <SkipToContent />

        {/* Top Loading Bar */}
        <TopLoadingBar />

        <ClientLayout>
          <ToastProvider>
            <NextIntlClientProvider messages={messages}>
              <Navbar locale={locale as Locale} />

              <main id="main-content" className="flex-1">
                {children}
              </main>

              <Footer />
            </NextIntlClientProvider>
          </ToastProvider>
        </ClientLayout>

        {/* JSON-LD Structured Data - at end of body for best practice */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </body>
    </html>
  );
}
