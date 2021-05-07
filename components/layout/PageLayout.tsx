import Head from 'next/head';
import config from '../../config';
import PageHeader from './PageHeader';

type PageLayoutProperties = {
  meta?: {
    title?: string;
    description?: string;
  };
  title?: string;
  children?: any;
};

const PageLayout = ({ meta, title, children }: PageLayoutProperties) => {
  const metaTitle = meta?.title ? meta.title : config.service;

  return (
    <div className="page">
        <Head>
          <title>{metaTitle}</title>
          <meta name="viewport" content="width=device-width, target-densityDpi=device-dpi" />

          <meta property="og:title" content={metaTitle} />
          <meta property="og:site_name" content={config.service} />
          <meta property="og:image" content="/assets/preview.jpg" />
          <meta property="og:type" content="website" />

          <meta name="google-site-verification" content="M93dY9EuPcQ5AzSYwxc6_el0GwZp_XlDHBhphP6z-7g" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-GXYG7SJKYT" />
          <script
            dangerouslySetInnerHTML={{
              __html: 
                `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', 'G-GXYG7SJKYT');
                `
            }}
          />

          {
            meta?.description &&
            <meta property="og:description" content={meta.description} />
          }

          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
        </Head>
        
        <PageHeader />

        <div className="main">
          <div className="content">
            <p className="title">{title}</p>
            {children}
          </div>
        </div>
    </div>
  );
};

export default PageLayout;
