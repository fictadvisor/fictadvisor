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
  text?: string;
  textPosition?: string;
  size?: SwitchSize;
}

const Switch: FC<SwitchProps> = ({
  text,
  textPosition = SwitchTextPosition.RIGHT,
  size = SwitchSize.MEDIUM,
  ...rest
}) => {
  const gap = text ? '8px' : '';
  const [field] = useField(rest.name);

  return (
    <div>
      <div className={styles[size + '-container']} style={{ gap: `${gap}` }}>
        {textPosition === 'left' && (
          <span className={styles[size + '-switch-text']}>{text}</span>
        )}
        <label className={styles[`${size}-switch`]}>
          <input
            type="checkbox"
            className={styles[size + '-switch-input']}
            {...rest}
            {...field}
            checked={field.value}
          />
          <span className={styles[size + '-switch-slider']}></span>
        </label>
        {textPosition === 'right' && (
          <span className={styles[size + '-switch-text']}>{text}</span>
        )}
      </div>
    </div>
  );
};

export default Switch;
