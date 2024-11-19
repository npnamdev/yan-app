import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import HeaderLayout from "@/components/layout/HeaderLayout";
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function LocaleLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: string }; }) {
  if (!routing.locales.includes(locale as any)) { notFound(); }
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* <HeaderLayout /> */}
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}