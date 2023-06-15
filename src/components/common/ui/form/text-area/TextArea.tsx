import React from 'react';
import { useField } from 'formik';

import { FieldState } from '@/components/common/ui/form/common/types';

import styles from './TextArea.module.scss';

export enum TextAreaSize {
  LARGE = 'large',
  SMALL = 'small',
}

interface TextAreaProps {
  name: string;
  placeholder?: string;
  label?: string;
  size?: TextAreaSize;
  isDisabled?: boolean;
  isSuccessOnDefault?: boolean;
  defaultRemark?: string;
  showRemark?: boolean;
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  name,
  placeholder,
  label,
  size = TextAreaSize.LARGE,
  isDisabled = false,
  isSuccessOnDefault = false,
  defaultRemark,
  showRemark = true,
  className,
}) => {
  const [field, { touched, error }] = useField(name);
  console.log(field.value);
  let state;
  if (touched && error) state = FieldState.ERROR;
  else if (touched && isSuccessOnDefault) state = FieldState.SUCCESS;

  const divClasses = [
    styles['textarea'],
    styles[size ? `${size}-area` : ''],
    styles[state ? `${state}-area` : ''],
    className,
  ];

  return (
    <div className={divClasses.join(' ')}>
      {label && <label>{label}</label>}
      <textarea
        {...field}
        className={styles['textarea_input']}
        disabled={isDisabled}
        placeholder={placeholder}
      />
      {showRemark && <p>{touched && error ? error : defaultRemark}</p>}
    </div>
  );
};

export default TextArea;
