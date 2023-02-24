import React from 'react';
import { useField } from 'formik';

import styles from './TextArea.module.scss';

export enum TextAreaSize {
  LARGE = 'large',
  SMALL = 'small',
}
export enum TextAreaState {
  SUCCESS = 'success-area',
  ERROR = 'error-area',
}

interface TextAreaProps {
  name: string;
  placeholder?: string;
  label?: string;
  size?: TextAreaSize;
  isDisabled?: boolean;
  isSuccessOnDefault?: boolean;
  showRemarkOnDefault?: boolean;
  hasRemark?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  name,
  placeholder,
  label,
  size = TextAreaSize.LARGE,
  isSuccessOnDefault = false,
  isDisabled = false,
  showRemarkOnDefault,
  hasRemark = true,
}) => {
  const [field, meta, helpers] = useField(name);

  let state;
  if (meta.touched && meta.error) state = TextAreaState.ERROR;
  else if (meta.touched && isSuccessOnDefault) state = TextAreaState.SUCCESS;

  const divClasses = [
    styles['textarea'],
    styles[size ? `${size}-area` : ''],
    styles[state ? state : ''],
  ];

  return (
    <div className={divClasses.join(' ')}>
      {label && <label>{label}</label>}
      <textarea
        {...field}
        className={styles['textarea_input']}
        disabled={isDisabled}
        placeholder={placeholder}
        value={field.value}
      />
      {hasRemark && (
        <p>
          {(meta.touched && meta.error) || showRemarkOnDefault
            ? meta.error
            : ''}
        </p>
      )}
    </div>
  );
};

export default TextArea;
