import Slider, {SliderType} from "../../../components/v2/Slider";

function sliders() {
    return (
        <div className="test-page-wrap">
            <Slider type={SliderType.DESKTOP} defaultValue={1}/>
            <Slider type={SliderType.MOBILE} defaultValue={1}/>
        </div>
    );
}

export default sliders;