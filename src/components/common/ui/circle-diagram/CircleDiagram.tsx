import { FC } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './CircleDiagram.styles';
import { CircleDiagramVariant } from './types';

interface CircleDiagramProps {
  value: number;
  variant?: CircleDiagramVariant;
  sx?: SxProps<Theme>;
  thickness?: number;
}

const CircleDiagram: FC<CircleDiagramProps> = ({
  value,
  variant = CircleDiagramVariant.DETERMINATE,
  thickness = 3.5,
  sx = {},
}) => {
  const roundValue = value > 100 ? 100 : value < 0 ? 0 : Math.round(value);
  return (
    <Box sx={mergeSx(styles.boxCircle, sx)}>
      <CircularProgress
        sx={styles.progressBack}
        variant={variant}
        thickness={thickness}
        value={100}
      />
      <CircularProgress //bug when scaling, the solution is to set default thickness
        sx={styles.progressFront(roundValue)}
        variant={variant}
        thickness={thickness}
        value={roundValue}
      />
      <Box sx={styles.boxCounter}>
        <Typography sx={styles.textCounter(roundValue)}>
          {roundValue}%
        </Typography>
      </Box>
    </Box>
  );
};

export default CircleDiagram;
