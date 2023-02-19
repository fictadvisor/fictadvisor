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
  type: SwitchSize;
}

const Switch: FC<SwitchProps> = ({
  text,
  textPosition = SwitchTextPosition.RIGHT,
  type = SwitchSize.MEDIUM,
}) => {
  return (
    <div>
      <div className={styles[type + '-container']}>
        {textPosition === 'left' && (
          <span className={styles[type + '-switch-text']}>{text}</span>
        )}
        <label className={styles[`${type}-switch`]}>
          <input type="checkbox" className={styles[type + '-switch-input']} />
          <span className={styles[type + '-switch-slider']}></span>
        </label>
        {textPosition === 'right' && (
          <span className={styles[type + '-switch-text']}>{text}</span>
        )}
      </div>
    </div>
  );
};

export default Switch;
