import React from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { useField } from 'formik';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './TextArea.styles';

interface TextAreaProps {
  name: string;
  placeholder?: string;
  label?: string;
  size?: 'medium' | 'small';
  disabled?: boolean;
  showRemark?: boolean;
  rowsNumber?: number;
  sx?: SxProps<Theme>;
}

const MAX_LENGTH = 2000;

const TextArea: React.FC<TextAreaProps> = ({
  name,
  placeholder,
  label,
  size = 'medium',
  disabled = false,
  showRemark = false,
  rowsNumber = 4,
  sx,
}) => {
  const [field, { touched, error }] = useField(name);

  const state = touched && error ? 'error' : 'default';

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
        {...field}
        sx={styles.input(state, size)}
        multiline
        rows={rowsNumber}
        inputProps={{ maxLength: MAX_LENGTH }}
        color="warning"
        placeholder={placeholder}
      />
      {showRemark && (
        <FormHelperText sx={styles.errorRemark}>
          {touched && error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default TextArea;
