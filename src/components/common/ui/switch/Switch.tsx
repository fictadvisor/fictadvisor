import { FC } from 'react';

import styles from './Switch.module.scss';
export enum SwitchTextPosition {
  RIGHT = 'right',
  LEFT = 'left',
}

export enum SwitchType {
  WEB = 'web',
  MOBILE = 'mobile',
}

interface SwitchProps {
  text?: string;
  textPosition?: string;
  type: SwitchType;
}

const Switch: FC<SwitchProps> = props => {
  return (
    <div>
      <div className={styles[props.type + '-container']}>
        {props.textPosition === 'left' && (
          <span className={styles[props.type + '-switch-text']}>
            {props.text}
          </span>
        )}
        <label className={styles[`${props.type}-switch`]}>
          <input
            type="checkbox"
            className={styles[props.type + '-switch-input']}
          />
          <span className={styles[props.type + '-switch-slider']}></span>
        </label>
        {props.textPosition === 'right' && (
          <span className={styles[props.type + '-switch-text']}>
            {props.text}
          </span>
        )}
      </div>
    </div>
  );
};

export default Switch;
