import React, { ChangeEvent, useRef } from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  OutlinedInput,
  useMediaQuery,
} from '@mui/material';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';
import theme from '@/styles/theme';

import LineNumbers from './components/LineNumbers';
import * as styles from './NumberedTextArea.styles';
import { NumberedTextAreaProps } from './types';
import { transformValue } from './utils';

const MAX_LENGTH = 2000;
const MOBILE_ROWS = 7;
const DESKTOP_ROWS = 10;

const NumberedTextArea: React.FC<NumberedTextAreaProps> = ({
  placeholder,
  disabled = false,
  showRemark = false,
  sx = {},
  error,
  touched,
  value,
  onChange = () => {},
}) => {
  const lineRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('mobileMedium'));
  const state = touched && error ? 'error' : 'default';

  const handleScroll = (event: React.UIEvent<HTMLTextAreaElement>) => {
    const { currentTarget } = event;
    if (lineRef.current) {
      lineRef.current.scrollTop = currentTarget.scrollTop;
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const transformedValue = transformValue(event.target.value);
    onChange(transformedValue);
  };

  return (
    <Box sx={mergeSx(styles.wrapper, sx)}>
      <FormControl sx={styles.formControl(state, disabled)} disabled={disabled}>
        <LineNumbers value={value} ref={lineRef} />

        <OutlinedInput
          sx={styles.input}
          rows={isMobile ? MOBILE_ROWS : DESKTOP_ROWS}
          multiline
          inputProps={{
            maxLength: MAX_LENGTH,
            onScroll: handleScroll,
          }}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
        />
      </FormControl>
      {showRemark && (
        <FormHelperText sx={styles.errorRemark}>
          {touched && error}
        </FormHelperText>
      )}
    </Box>
  );
};

export default NumberedTextArea;
