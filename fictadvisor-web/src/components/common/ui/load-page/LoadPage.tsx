import { FC } from 'react';
import { Box, SxProps, Theme } from '@mui/material';

import Progress from '../progress';
import {
  ProgressColor,
  ProgressSize,
  ProgressVariant,
} from '../progress/types';

interface ProgressProps {
  height?: string;
  progressVariant?: ProgressVariant;
  progressSx?: SxProps<Theme>;
  progressSize?: ProgressSize;
  progressColor?: ProgressColor;
}

const LoadPage: FC<ProgressProps> = ({
  height,
  progressColor,
  progressSx,
  progressVariant,
  progressSize,
}) => {
  return (
    <Box
      sx={{
        minHeight: height ? height : '100vh',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Progress
        color={progressColor}
        sx={{
          ...progressSx,
          margin: '20px',
        }}
        variant={progressVariant}
        size={progressSize}
      />
    </Box>
  );
};
export default LoadPage;
