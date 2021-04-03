import 'normalize.css/normalize.css';
import '../styles/globals.css';
import '../styles/util.css';
import '../styles/input.css';
import '../styles/layout/header.css';
import '../styles/components/teacher.css';
import '../styles/components/course.css';
import '../styles/components/review.css';
import '../styles/components/loader.css';
import '../styles/components/statistics.css';
import '../styles/components/contact.css';
import '../styles/components/navigation.css';
import '../styles/components/studentResource.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthenticationProvider } from '../lib/context/AuthenticationContext';

const queryClient = new QueryClient();

export default function Application({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider>
        <Component {...pageProps} />
      </AuthenticationProvider>
    </QueryClientProvider>
  );
};
