import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';

import { store } from '@/redux';

import '@/styles/reset.css';
import '@/styles/typography.css';
import '@/styles/global-styles.css';

const queryClient = new QueryClient();

const Application = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  </Provider>
);

export default Application;
