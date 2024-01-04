import React, { forwardRef, useMemo } from 'react';
import { Box } from '@mui/material';

import * as styles from './LineNumbers.styles';

interface LineNumbersProps {
  value: string;
}

const LineNumbers = forwardRef<HTMLDivElement, LineNumbersProps>(
  ({ value }, ref) => {
    const lineCount = value.split('\n').length;

    const lineNumbers = useMemo(() => {
      const numbers = [];
      for (let i = 0; i < lineCount; i++) {
        numbers.push(<span key={i}> {i + 1} </span>);
      }
      return numbers;
    }, [lineCount]);

    return (
      <Box sx={styles.lineNumbers} ref={ref}>
        {lineNumbers}
      </Box>
    );
  },
);

export default LineNumbers;
