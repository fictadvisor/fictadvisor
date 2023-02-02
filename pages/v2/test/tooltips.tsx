import {Tooltip, TooltipDirection} from "../../../components/v2/ui/Tooltip";
import styles from "styles/v2/local/pages/test.module.scss";

function Tooltips(){
    return(
        <div className = {styles["test-page-wrap"]}>
            <div className = {styles["test-page-content"]}>
            <Tooltip text="Tooltip Example"/>
            <Tooltip direction={TooltipDirection.TOP} text="Tooltip Example"/>
            <Tooltip direction={TooltipDirection.BOTTOM} text="Tooltip Example"/>
            <Tooltip direction={TooltipDirection.LEFT} text="Tooltip Example"/>
            <Tooltip direction={TooltipDirection.RIGHT} text="Tooltip Example"/>
            </div>
        </div>
    );
}

export default Tooltips;
