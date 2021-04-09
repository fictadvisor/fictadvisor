import Head from 'next/head';
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
  const metaTitle = meta?.title ? `${meta.title} - FICTAdvisor` : 'FICTAdvisor';

  return (
    <div className="page">
        <Head>
          <title>{metaTitle}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
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
