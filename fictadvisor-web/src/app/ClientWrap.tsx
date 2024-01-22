'use client';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import AuthenticationProvider from '@/hooks/use-authentication/authentication-context';
import ToastContextProvider from '@/hooks/use-toast/toast-context';
import theme from '@/styles/theme';

const queryClient = new QueryClient();

export const ClientWrap = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'uk'}>
        <QueryClientProvider client={queryClient}>
          <AuthenticationProvider>
            <ToastContextProvider>{children}</ToastContextProvider>
          </AuthenticationProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};
