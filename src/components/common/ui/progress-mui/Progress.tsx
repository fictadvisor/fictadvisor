import { FC } from 'react';
import { Box, CircularProgress } from '@mui/material';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './Progress.styles';
import {
  ProgressColor,
  ProgressProps,
  ProgressSize,
  ProgressVariant,
} from './types';

const Progress: FC<ProgressProps> = ({
  variant = ProgressVariant.DETERMINATE,
  sx = {},
  size = ProgressSize.MEDIUM,
  color = ProgressColor.PRIMARY,
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
