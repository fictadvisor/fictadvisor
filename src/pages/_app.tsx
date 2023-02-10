import "@/styles/reset.scss";
import "@/styles/typography.scss";
import "@/styles/global-styles.scss";

import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

const Application = ({Component, pageProps}) => (
    <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
    </QueryClientProvider>
);

export default Application;