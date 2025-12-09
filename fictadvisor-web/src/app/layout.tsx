import { use } from 'react';
import moment from 'moment';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import Script from 'next/script';

import Providers from '@/components/common/layout/providers';
import { manrope } from '@/styles/theme/constants/typography/typography';

import 'moment/locale/uk';
import 'moment-timezone';

import '@/styles/reset.scss';
import '@/styles/typography.scss';
import '@/styles/global-styles.scss';

moment.tz.setDefault('Europe/Kiev');
moment.tz.setDefault('uk');
moment.updateLocale('uk', {
  week: {
    dow: 1,
  },
});

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host');

  return {
    metadataBase: new URL(`https://${host}`),
    icons: [
      {
        url: '/favicon.ico',
        type: 'image/png',
      },
    ],
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={manrope.className}
      style={manrope.style}
    >
      <head>
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
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <meta
          name="google-site-verification"
          content="M93dY9EuPcQ5AzSYwxc6_el0GwZp_XlDHBhphP6z-7g"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
