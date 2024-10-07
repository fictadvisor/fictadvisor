'use client';

import { FC, useEffect } from 'react';
import { ThemeProvider } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import ToastContextProvider from '@/hooks/use-toast/toast-context';
import AuthenticationProvider from '@/lib/providers/authentication/AuthenticationProvider';
import theme from '@/styles/theme';

interface ProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const Providers: FC<ProvidersProps> = ({ children }) => {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => console.log('scope is: ', registration.scope));
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="uk">
        <QueryClientProvider client={queryClient}>
          <AuthenticationProvider>
            <ToastContextProvider>{children}</ToastContextProvider>
            <ReactQueryDevtools />
          </AuthenticationProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default Providers;
