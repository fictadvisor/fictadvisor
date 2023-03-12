import React from 'react';
import { useField } from 'formik';
import mergeClassNames from 'merge-class-names';

import { FieldState } from '@/components/common/ui/form/common/types';

import styles from './Checkbox.module.scss';

interface CheckboxProps extends React.ComponentPropsWithoutRef<'input'> {
  name: string;
  label?: string;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, className, ...rest }) => {
  const additional = rest.disabled ? '-disabled' : '';
  const gap = label ? '8px' : '';

  const [field, { touched, error }] = useField(rest.name);

  const state = touched && error ? FieldState.ERROR : FieldState.DEFAULT;

  return (
    <div>
      <div
        className={mergeClassNames(styles['check-container'], className)}
        style={{ gap: `${gap}` }}
      >
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
          {label}
        </span>
      </div>
    </div>
  );
};

export default Checkbox;
