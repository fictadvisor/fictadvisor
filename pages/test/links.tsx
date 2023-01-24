interface OwnProps {
}

type Props = OwnProps;

function links() {

    return (
        <div className="test-page-wrap">
            <div className="white-link">
                <a href="pages">Click here to open documentation</a>
            </div>
            <div className="blue-link">
                <a href="pages">Click here to open documentation</a>
            </div>
            <div className="white-link-underlined">
                <a href="pages">Click here to open documentation</a>
            </div>
            <div className="blue-link-underlined">
                <a href="pages">Click here to open documentation</a>
            </div>
            <div className="arrow-white-link">
                <a href="pages">
                    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5H19M5 9L1 5L5 9ZM1 5L5 1L1 5Z" stroke="white" stroke-width="1.2"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Click here to open documentation</a>
            </div>
            <div className="arrow-blue-link">
                <a href="pages">
                    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5H19M5 9L1 5L5 9ZM1 5L5 1L1 5Z" stroke="#0EA5E9" stroke-width="1.2"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span className="link-text">Click here to open documentation</span></a>
            </div>
            <div className="arrow-white-link-underlined">
                <a href="pages">
                    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5H19M5 9L1 5L5 9ZM1 5L5 1L1 5Z" stroke="white" stroke-width="1.2"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Click here to open documentation</a>
            </div>
            <div className="arrow-blue-link-underlined">
                <a href="pages">
                    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5H19M5 9L1 5L5 9ZM1 5L5 1L1 5Z" stroke="#0EA5E9" stroke-width="1.2"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Click here to open documentation</a>
            </div>
        </div>);
}

export default links;
