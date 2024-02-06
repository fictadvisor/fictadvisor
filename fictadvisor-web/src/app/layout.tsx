'use client';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import Head from 'next/head';
import Script from 'next/script';

import AuthenticationProvider from '@/hooks/use-authentication/authentication-context';
import ToastContextProvider from '@/hooks/use-toast/toast-context';
import theme from '@/styles/theme';
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

const queryClient = new QueryClient();

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
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="uk">
            <QueryClientProvider client={queryClient}>
              <AuthenticationProvider>
                <ToastContextProvider>{children}</ToastContextProvider>
              </AuthenticationProvider>
            </QueryClientProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
