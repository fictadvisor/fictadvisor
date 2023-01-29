import { Tooltip,TooltipDirection } from "../../../components/v2/Tooltip";

function Tooltips(){
    return(
        <div className="test-page-wrap">
            <Tooltip text="Tooltip Example"/>
            <Tooltip direction={TooltipDirection.TOP} text="Tooltip Example"/>
            <Tooltip direction={TooltipDirection.BOTTOM} text="Tooltip Example"/>
            <Tooltip direction={TooltipDirection.LEFT} text="Tooltip Example"/>
            <Tooltip direction={TooltipDirection.RIGHT} text="Tooltip Example"/>
        </div>
    );
}

export default Tooltips;
