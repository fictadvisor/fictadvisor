import Slider, {SliderType} from "@/components/common/ui/slider/Slider";
import styles from "../test-pages.module.scss";

const SlidersPage = () => (
    <div className={styles["test-page-wrap"]}>
        <div className={styles["test-page-content"]}>
            <Slider type={SliderType.DESKTOP} defaultValue={1}/>
            <Slider type={SliderType.MOBILE} defaultValue={1}/>
        </div>
    </div>
);

export default SlidersPage;