import { ReactNode } from 'react';
import Head from 'next/head';
import Script from 'next/script';

import config from '@/config';

import Footer from '../footer/Footer';

import styles from './PageLayout.module.scss';

interface PageLayoutProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  hasHeader?: boolean;
  hasFooter?: boolean;
  className?: string;
}

function PageLayout(props: PageLayoutProps) {
  const metaTitle = props?.title ? props.title : config.service;
  return (
    <div>
      <Head>
        <title>{metaTitle}</title>
        <meta property="og:title" content={metaTitle} />
        <meta property="og:site_name" content={config.service} />
        <meta property="og:image" content="/assets/preview.jpg" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="google-site-verification"
          content="M93dY9EuPcQ5AzSYwxc6_el0GwZp_XlDHBhphP6z-7g"
        />
        <Script
          dangerouslySetInnerHTML={{
            __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-GXYG7SJKYT');
                `,
          }}
        />

        {props?.description && (
          <meta property="og:description" content={props.description} />
        )}
      </Head>

      <div className={styles['page'] + ' ' + props.className}>
        {props.children}
        <div className={styles['footer']}>{props.hasFooter && <Footer />}</div>
      </div>
    </div>
  );
}

export default PageLayout;
