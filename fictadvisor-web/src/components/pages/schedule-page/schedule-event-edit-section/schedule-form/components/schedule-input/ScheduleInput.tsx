import React, { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField';
import { useField } from 'formik';

import * as styles from './ScheduleInput.styles';

const DEBOUNCE_TIME = 100;
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
  const [{ value }, { touched, error }, { setValue }] = useField(name);
  const hasError = useMemo(() => touched && !!error, [touched, error]);
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(internalValue);
    }, DEBOUNCE_TIME);
    return () => clearTimeout(timeout);
  }, [internalValue]);

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        onChange={e => setInternalValue(e.target.value)}
        value={internalValue}
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
