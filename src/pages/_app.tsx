import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';

import Toast from '@/components/common/ui/toast';
import AuthenticationProvider from '@/hooks/use-authentication/authentication-context';
import { store } from '@/redux';

import '@/styles/reset.scss';
import '@/styles/typography.scss';
import '@/styles/global-styles.scss';

const queryClient = new QueryClient();

if (!process.browser) React.useLayoutEffect = React.useEffect;

const Application = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthenticationProvider>
          <Toast />
          <Component {...pageProps} />
        </AuthenticationProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default Application;
