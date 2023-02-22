import React from 'react';

import styles from './Checkbox.module.scss';

export enum CheckboxState {
  DEFAULT = 'default',
  ERROR = 'error',
}

interface CheckboxProps extends React.ComponentPropsWithoutRef<'input'> {
  text?: string;
  state?: CheckboxState | string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  text,
  state = CheckboxState.DEFAULT,
  ...rest
}) => {
  const additional = rest.disabled ? '-disabled' : '';
  const gap = text ? '8px' : '';
  return (
    <div>
      <div className={styles['check-container']} style={{ gap: `${gap}` }}>
        <label className="check-button">
          <input
            type="checkbox"
            className={styles[state + '-check-input' + `${additional}`]}
            {...rest}
          />
          <span
            className={styles[state + '-check-box' + `${additional}`]}
            {...rest}
          ></span>
        </label>
        <span
          className={styles[state + '-check-text' + `${additional}`]}
          {...rest}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export default Checkbox;
