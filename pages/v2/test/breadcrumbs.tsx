
function breadcrumbs(){
    return(
        <div className="test-page-wrap">
            <div id="breadcrumb">

                <div className="icon-home-breadcrumb">
                    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 16l3.112-3.112M5.112 12.888l10.888-10.888 10.888 10.888M5.112 12.888v15.557c0 0.859 0.696 1.555 1.555 1.555v0h4.667M26.888 12.888l3.112 3.112M26.888 12.888v15.557c0 0.859-0.696 1.555-1.555 1.555v0h-4.667M11.333 30c0.859 0 1.555-0.696 1.555-1.555v-6.224c0 0 0 0 0 0 0-0.859 0.696-1.555 1.555-1.555 0.001 0 0.002 0 0.003 0h3.109c0.001 0 0.002 0 0.003 0 0.859 0 1.555 0.696 1.555 1.555 0 0 0 0 0 0v0 6.224c0 0.859 0.696 1.555 1.555 1.555v0M11.333 30h9.333" stroke="#d4d4d4" stroke-width="3.1111" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>

                <div className="home-breadcrumb">
                    <a href="">Home</a>
                </div>

                <div className="chevron-right-breadcrumb">
                    <svg viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.672 3.203l10.656 12.797-10.656 12.797" stroke="#d4d4d4" stroke-width="3.112" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>

                <div className="h-breadcrumb">
                    <a href="">h</a>
                </div>

                <div className="chevron-right-breadcrumb">
                    <svg viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.672 3.203l10.656 12.797-10.656 12.797" stroke="#d4d4d4" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>

                <div className="breadcrumb">
                    <a href="">Breadcrumb</a>
                </div>
            </div>
        </div>
    );
}

export default breadcrumbs;
