import { FC } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './Progress.styles';
import { ProgressColor, ProgressSize, ProgressVariant } from './types';

interface ProgressProps {
  value?: number;
  variant?: ProgressVariant;
  sx?: SxProps<Theme>;
  size?: ProgressSize;
  color?: ProgressColor;
}

const Progress: FC<ProgressProps> = ({
  variant = ProgressVariant.DETERMINATE,
  sx = {},
  size = ProgressSize.SMALL,
  color = ProgressColor.PRIMARY,
}) => {
  return (
    <Box>
      <CircularProgress
        variant={variant}
        value={100}
        size={size}
        color={color}
        sx={mergeSx(styles.progressBack, sx)}
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
