import "normalize.css/normalize.css";
import "../styles/v1/globals.css";
import "../styles/v1/input.css";
import "../styles/v1/layout/header.css";
import "../styles/v1/components/teacher.css";
import "../styles/v1/components/course.css";
import "../styles/v1/components/review.css";
import "../styles/v1/components/loader.css";
import "../styles/v1/components/statistics.css";
import "../styles/v1/components/contact.css";
import "../styles/v1/components/navigation.css";
import "../styles/v1/components/studentResource.css";
import "../styles/v1/components/article.css";
import "../styles/v1/sass/index.sass";
import "../styles/v2/sass/index.scss";

import { QueryClient, QueryClientProvider } from "react-query";
import { AuthenticationProvider } from "../lib/context/AuthenticationContext";

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
