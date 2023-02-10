import breadcrumbStyles from "styles/v2/local/elements/Breadcrumb.module.scss";
import pageStyles from "../test-pages.module.scss";

const BreadcrumbsPage = () => (
    <div className={pageStyles["test-page-wrap"]}>
        <div className={breadcrumbStyles["breadcrumb-wrap"]}>
            <div className={breadcrumbStyles["icon-home-breadcrumb"]}>
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M2 16l3.112-3.112M5.112 12.888l10.888-10.888 10.888 10.888M5.112 12.888v15.557c0 0.859 0.696 1.555 1.555 1.555v0h4.667M26.888 12.888l3.112 3.112M26.888 12.888v15.557c0 0.859-0.696 1.555-1.555 1.555v0h-4.667M11.333 30c0.859 0 1.555-0.696 1.555-1.555v-6.224c0 0 0 0 0 0 0-0.859 0.696-1.555 1.555-1.555 0.001 0 0.002 0 0.003 0h3.109c0.001 0 0.002 0 0.003 0 0.859 0 1.555 0.696 1.555 1.555 0 0 0 0 0 0v0 6.224c0 0.859 0.696 1.555 1.555 1.555v0M11.333 30h9.333"
                        stroke="#d4d4d4" strokeWidth="3.1111" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>

            <div className={breadcrumbStyles["home-breadcrumb"]}>
                <a href="v2/test">Home</a>
            </div>

            <div className={breadcrumbStyles["chevron-right-breadcrumb"]}>
                <svg viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.672 3.203l10.656 12.797-10.656 12.797" stroke="#d4d4d4" strokeWidth="3.112"
                          strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>

            <div className={breadcrumbStyles["h-breadcrumb"]}>
                <a href="v2/test">h</a>
            </div>

            <div className={breadcrumbStyles["chevron-right-breadcrumb"]}>
                <svg viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.672 3.203l10.656 12.797-10.656 12.797" stroke="#d4d4d4" strokeWidth="2.4"
                          strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>

            <div className="breadcrumb">
                <a href="v2/test">Breadcrumb</a>
            </div>
        </div>
    </div>
);

export default BreadcrumbsPage;
