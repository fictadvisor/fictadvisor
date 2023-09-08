import React, { FC, Fragment, ReactNode, useMemo } from 'react';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
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

  const hasError = useMemo(() => touched && !!error, [touched, error]);

  return (
    <Box sx={{ width: '100%' }}>
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
      {hasError && (
        <Typography sx={{ pl: '16px', fontSize: '11px', color: 'error.500' }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default ScheduleInput;
