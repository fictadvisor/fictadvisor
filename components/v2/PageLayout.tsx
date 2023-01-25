import Head from 'next/head';
import config from "../../config";

interface PageLayoutProps {
    title?: string;
    description?: string;
    children?: any;
}

function PageLayout(props: PageLayoutProps) {
    const metaTitle = props?.title ? props.title : config.service;

    return (
        <div>
            <Head>
                <title>{metaTitle}</title>
                <meta name="viewport" content="width=device-width, target-densityDpi=device-dpi"/>
                <meta property="og:title" content={metaTitle}/>
                <meta property="og:site_name" content={config.service}/>
                <meta property="og:image" content="/assets/preview.jpg"/>
                <meta property="og:type" content="website"/>

                <meta name="google-site-verification" content="M93dY9EuPcQ5AzSYwxc6_el0GwZp_XlDHBhphP6z-7g"/>
                <script async src="https://telegram.org/js/telegram-widget.js"/>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-GXYG7SJKYT"/>
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
                    props?.description &&
                    <meta property="og:description" content={props.description}/>
                }

                <link rel="icon" href="/favicon.ico"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Manrope"/>
            </Head>

            <div className="page">
                {props.children}
            </div>
        </div>
    );
}

export default PageLayout;
