import "@/styles/reset.scss";
import "@/styles/typography.scss";
import "@/styles/global-styles.scss";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function Application({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
    </QueryClientProvider>
  );
}
