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
import getBackgroundImage from '@/components/common/ui/radar/utils/findImage';
import getOptions from '@/components/common/ui/radar/utils/getOptions';
import theme from '@/styles/theme';
import { TeacherRadarCircleMark, TeacherRole } from '@/types/teacher';

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
  roles: TeacherRole[];
  marks: TeacherRadarCircleMark[];
}

const RadarChart: FC<RadarProps> = ({ marks, roles }) => {
  const labels = marks.map(mark => mark.name);
  const data = getData(
    marks.map(mark => mark.mark),
    marks.map(mark => mark.name),
  );
  const options = getOptions();
  const isMobile = useMediaQuery(theme.breakpoints.down('desktopSemiMedium'));

  return (
    <Box sx={styles.background}>
      <Box>
        <Radar options={options} data={data} />
      </Box>
      {getBackgroundImage(labels, isMobile, roles)}
    </Box>
  );
};

export default RadarChart;
