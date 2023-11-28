import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

const Document = () => (
  <Html lang="uk-UA">
    <Head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-GXYG7SJKYT"
      />
      <script async src="https://telegram.org/js/telegram-widget.js" />
      <link rel="icon" href="/favicon.ico" />
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
