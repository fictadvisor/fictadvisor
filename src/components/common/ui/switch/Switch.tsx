import { FC } from 'react';

import styles from './Switch.module.scss';
export enum SwitchTextPosition {
  RIGHT = 'right',
  LEFT = 'left',
}

export enum SwitchSize {
  MEDIUM = 'medium',
  SMALL = 'small',
}

interface SwitchProps {
  text?: string;
  textPosition?: string;
  size?: SwitchSize;
}

const Switch: FC<SwitchProps> = ({
  text,
  textPosition = SwitchTextPosition.RIGHT,
  size = SwitchSize.MEDIUM,
}) => {
  return (
    <div>
      <div className={styles[size + '-container']}>
        {textPosition === 'left' && (
          <span className={styles[size + '-switch-text']}>{text}</span>
        )}
        <label className={styles[`${size}-switch`]}>
          <input type="checkbox" className={styles[size + '-switch-input']} />
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
