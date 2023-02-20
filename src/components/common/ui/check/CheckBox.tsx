import React from 'react';

import styles from './CheckBox.module.scss';

export enum CheckBoxState {
  DEFAULT = 'default',
  ERROR = 'error',
}

interface CheckBoxProps extends React.ComponentPropsWithoutRef<'input'> {
  text?: string;
  state?: CheckBoxState | string;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  text,
  state = CheckBoxState.DEFAULT,
  ...rest
}) => {
  const additional = rest.disabled === true ? '-disabled' : '';

  return (
    <div>
      <div className={styles['check-container']}>
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

export default CheckBox;
