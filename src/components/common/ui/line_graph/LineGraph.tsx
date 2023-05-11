import { FC } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

export interface LineGraphProps {
  value: number;
  label: string;
}

import { checkValue } from '@/components/common/ui/line_graph/utils/utils';

import * as styles from './LineGraph.styles';

const LineGraph: FC<LineGraphProps> = ({ label, value }) => {
  const checkedValue = checkValue(value);
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
