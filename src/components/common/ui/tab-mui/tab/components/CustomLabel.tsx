import React, { FC } from 'react';
import Box from '@mui/material/Box';

import * as styles from '../Tab.styles';

interface CustomLabelProps {
  label: string | React.ReactElement;
  count: number | string;
  disabled: boolean;
}

export const CustomLabel: FC<CustomLabelProps> = ({
  label,
  count,
  disabled,
}) => {
  return (
    <Box sx={styles.label}>
      {label}
      {count != null && <Box sx={styles.counter(disabled)}>{count}</Box>}
    </Box>
  );
};
