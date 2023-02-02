import Slider, {SliderType} from "../../../components/v2/ui/Slider";
import styles from "styles/v2/local/pages/test.module.scss";

function sliders() {
    return (
        <div className = {styles["test-page-wrap"]}>
            <div className = {styles["test-page-content"]}>
                <Slider type={SliderType.DESKTOP} defaultValue={1}/>
                <Slider type={SliderType.MOBILE} defaultValue={1}/>
            </div>
        </div>
    );
}

export default sliders;