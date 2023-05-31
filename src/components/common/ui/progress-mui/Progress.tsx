import { FC } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './Progress.styles';
import { ProgressColours, ProgressSize } from './types';

interface ProgressProps {
  value?: number;
  variant?: 'determinate' | 'indeterminate';
  sx?: SxProps<Theme>;
  size?: ProgressSize;
  color?: ProgressColours;
}
const Progress: FC<ProgressProps> = ({
  variant = 'determinate',
  sx,
  size,
  color = 'primary',
}) => {
  return (
    <Box>
      <CircularProgress
        variant={variant}
        value={100}
        size={size}
        color={color}
        sx={styles.progressBack}
        thickness={4.3}
      />
      <CircularProgress
        variant={'indeterminate'}
        value={100}
        size={size}
        color={color}
        thickness={4.3}
        sx={mergeSx(styles.progressFront, sx)}
      />
    </Box>
  );
};
export default Progress;
