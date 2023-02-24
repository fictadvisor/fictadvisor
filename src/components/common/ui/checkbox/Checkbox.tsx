import React from 'react';
import { useField } from 'formik';

import styles from './Checkbox.module.scss';

enum CheckboxState {
  DEFAULT = 'default',
  ERROR = 'error',
}

interface CheckboxProps extends React.ComponentPropsWithoutRef<'input'> {
  text?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ text, ...rest }) => {
  const additional = rest.disabled ? '-disabled' : '';
  const gap = text ? '8px' : '';

  const [field, meta, helpers] = useField(rest.name);

  const state =
    meta.touched && meta.error ? CheckboxState.ERROR : CheckboxState.DEFAULT;

  return (
    <div>
      <div className={styles['check-container']} style={{ gap: `${gap}` }}>
        <label className="check-button">
          <input
            type="checkbox"
            className={styles[state + '-check-input' + `${additional}`]}
            {...rest}
            {...field}
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
