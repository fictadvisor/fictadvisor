import { FC } from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';
import { Chart, registerables } from 'chart.js';

import getData from '@/components/common/ui/column-chart/utils/get-data';
import getOptions from '@/components/common/ui/column-chart/utils/get-options';

import * as styles from './ColumnChart.styles';
import { TeacherEvaluations } from './types';

Chart.register(...registerables);

interface ColumnChartProps {
  data: TeacherEvaluations;
  maxValue?: number;
}
const ColumnChart: FC<ColumnChartProps> = ({ data, maxValue = 10 }) => {
  return (
    <Box sx={styles.chartContainer}>
      <Typography sx={styles.legend}>{data.name}</Typography>
      <Typography sx={styles.yTitle}>Кількість голосів</Typography>
      <Box sx={styles.chart}>
        <Bar data={getData(data)} options={getOptions(maxValue)} />
      </Box>
    </Box>
  );
};

export default ColumnChart;
