import { FC, useEffect, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useField } from 'formik';

import * as styles from './TextArea.styles';
const DEBOUNCE_TIME = 100;

interface ScheduleTextAreaProps extends TextFieldProps<'standard'> {
  name: string;
}

const TextArea: FC<ScheduleTextAreaProps> = ({ name, ...props }) => {
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
        {...props}
        onChange={event => setInternalValue(event.target.value)}
        value={internalValue}
        variant="standard"
        margin="normal"
        sx={styles.textArea}
        multiline
        rows={3}
        InputProps={{
          disableUnderline: true,
        }}
      />
      {hasError && <Typography sx={styles.error}>{error}</Typography>}
    </Box>
  );
};

export default TextArea;
