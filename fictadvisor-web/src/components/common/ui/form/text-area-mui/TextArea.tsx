import React, { ChangeEvent } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@mui/material';

import { TextAreaProps } from '@/components/common/ui/form/with-formik/text-area/types';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './TextArea.styles';
import { TextAreaSize, TextAreaState } from './types';

const MAX_LENGTH = 4000;

const TextArea: React.FC<TextAreaProps> = ({
  value,
  placeholder,
  label,
  size = TextAreaSize.MEDIUM,
  disabled = false,
  showRemark = false,
  rowsNumber = 4,
  sx = {},
  touched,
  error,
  onChange = () => {},
}) => {
  const state = touched && error ? TextAreaState.ERROR : TextAreaState.DEFAULT;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

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
        value={value}
        sx={styles.input(state, size)}
        multiline
        rows={rowsNumber}
        inputProps={{ maxLength: MAX_LENGTH }}
        color="warning"
        placeholder={placeholder}
        onChange={handleChange}
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
