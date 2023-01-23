
interface OwnProps {}

type Props = OwnProps;

function test(){

  return(
    <div id="tooltip">
        
        <div className="tooltip-body" id="tooltip-default">
            <span>Tooltip Example</span>
        </div>

        <div className="tooltip-body" id="tooltip-default">
            <span className="tooltip-text" id="tooltip-text-top">Tooltip Example</span>
        </div>

        <div className="tooltip-body" id="tooltip-default">
            <span className="tooltip-text" id="tooltip-text-bottom">Tooltip Example</span>
        </div>

        <div className="tooltip-body" id="tooltip-default">
            <span className="tooltip-text" id="tooltip-text-left">Tooltip Example</span>
        </div>

        <div className="tooltip-body" id="tooltip-default">
            <span className="tooltip-text" id="tooltip-text-right">Tooltip Example</span>
        </div>

        <div className="tooltip-body" id="tooltip-info">
            <span>Tooltip Example</span>
        </div>

        <div className="tooltip-body" id="tooltip-info">
            <span className="tooltip-text" id="tooltip-text-top">Tooltip Example</span>
        </div>

        <div className="tooltip-body" id="tooltip-info">
            <span className="tooltip-text" id="tooltip-text-bottom">Tooltip Example</span>
        </div>

        <div className="tooltip-body" id="tooltip-info">
            <span className="tooltip-text" id="tooltip-text-left">Tooltip Example</span>
        </div>

        <div className="tooltip-body" id="tooltip-info">
            <span className="tooltip-text" id="tooltip-text-right">Tooltip Example</span>
        </div>

    </div>
  );
}

export default test;
