import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AppProps } from 'next/app';

import AuthenticationProvider from '@/hooks/use-authentication/authentication-context';
import ToastContextProvider from '@/hooks/use-toast/toast-context';
import theme from '@/styles/theme';

import 'dayjs/locale/uk';

import '@/styles/reset.scss';
import '@/styles/typography.scss';
import '@/styles/global-styles.scss';

const queryClient = new QueryClient();

if (!process.browser) React.useLayoutEffect = React.useEffect;

const Application = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'uk'}>
        <QueryClientProvider client={queryClient}>
          <AuthenticationProvider>
            <ToastContextProvider>
              <Component {...pageProps} />
            </ToastContextProvider>
          </AuthenticationProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default Application;
