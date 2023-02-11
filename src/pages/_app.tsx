import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProps } from 'next/app';

import '@/styles/reset.scss';
import '@/styles/typography.scss';
import '@/styles/global-styles.scss';

const queryClient = new QueryClient();

const Application = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
  </QueryClientProvider>
);

export default Application;
