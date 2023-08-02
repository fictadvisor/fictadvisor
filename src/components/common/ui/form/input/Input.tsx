import React, { useEffect, useState } from 'react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import cn from 'classnames';
import { useField } from 'formik';

import { FieldState } from '@/components/common/ui/form/common/types';

import styles from './Input.module.scss';

export enum InputSize {
  LARGE = 'large',
  MEDIUM = 'medium',
}

export enum InputType {
  DEFAULT = 'text',
  PASSWORD = 'password',
  SEARCH = 'search',
}

interface InputProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'size'> {
  label?: string;
  placeholder?: string;
  size?: InputSize;
  type?: InputType;
  isSuccessOnDefault?: boolean;
  defaultRemark?: string;
  showRemark?: boolean;
  className?: string;
  onDeterredChange?: () => void;
  resetOnDisabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  size = InputSize.MEDIUM,
  type = InputType.DEFAULT,
  isSuccessOnDefault = false,
  defaultRemark,
  showRemark = true,
  className: additionalClassName,
  onDeterredChange,
  name = '',
  resetOnDisabled = false,
  ...rest
}) => {
  const [field, { touched, error }, { setTouched, setValue }] = useField(name);
  const [isHidden, setIsHidden] = useState(type === InputType.PASSWORD);
  const inputType = isHidden ? 'password' : 'text';

  const customType = label || type === InputType.SEARCH ? type : 'unlabeled';
  const customLabel = type === InputType.SEARCH ? undefined : label;

  let state;
  if (rest.disabled) state = FieldState.DISABLED;
  else if (touched && error) state = FieldState.ERROR;
  else if (touched && isSuccessOnDefault) state = FieldState.SUCCESS;
  else state = FieldState.DEFAULT;

  const leftIcon =
    customType === InputType.SEARCH ? (
      <MagnifyingGlassIcon className="icon white-icon" />
    ) : null;

  let rightIcon = null;
  if (customType === InputType.PASSWORD) {
    if (isHidden)
      rightIcon = <EyeSlashIcon className={cn('icon', styles['eye-icon'])} />;
    else rightIcon = <EyeIcon className={cn('icon', styles['eye-icon'])} />;
  } else {
    if (state === FieldState.SUCCESS)
      rightIcon = <CheckCircleIcon className="icon input-success-icon" />;
    if (touched && error)
      rightIcon = <ExclamationCircleIcon className="icon input-error-icon" />;
    else if (customType === InputType.SEARCH) {
      if (field.value !== '')
        rightIcon = <XMarkIcon className="icon white-icon" />;
    }
  }

  function handleIconClick() {
    if (customType === InputType.PASSWORD) {
      setIsHidden(!isHidden);
    }
    if (customType === InputType.SEARCH) {
      setTouched(false);
      setValue('');
    }
  }

  const inputColor = `${state}-input-color`;
  const hasIcon =
    state === FieldState.ERROR ||
    state === FieldState.SUCCESS ||
    customType === InputType.PASSWORD ||
    (customType === InputType.SEARCH && field.value !== '');
  const inputStyle = `${size}-${customType}${hasIcon ? '-icon' : ''}-input`;

  const className = cn(
    styles[inputColor],
    styles[inputStyle],
    additionalClassName,
  );

  useEffect(() => {
    if (resetOnDisabled) setValue('');
  }, [resetOnDisabled]);

  useEffect(() => {
    const curTimer = setTimeout(() => {
      if (onDeterredChange) onDeterredChange();
    }, 500);
    return () => clearTimeout(curTimer);
  }, [field.value, onDeterredChange]);

  return (
    <div className={className}>
      {customLabel && <label> {customLabel} </label>}
      {leftIcon && (
        <div className={`icon ${styles['left-icon']}`}>{leftIcon}</div>
      )}
      {rightIcon && (
        <div
          className={`icon ${styles['right-icon']}`}
          onClick={handleIconClick}
        >
          {rightIcon}
        </div>
      )}
      <input
        placeholder={placeholder}
        type={inputType}
        onInput={field.onChange}
        {...field}
        {...rest}
      />
      {showRemark && (
        <p className={styles['remark-' + state]}>
          {touched && error ? error : defaultRemark}
        </p>
      )}
    </div>
  );
};

export default Input;
