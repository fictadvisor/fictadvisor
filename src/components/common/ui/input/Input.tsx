import React, { useState } from 'react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useField } from 'formik';
import mergeClassNames from 'merge-class-names';

import styles from './Input.module.scss';

enum InputState {
  DEFAULT = 'default',
  DISABLED = 'disabled',
  ERROR = 'error',
  SUCCESS = 'success',
}
export enum InputSize {
  LARGE = 'large',
  MEDIUM = 'medium',
}

export enum InputType {
  DEFAULT = 'text',
  PASSWORD = 'password',
  SEARCH = 'search',
}

interface InputProps {
  label?: string;
  placeholder?: string;
  name: string;
  size?: InputSize;
  type?: InputType;
  isSuccessOnDefault?: boolean;
  isDisabled?: boolean;
  showRemarkOnDefault?: boolean;
  hasRemark?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  name,
  size = InputSize.MEDIUM,
  type = InputType.DEFAULT,
  isSuccessOnDefault = false,
  isDisabled = false,
  showRemarkOnDefault,
  hasRemark = true,
  className: additionalClass,
}) => {
  const [field, meta, helpers] = useField(name);
  const [isHidden, setIsHidden] = useState(type === InputType.PASSWORD);
  const inputType = isHidden ? 'password' : 'text';

  const customType = label || type === InputType.SEARCH ? type : 'unlabeled';
  const customLabel = type === InputType.SEARCH ? undefined : label;

  let state;
  if (isDisabled) state = InputState.DISABLED;
  else if (meta.touched && meta.error) state = InputState.ERROR;
  else if (meta.touched && isSuccessOnDefault) state = InputState.SUCCESS;
  else state = InputState.DEFAULT;

  const leftIcon =
    customType === InputType.SEARCH ? (
      <MagnifyingGlassIcon className="icon white-icon" />
    ) : null;

  let rightIcon = null;
  if (customType === InputType.PASSWORD) {
    if (isHidden) rightIcon = <EyeIcon className="icon white-icon" />;
    else rightIcon = <EyeSlashIcon className="icon white-icon" />;
  } else {
    if (state === InputState.SUCCESS)
      rightIcon = <CheckCircleIcon className="icon input-success-icon" />;
    if (meta.touched && meta.error)
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
      helpers.setValue('');
    }
  }

  const inputColor = `${state}-input-color`;
  const hasIcon =
    state === InputState.ERROR ||
    state === InputState.SUCCESS ||
    customType === InputType.PASSWORD ||
    (customType === InputType.SEARCH && field.value !== '');
  const inputStyle = `${size}-${customType}${hasIcon ? '-icon' : ''}-input`;
  const className = mergeClassNames(
    styles[inputColor],
    styles[inputStyle],
    styles[additionalClass],
  );

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
        name={name}
        {...field}
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

export default Input;
