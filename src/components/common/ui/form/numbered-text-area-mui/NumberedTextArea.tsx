import React, { useRef } from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  OutlinedInput,
  useMediaQuery,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { useField } from 'formik';

import LineNumbers from '@/components/common/ui/form/numbered-text-area-mui/components';
import { transformValue } from '@/components/common/ui/form/numbered-text-area-mui/utils';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';
import theme from '@/styles/theme';

import * as styles from './NumberedTextArea.styles';

interface NumberedTextAreaProps {
  name: string;
  placeholder?: string;
  disabled?: boolean;
  showRemark?: boolean;
  sx?: SxProps<Theme>;
}

const MAX_LENGTH = 2000;
const MOBILE_ROWS = 7;
const DESKTOP_ROWS = 10;

const NumberedTextArea: React.FC<NumberedTextAreaProps> = ({
  name,
  placeholder,
  disabled = false,
  showRemark = false,
  sx = {},
}) => {
  const [field, { touched, error }] = useField(name);
  const lineRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('mobileMedium'));
  const state = touched && error ? 'error' : 'default';

  field.value = transformValue(field.value);

  const handleScroll = (event: React.UIEvent<HTMLTextAreaElement>) => {
    const { currentTarget } = event;
    if (lineRef.current) {
      lineRef.current.scrollTop = currentTarget.scrollTop;
    }
  };

  return (
    <Box sx={mergeSx(styles.wrapper, sx)}>
      <FormControl sx={styles.formControl(state, disabled)} disabled={disabled}>
        <LineNumbers value={field.value} ref={lineRef} />

        <OutlinedInput
          {...field}
          sx={styles.input}
          rows={isMobile ? MOBILE_ROWS : DESKTOP_ROWS}
          multiline
          inputProps={{
            maxLength: MAX_LENGTH,
            onScroll: handleScroll,
          }}
          placeholder={placeholder}
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
