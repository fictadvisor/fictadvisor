import React, { FunctionComponent, useRef } from 'react';

import styles from './Slider.module.scss';

export enum SliderType {
  MOBILE = 'mobile',
  DESKTOP = 'desktop',
}

interface SliderProps {
  type: SliderType;
  defaultValue: number;
}

const Slider: FunctionComponent<SliderProps> = props => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const sliderRef = useRef(null);
  function setBackgroundSize() {
    sliderRef.current.style.setProperty(
      '--background-size',
      `${getBackgroundSize()}%`,
    );
  }

  function getBackgroundSize() {
    const min = sliderRef.current.min || 0;
    const max = sliderRef.current.max || 100;
    const value = sliderRef.current.value;
    return ((value - min) / (max - min)) * 100;
  }

  return (
    <div className={styles['slider-container']}>
      <input
        ref={sliderRef}
        type="range"
        name="range"
        min="1"
        max="10"
        step="1"
        defaultValue={props.defaultValue.toString()}
        className={styles['slider'] + ' ' + styles[`slider-${props.type}`]}
        onInput={setBackgroundSize}
      />
      <div className={styles['target']}>
        {numbers.map((number, index) => (
          <div className={styles['component-target']} key={index}>
            <div className={styles['white']}></div>
            <p className={styles[`${props.type}-font`]}>{number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
