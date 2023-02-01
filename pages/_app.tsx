import "../styles/v2/global.scss";

import { QueryClient, QueryClientProvider } from "react-query";
import { AuthenticationProvider } from "../lib/v1/context/AuthenticationContext";

const queryClient = new QueryClient();

export default function Application({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider>
        <Component {...pageProps} />
      </AuthenticationProvider>
    </QueryClientProvider>
  );
}
