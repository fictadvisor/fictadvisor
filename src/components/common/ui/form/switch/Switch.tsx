import React, { FC } from 'react';
import { useField } from 'formik';

import styles from './Switch.module.scss';
export enum SwitchTextPosition {
  RIGHT = 'right',
  LEFT = 'left',
}

export enum SwitchSize {
  MEDIUM = 'medium',
  SMALL = 'small',
}

interface SwitchProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'size'> {
  name: string;
  label?: string;
  textPosition?: string;
  size?: SwitchSize;
}

const Switch: FC<SwitchProps> = ({
  label,
  textPosition = SwitchTextPosition.RIGHT,
  size = SwitchSize.MEDIUM,
  ...rest
}) => {
  const gap = label ? '8px' : '';
  const [{ onChange, value }] = useField(rest.name);

  return (
    <div>
      <div className={styles[size + '-container']} style={{ gap: `${gap}` }}>
        {textPosition === 'left' && (
          <span className={styles[size + '-switch-text']}>{label}</span>
        )}
        <label className={styles[`${size}-switch`]}>
          <input
            type="checkbox"
            className={styles[size + '-switch-input']}
            {...rest}
            onChange={onChange}
            checked={value}
          />
          <span className={styles[size + '-switch-slider']}></span>
        </label>
        {textPosition === 'right' && (
          <span className={styles[size + '-switch-text']}>{label}</span>
        )}
      </div>
    </div>
  );
};

export default Switch;
