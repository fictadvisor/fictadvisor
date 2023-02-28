import React, { Fragment, useState } from 'react';
import { log } from 'console';
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
  const [scrollTop, setScrollTop] = useState(0);
  let state: FieldState;
  let numbers = [];
  let numberOfLines = 0;

  const handlerScroll = e => {
    setScrollTop(e.target.scrollTop);
  };

  const divClasses = [
    styles['textarea'],
    styles[size ? `${size}-area` : ''],
    styles[state ? `${state}-area` : ''],
    className,
  ];

  if (touched && error) state = FieldState.ERROR;
  else if (touched && isSuccessOnDefault) state = FieldState.SUCCESS;

  if (field.value.includes(',') || field.value.includes(';')) {
    field.value = field.value.replace(/,/g, '\n');
    field.value = field.value.replace(/;/g, '\n');
    field.value = field.value.replace(/\n\n/g, '\n');
  }
  field.value += '\n';
  field.value = field.value.replace(/\n\n/g, '\n');
  numberOfLines = field.value.split('\n').length;
  numbers = Array(numberOfLines).fill(
    <span className={styles['spanStyles']}></span>,
  );
  return (
    <div className={divClasses.join(' ')}>
      <div className={styles['divlines']}>
        <div className={styles['line-numbers']} style={{ top: -scrollTop }}>
          <>{numbers}</>
        </div>
      </div>
      {label && <label>{label}</label>}
      <textarea
        onScroll={e => handlerScroll(e)}
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
