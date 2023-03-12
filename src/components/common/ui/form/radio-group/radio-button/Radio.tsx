import React, { FC } from 'react';

import { FieldState } from '@/components/common/ui/form/common/types';

import styles from './Radio.module.scss';

interface RadioProps {
  label: string;
  value: string;
  selectedValue: string;
  isDisabled?: boolean;
  onChange: (value) => void;
  state?: FieldState;
  helpers;
}

const Radio: FC<RadioProps> = ({
  label,
  selectedValue,
  isDisabled = false,
  state = FieldState.DEFAULT,
  helpers,
  ...rest
}) => {
  const handleClick = () => {
    helpers.setValue(rest.value);
    helpers.setTouched(true);
  };

  return (
    <div className={styles['radio-container']} onClick={handleClick}>
      <label>
        <input
          className={
            styles[state + '-radio-input' + `${isDisabled ? '-disabled' : ''}`]
          }
          type="radio"
          checked={rest.value === selectedValue}
          disabled={isDisabled}
          {...rest}
        />
        <span
          className={
            styles[state + '-radio-box' + `${isDisabled ? '-disabled' : ''}`]
          }
        ></span>
      </label>
      <span
        className={
          styles[state + '-radio-text' + `${isDisabled ? '-disabled' : ''}`]
        }
      >
        {label}
      </span>
    </div>
  );
};

export default Radio;
