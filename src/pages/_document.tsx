import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

const Document = () => (
  <Html>
    <Head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-GXYG7SJKYT"
      />
      <link
        rel="preload"
        as="image"
        href="/assets/login-page/login-background.png"
      />
      <link
        rel="preload"
        as="image"
        href="/assets/register-page/background.png"
      />
      <script async src="https://telegram.org/js/telegram-widget.js" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Manrope"
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
