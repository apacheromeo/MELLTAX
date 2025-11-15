/**
 * Locale-specific layout
 * Wraps all pages with i18n provider and common layout elements
 */

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { locales, Locale } from '@/lib/i18n/config';
import Script from 'next/script';

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
  const tFooter = await getTranslations('footer');
  const tCommon = await getTranslations('common');

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Google AdSense Script */}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
        <NextIntlClientProvider messages={messages}>
          <Navbar
            locale={locale as Locale}
            translations={{
              appName: tCommon('appName'),
              calculator: t('calculator'),
              planner: t('planner'),
              about: t('about'),
              login: t('login'),
            }}
          />

          <main className="flex-1">{children}</main>

          <Footer
            translations={{
              disclaimer: tFooter('disclaimer'),
              privacy: tFooter('privacy'),
              about: t('about'),
              madeWith: tFooter('madeWith'),
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
