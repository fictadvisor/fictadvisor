
interface OwnProps {}

type Props = OwnProps;

function links(){

    return(
        <div className="test-page-wrap">

            <div className="tooltip-body">
                <span>Tooltip Example</span>
            </div>

            <div className="tooltip-body">
                <span className="tooltip-text" id="tooltip-text-top">Tooltip Example</span>
            </div>

            <div className="tooltip-body">
                <span className="tooltip-text" id="tooltip-text-bottom">Tooltip Example</span>
            </div>

            <div className="tooltip-body">
                <span className="tooltip-text" id="tooltip-text-left">Tooltip Example</span>
            </div>

            <div className="tooltip-body">
                <span className="tooltip-text" id="tooltip-text-right">Tooltip Example</span>
            </div>
        </div>
    );
}

export default links;
