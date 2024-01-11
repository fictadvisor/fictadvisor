import React, { FC } from 'react';
import { Radar } from 'react-chartjs-2';
import { Box, useMediaQuery } from '@mui/material';
import {
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';

import getData from '@/components/common/ui/radar/utils/drawData';
import getOptions from '@/components/common/ui/radar/utils/getOptions';
import theme from '@/styles/theme';
import { TeacherRadarCircleMark } from '@/types/teacher';

import * as styles from './Radar.styles';

ChartJS.register(
  RadialLinearScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

interface RadarProps {
  marks: TeacherRadarCircleMark[];
}

const RadarChart: FC<RadarProps> = ({ marks }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const data = getData(
    isMobile,
    marks.map(mark => mark.mark),
    marks.map(mark => mark.name),
  );
  const options = getOptions(
    isMobile,
    marks.map(mark => mark.name),
  );
  return (
    <Box sx={styles.background}>
      <Box>
        <Radar options={options} data={data} />
      </Box>
    </Box>
  );
};

export default RadarChart;
