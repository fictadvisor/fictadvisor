import React, {FunctionComponent, useRef, useState} from 'react';
import styles from "styles/v2/local/elements/Slider.module.scss";

export enum SliderType {
    MOBILE = "mobile", DESKTOP = "desktop"
}

interface SliderProps {
    type: SliderType
    defaultValue: number
}


const Slider: FunctionComponent<SliderProps> = (props) => {

    const sliderRef = useRef(null);
    function setBackgroundSize() {
        sliderRef.current.style.setProperty('--background-size', `${getBackgroundSize()}%`);
    }

    function getBackgroundSize(){
        const min = sliderRef.current.min || 0;
        const max = sliderRef.current.max || 100;
        const value = sliderRef.current.value;
        return (value - min) / (max - min) * 100;
    }

    return (
        <div className={styles["slider-container"]}>
            <input ref={sliderRef} type="range" name="range" min="1" max="10" step="1" defaultValue={props.defaultValue.toString()}
                   className={styles["slider"] + " " + styles[`slider-${props.type}`]} onInput={setBackgroundSize}></input>
            <div className={styles[`number-range-${props.type}`]}></div>
        </div>
    );
};

export default Slider;
