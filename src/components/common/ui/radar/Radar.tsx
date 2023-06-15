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
import { TeacherRoles } from '@/lib/api/teacher/dto/GetTeacherDTO';
import theme from '@/styles/theme';

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
export interface RadarProps {
  roles: TeacherRoles[];
  marks: {
    name: string;
    amount: number;
    type: 'RADAR' | 'CIRCLE';
    mark: number;
  }[];
}

const RadarChart: FC<RadarProps> = ({ marks, roles }) => {
  const labels = marks.map(mark => mark.name);
  const data = getData(marks.map(mark => mark.mark));
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
