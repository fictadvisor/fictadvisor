import React, { FunctionComponent, useEffect, useRef } from 'react';
import cn from 'classnames';
import { useField } from 'formik';

import styles from './Slider.module.scss';

export enum SliderType {
  MOBILE = 'mobile',
  DESKTOP = 'desktop',
}

interface SliderProps extends React.ComponentPropsWithoutRef<'input'> {
  name: string;
  type?: SliderType;
  className?: string;
}

const Slider: FunctionComponent<SliderProps> = ({
  type = SliderType.DESKTOP,
  className,
  ...rest
}) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const sliderRef = useRef<HTMLInputElement>(null);
  const [{ value }, {}, { setTouched, setValue }] = useField(rest.name);

  const handleInput = () => {
    sliderRef.current?.style.setProperty(
      '--background-size',
      `${calculateBackgroundSize()}%`,
    );
    setValue(sliderRef.current?.value);
    setTouched(true);
  };

  const calculateBackgroundSize = () => {
    const min = Number(sliderRef.current?.min) || 0;
    const max = Number(sliderRef.current?.max) || 100;
    const value = Number(sliderRef.current?.value);
    const addedValue = value === 2 ? 2 : value === 9 ? -1 : 0;
    return ((value - min) / (max - min)) * 100 + addedValue;
  };

  useEffect(() => {
    handleInput();
  }, []);

  return (
    <div className={cn(styles['slider-container'], className)}>
      <input
        ref={sliderRef}
        type="range"
        min="1"
        max="10"
        step="1"
        className={styles['slider'] + ' ' + styles[`slider-${type}`]}
        onInput={handleInput}
        onClick={handleInput}
        {...rest}
        value={(value || '1').toString()}
      />
      <div className={styles[`${type}-target`]}>
        {numbers.map((number, index) => (
          <div className={styles['component-target']} key={index}>
            <div className={styles['white']}></div>
            <p className={styles[`${type}-font`]}>{number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
