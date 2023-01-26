
function tabs() {
    return (
        <div className="test-page-wrap">

            <div className="tab normal centre" tabIndex={1}>
                <p className="tab-text normal-text">Tab</p>
            </div>
            <div className="tab-disabled normal centre" tabIndex={1}>
                <p className="tab-text normal-text disabled-text">disabled tab</p>
            </div>

            <hr className="test-hr"/>

            <div className="tab normal left" tabIndex={2}>
                <p className="tab-text normal-text">Tab</p>
            </div>
            <div className="tab-disabled normal left" tabIndex={2}>
                <p className="tab-text normal-text disabled-text">disabled tab</p>
            </div>

            <hr className="test-hr"/>

            <div className="tab small centre" tabIndex={3}>
                <p className="tab-text small-text">Tab</p>
            </div>
            <div className="tab-disabled small centre" tabIndex={3}>
                <p className="tab-text small-text disabled-text">disabled tab</p>
            </div>

            <hr className="test-hr"/>

            <div className="tab small left" tabIndex={4}>
                <p className="tab-text small-text">Tab</p>
            </div>
            <div className="tab-disabled small left" tabIndex={4}>
                <p className="tab-text small-text disabled-text">disabled tab</p>
            </div>

            <hr className="test-hr"/>

            <div className="tab normal centre" tabIndex={5}>
                <img className="icon" src="/assets/icons/academic-cap.svg"></img>
                <p className="tab-text normal-text">Tab</p>
            </div>
            <div className="tab-disabled normal centre" tabIndex={5}>
                <img className="disabled-icon" src="/assets/icons/academic-cap.svg"></img>
                <p className="tab-text normal-text disabled-text">Tab</p>
            </div>

            <hr className="test-hr"/>

            <div className="tab normal left" tabIndex={6}>
                <img className="icon" src="/assets/icons/academic-cap.svg"></img>
                <p className="tab-text normal-text">Tab</p>
            </div>
            <div className="tab-disabled normal left" tabIndex={6}>
                <img className="disabled-icon" src="/assets/icons/academic-cap.svg"></img>
                <p className="tab-text normal-text disabled-text">Tab</p>
            </div>

            <hr className="test-hr"/>

            <div className="tab normal centre" tabIndex={7}>
                <p className="tab-text normal-text">icon Tab</p>
                <div className="count">
                    <p className="count-text">1</p>
                </div>
            </div>
            <div className="tab-disabled normal centre" tabIndex={7}>
                <p className="tab-text normal-text disabled-text">disabled icon tab</p>
                <div className="disabled-count">
                    <p className="count-text">1</p>
                </div>
            </div>

            <hr className="test-hr"/>

            <div className="tab normal left" tabIndex={8}>
                <p className="tab-text normal-text">icon Tab</p>
                <div className="count">
                    <p className="count-text">1</p>
                </div>
            </div>
            <div className="tab-disabled normal left" tabIndex={8}>
                <p className="tab-text normal-text disabled-text">disabled icon tab</p>
                <div className="disabled-count">
                    <p className="count-text">1</p>
                </div>
            </div>

            <hr className="test-hr"/>

        </div>
    );
}

export default tabs;
