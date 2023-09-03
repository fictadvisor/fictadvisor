import React, { FC, ReactNode } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField';
import { useField } from 'formik';

import * as styles from './ScheduleInput.styles';

export interface ScheduleInputProps extends TextFieldProps<'standard'> {
  placeholder?: string;
  isDisabled?: boolean;
  icon?: ReactNode;
  name: string;
}
const ScheduleInput: FC<ScheduleInputProps> = ({
  placeholder,
  isDisabled = false,
  size = 'small',
  icon,
  name,
}) => {
  const [props, { touched, error }, { setValue, setTouched }] = useField(name);

  return (
    <TextField
      {...props}
      placeholder={placeholder}
      disabled={isDisabled}
      sx={styles.input(size)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
      }}
    />
  );
};

export default ScheduleInput;
