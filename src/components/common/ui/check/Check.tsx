import React from 'react';

import styles from './Check.module.scss';

export enum CheckState {
  DEFAULT = 'default',
  DISABLED = 'disabled',
  ERROR = 'error',
}

interface CheckProps {
  text?: string;
  state: CheckState;
  checked?: boolean;
  disabled?: boolean;
}

const Check: React.FC<CheckProps> = props => {
  return (
    <div>
      <div className={styles['check-container']}>
        <label className="check-button">
          <input
            type="checkbox"
            className={styles[props.state + '-check-input']}
            disabled={props.disabled}
            checked={props.checked}
          />
          <span className={styles[props.state + '-check-box']}></span>
        </label>
        <span className={styles[props.state + '-check-text']}>
          {props.text}
        </span>
      </div>
    </div>
  );
};

export default Check;
