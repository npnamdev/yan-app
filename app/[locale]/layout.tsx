import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Trí Tuệ Nhân Tạo - Chìa Khóa Của Cuộc Cách Mạng Công Nghệ",
  description: "Học hỏi và phát triển kỹ năng trong lĩnh vực AI để trở thành chuyên gia trong các công nghệ thông minh, tự động hóa và phân tích dữ liệu."
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
}

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
            {children}
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}