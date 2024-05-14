import moment from 'moment';
import { Metadata } from 'next';
import Head from 'next/head';
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
  return {
    metadataBase: new URL(`https://${headers().get('host')}`),
  };
}

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
        <Script async src="https://telegram.org/js/telegram-widget.js" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
