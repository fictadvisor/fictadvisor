import React, { FC } from 'react';
import { useField } from 'formik';
import mergeClassNames from 'merge-class-names';

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
  className?: string;
}

const Switch: FC<SwitchProps> = ({
  label,
  textPosition = SwitchTextPosition.RIGHT,
  size = SwitchSize.MEDIUM,
  className,
  ...rest
}) => {
  const gap = label ? '8px' : '';
  const [{ onChange, value }] = useField(rest.name);

  return (
    <div>
      <div
        className={mergeClassNames(styles[size + '-container'], className)}
        style={{ gap: `${gap}` }}
      >
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
