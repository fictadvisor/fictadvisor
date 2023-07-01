import { FC } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

import checkValue from '@/components/common/ui/line-graph/utils/check-value';

import * as styles from './LineGraph.styles';

interface LineGraphProps {
  value: number;
  label: string;
}

const LineGraph: FC<LineGraphProps> = ({ label, value }) => {
  const checkedValue = Math.round(checkValue(value));

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.label}>
        <Typography>{label}</Typography>
        <Typography>{checkedValue}%</Typography>
      </Box>
      <LinearProgress
        sx={styles.graph(checkedValue)}
        variant="determinate"
        value={checkedValue}
      />
    </Box>
  );
};

export default LineGraph;
