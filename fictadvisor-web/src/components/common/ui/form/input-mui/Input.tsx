import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@mui/material';

import { MAX_LENGTH } from '@/components/common/ui/form/input-mui/constants';
import {
  InputProps,
  InputSize,
  InputState,
  InputType,
} from '@/components/common/ui/form/input-mui/types';
import {
  getRightIcon,
  getState,
} from '@/components/common/ui/form/input-mui/util';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './Input.styles';

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  name,
  size = InputSize.LARGE,
  type = InputType.DEFAULT,
  isSuccessOnDefault,
  defaultRemark,
  showRemark = false,
  readOnly = false,
  sx = {},
  onDeterredChange,
  disabled = false,
  value,
  onChange,
  error,
  touched,
}) => {
  const [isHidden, setIsHidden] = useState(type === InputType.PASSWORD);
  const state = getState(
    disabled,
    touched,
    !!error,
    isSuccessOnDefault,
    readOnly,
  );
  const RightIcon = getRightIcon(type, isHidden, state, value);

  const handleRightIconClick = () => {
    if (
      type === InputType.PASSWORD &&
      state !== InputState.DISABLED &&
      state !== InputState.READONLY
    )
      setIsHidden(!isHidden);
    else if (
      type === InputType.SEARCH &&
      state !== InputState.DISABLED &&
      state !== InputState.READONLY
    )
      onChange('');
  };

  useEffect(() => {
    const curTimer = setTimeout(() => {
      if (onDeterredChange) onDeterredChange();
    }, 500);
    return () => clearTimeout(curTimer);
  }, [value, onDeterredChange]);

  return (
    <FormControl
      sx={mergeSx(styles.wrapper, sx)}
      margin="none"
      disabled={disabled}
    >
      {label && (
        <InputLabel sx={styles.label(state)} size="normal">
          {label}
        </InputLabel>
      )}

      <OutlinedInput
        onChange={event => onChange(event.target.value)}
        value={value}
        readOnly={readOnly}
        name={name}
        sx={styles.input(state, size)}
        inputProps={{ maxLength: MAX_LENGTH }}
        color="warning"
        type={isHidden ? 'password' : 'text'}
        placeholder={placeholder}
        startAdornment={
          type === InputType.SEARCH && (
            <MagnifyingGlassIcon style={styles.glassIcon(type, state)} />
          )
        }
        endAdornment={
          RightIcon && (
            <RightIcon
              onClick={handleRightIconClick}
              style={styles.rightIcon(type, state)}
            />
          )
        }
      />

      {showRemark && (
        <FormHelperText sx={styles.remark(state)}>
          {state === InputState.ERROR ? error : defaultRemark}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default Input;
