import React from 'react';
import dayjs from 'dayjs';
import uk from 'dayjs/locale/uk';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { Metadata } from 'next';
import Head from 'next/head';
import Script from 'next/script';

import { ClientWrap } from '@/app/ClientWrap';
import { manrope } from '@/styles/theme/constants/typography/typography';

import '@/styles/reset.scss';
import '@/styles/typography.scss';
import '@/styles/global-styles.scss';

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault('Europe/Kiev');
dayjs.locale({ ...uk, weekStart: 1 });

export const metadata: Metadata = {
  title: 'PWA with Next 13',
  description: 'PWA application with Next 13',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['nextjs', 'nextjs13', 'next13', 'pwa', 'next-pwa'],
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#fff' }],
  authors: [
    { name: 'Rajesh Prajapati' },
    {
      name: 'Rajesh Prajapati',
      url: 'https://www.linkedin.com/in/raazeshp96/',
    },
  ],
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  icons: [
    { rel: 'apple-touch-icon', url: 'icons/icon-128x128.png' },
    { rel: 'icon', url: 'icons/icon-128x128.png' },
  ],
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <Head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTM}`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag("js", new Date());

            gtag("config", ${process.env.GTM});`}
        </Script>
        <script async src="https://telegram.org/js/telegram-widget.js" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta
          name="google-site-verification"
          content="M93dY9EuPcQ5AzSYwxc6_el0GwZp_XlDHBhphP6z-7g"
        />
      </Head>
      <body className={manrope.className} style={manrope.style}>
        <ClientWrap>{children}</ClientWrap>
      </body>
    </html>
  );
}
